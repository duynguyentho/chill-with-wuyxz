require("dotenv").config();
import request from "request";
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
let handleGetStarted = (sender_psid) => {
  return Promise(async (resolve, reject) => {
    try {
      response = {
        text: `Chào cậu. Mình là Chill with wuyxz - một messenger chatbot. Chúc cậu ngày mới tốt lành <3`,
      };
      await callSendApi(sender_psid, response);
      resolve("Successful");
    } catch (error) {
      reject(error);
    }
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
