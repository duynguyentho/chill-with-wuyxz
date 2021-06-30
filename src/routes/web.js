import express from "express";
import homeController from "../controllers/HomeController";
import senderController from "../controllers/SenderController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.index);
  router.get("/user", senderController.getSenders);
  // Setup profile
  router.post("/setup-profile", homeController.setUpProfile);
  // Set up persistent
  router.post("/setup-persistent-menu", homeController.setUpPersistentMenu);
  router.post("/webhook", homeController.postWebhook);
  router.get("/webhook", homeController.getWebhook);
  return app.use("/", router);
};

module.exports = initWebRoutes;
