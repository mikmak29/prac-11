import express from "express";

import * as weatherController from "../controllers/weather.controller.js";
import validateObjectId from "../middleware/validateObjectId.js";

const route = express.Router();

route.route("/").post(weatherController.createWeatherData);
route.route("/").get(weatherController.fetchAllWeathers);
route.route("/:id").put(validateObjectId, weatherController.updateWeatherDataById).delete(validateObjectId, weatherController.deleteWeatherDataById);

export default route;
