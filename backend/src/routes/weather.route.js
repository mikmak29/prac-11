import express from "express";

import * as weatherController from "../controllers/weather.controller.js";
import validateObjectId from "../middleware/validateObjectId.js";
import authToken from "../middleware/authToken.js";

const route = express.Router();

route.post("/", authToken, weatherController.createWeatherData);
route.get("/", authToken, weatherController.fetchAllWeathers);
route.get("/data", weatherController.weatherDataChecker);
route
	.route("/:id")
	.put(authToken, validateObjectId, weatherController.updateWeatherDataById)
	.delete(authToken, validateObjectId, weatherController.deleteWeatherDataById);

export default route;
