'use strict';
import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine"
import webRoutes from "./routes/web"

const app = express();
const port = process.env.PORT || 8080;
viewEngine(app);

webRoutes(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});