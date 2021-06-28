require("dotenv").config();
import request from "request";
import chatbotService from "../services/chatbotservice";
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let index = (req, res) => {
  return res.render("home.ejs");
};
function time() {
  let date = "";
  const today = new Date();
  let day = parseInt(new Date().getDay());
  switch (day) {
    case 0:
      date = "Chủ nhật";
      break;
    case 1:
      date = "Thứ hai";
      break;
    case 2:
      date = "Thứ ba";
      break;
    case 3:
      date = "Thứ tư";
      break;
    case 4:
      date = "Thứ năm";
      break;
    case 5:
      date = "Thứ sáu";
      break;
    case 6:
      date = "Thứ bảy";
      break;
  }
  return `Hôm nay là ${date}, ngày ${today.getDate()}/${
    today.getUTCMonth() + 1
  }/${today.getUTCFullYear()} `;
}
function renderMessages(sender_psid, text) {
  let str = removeAccents(text.toLowerCase());
  switch (str) {
    case "hom nay":
      return time();
    case "today":
      return time();
    case "help":
      return help();
    case "thoi tiet":
      break;
    default:
      return `Có vẻ cậu đang tìm kiếm thứ gì đó...\n Gõ help để xem hướng dẫn nhé !`;
  }
}
let postWebhook = (req, res) => {
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === "page") {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log("Sender PSID: " + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};
let getWebhook = (req, res) => {
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};
// Handles messages events
function handleMessage(sender_psid, received_message) {
  let response;
  // Checks if the message contains text
  if (received_message.text) {
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      text: renderMessages(sender_psid, received_message.text),
    };
  } else if (received_message.attachments) {
    // Get the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Is this the right picture?",
              subtitle: "Tap a button to answer.",
              image_url: attachment_url,
              buttons: [
                {
                  type: "postback",
                  title: "Yes!",
                  payload: "yes",
                },
                {
                  type: "postback",
                  title: "No!",
                  payload: "no",
                },
              ],
            },
          ],
        },
      },
    };
  }

  // Send the response message
  callSendAPI(sender_psid, response);
}
// Handles messaging postbacks events
async function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  switch (payload) {
    case "yes":
      response = { text: "Thanks!" };
      break;
    case "no":
      response = { text: "Oops, sorry !" };
      break;
    case "GET_STARTED":
      await chatbotService.handleGetStarted(sender_psid);
      break;
    default:
      response = {
        text: `Hôm nay trời thật đẹp phải không ?`,
      };
      break;
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}
// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
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
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
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
}

function removeAccents(str) {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ",
    "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ",
  ];
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}
function help() {
  return (
    `---Hướng dẫn sử dụng---` +
    `\n` +
    `help            -- Xem hướng dẫn` +
    `\n` +
    `hôm nay / today --Xem ngày hôm nay` +
    `\n` +
    `add             --Thêm lịch học` +
    `\n` +
    `thời tiết       --Xem thời tiết` +
    `\n` +
    `love            --Nhận một lời tỏ tình`
  );
}
let setUpProfile = async (req, res) => {
  // Construct the message body
  let request_body = {
    get_started: { payload: "GET_STARTED" },
    whitelisted_domains: ["https://wuyxz.herokuapp.com/"],
  };
  //   Template String

  // Send the HTTP request to the Messenger Platform
  await request(
    {
      uri: `https://graph.facebook.com/v11.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      console.log(body);
      if (!err) {
        console.log("Set up profile success!");
      } else {
        console.error("Unable to set up profile:" + err);
      }
    }
  );
  return res.send("Set up user profile success!");
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
        if (!err) {
          let weather = JSON.parse(body); // convert body to object
          let result = `Hà nội`;
          resolve(result);
        } else {
          console.error("Unable to send message:" + err);
          reject(err);
        }
      }
    );
  });
};

module.exports = {
  index: index,
  postWebhook: postWebhook,
  getWebhook: getWebhook,
  setUpProfile: setUpProfile,
};
