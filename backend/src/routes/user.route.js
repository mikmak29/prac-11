import express from "express";
import { expressYupMiddleware } from "express-yup-middleware";

import * as userController from "../controllers/user.controller.js";
import userSchema from "../schemas/user.schema.js";
import authToken from "../middleware/authToken.js";

const route = express.Router();

route.post("/register", expressYupMiddleware({ schemaValidator: userSchema }), userController.registerUserData);
route.post("/login", userController.loginUser);
route.get("/current", authToken, userController.userCurrentPage);

export default route;
