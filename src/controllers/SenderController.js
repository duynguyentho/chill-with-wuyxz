import Senders from "../models/Sender";

let getSenders = async (req, res, next) => {
  await Senders.find({})
    .then((sender) => {
      sender = sender.map((sender) => sender.toObject());
      res.send(sender);
    })
    .catch(next);
};

module.exports = {
  getSenders: getSenders,
};
