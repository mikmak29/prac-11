import express from "express";

import * as userController from "../controllers/user.controller.js";
import authToken from "../middleware/authToken.js";

const route = express.Router();

route.route("/").post(userController.createData);
route.route("/refreshToken").post(userController.refreshToken);
route.route("/").get(authToken, userController.readData);
route.route("/cookie").get(userController.readDataByCookie);

export default route;
