const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Senders = new Schema({
  sender_id: { unique: true, type: String },
  repicient_id: { type: String },
  name: { type: String },
});

module.exports = mongoose.model("Senders", Senders);
