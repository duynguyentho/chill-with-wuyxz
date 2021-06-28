require("dotenv").config();
import request from "request";
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const WEATHER_KEY = process.env.WEATHER_KEY;
let handleGetStarted = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let username = await getUser(sender_psid);
      let weather = await getWeather();
      let response = {
        text: `Chào ${username}. Mình là Chill with wuyxz - một messenger chatbot. Chúc cậu ngày mới tốt lành <3 \n ${typeof weather}`,
      };
      await callSendApi(sender_psid, response);
      resolve("Success");
    } catch (error) {
      reject(error);
    }
  });
};

let getUser = (sender_psid) => {
  // Send the HTTP request to the Messenger Platform
  return new Promise((resolve, reject) => {
    request(
      {
        uri: `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
        qs: { access_token: PAGE_ACCESS_TOKEN },
        method: "GET",
      },
      (err, res, body) => {
        console.log(body);
        if (!err) {
          let response = JSON.parse(body);
          let username = `${response.first_name} ${response.last_name}`;
          resolve(username);
        } else {
          console.error("Unable to send message:" + err);
          reject(err);
        }
      }
    );
  });
};

let getWeather = () => {
  // Send the HTTP request to the Messenger Platform
  return new Promise((resolve, reject) => {
    request(
      {
        uri: `https://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=47607a1ac412548239483f4e09f3cc92`,
        qs: { access_token: PAGE_ACCESS_TOKEN },
        method: "GET",
      },
      (err, res, body) => {
        console.log(body);
        if (!err) {
          console.log(body);
          let weather = `${body}`;
          resolve(weather);
        } else {
          console.error("Unable to send message:" + err);
          reject(err);
        }
      }
    );
  });
};

let callSendApi = (sender_psid, response) => {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
};

module.exports = {
  handleGetStarted: handleGetStarted,
  callSendApi: callSendApi,
};
