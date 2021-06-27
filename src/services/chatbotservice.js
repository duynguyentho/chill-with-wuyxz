require("dotenv").config();
import request from "request";
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
let handleGetStarted = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let username = await getUser(sender_psid);
      let response = {
        text: `Chào ${username}. Mình là Chill with wuyxz - một messenger chatbot. Chúc cậu ngày mới tốt lành <3`,
      };
      await callSendApi(sender_psid, response);
      resolve("Success");
    } catch (error) {
      reject(error);
    }
  });
};

let getUser = async (sender_psid) => {
  // Send the HTTP request to the Messenger Platform
  let username = "";
  await request(
    {
      uri: `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "GET",
    },
    (err, res, body) => {
      console.log(body);
      if (!err) {
        let response = JSON.parse(res);
        username = `${response.first_name} ${response.last_name}`;
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
  return username;
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
