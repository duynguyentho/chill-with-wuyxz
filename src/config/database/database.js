import mongoose from "mongoose";
import express from "express";
const app = express();
const port = 8080;
export const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://duynt2201:duynt2201@mydb.ctyxf.mongodb.net/chatbot?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    console.log("Kết nối database thành công");
  } catch (error) {
    console.log(error);
  }
};
