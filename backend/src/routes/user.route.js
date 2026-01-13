import express from "express";

import * as userController from "../controllers/user.controller.js";

const route = express.Router();

route.route("/user").get(userController.getAllUsers).post(userController.createUser);

export default route;
