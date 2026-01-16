import asyncErrorHandler from "express-async-handler";

import weatherAPI from "../api/weatherAPI.js";
import * as weatherService from "../services/weather.service.js";
import conditionalErrorHandler from "../utils/conditionalErrorHandler.js";

export const createWeatherData = asyncErrorHandler(async (req, res) => {
	if (!req.body) {
		return conditionalErrorHandler("Request body is required", 400);
	}

	const { name, isDataSave } = req.body;

	if (!name || name.trim() === "") {
		return conditionalErrorHandler("Name field is required", 400);
	}

	const saveData = isDataSave || false;

	const weatherData = await weatherAPI(name);
	if (saveData === false) {
		return res.status(200).json({
			status: "OK",
			isDataSave: isDataSave || saveData,
			weatherData,
		});
	}

	const createdWeatherData = await weatherService.createData(weatherData);

	res.status(200).json({
		status: "OK",
		isDataSave: isDataSave,
		createdWeatherData,
	});
});

export const fetchAllWeathers = asyncErrorHandler(async (req, res) => {
	const data = await weatherService.weatherData();

	if (!data) {
		return conditionalErrorHandler("No data.", 409);
	}
	res.status(200).json(data);
});

export const updateWeatherDataById = asyncErrorHandler(async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;

	// If name changes, doesn't update the current dataset. Must Fix
	const isIdExist = await weatherService.validateId(id);

	if (!isIdExist) {
		return conditionalErrorHandler("Invalid ID or record not found", 409);
	}

	const weatherData = await weatherAPI(name);
	await weatherService.updateData(id, weatherData, { new: true });

	res.status(200).json({
		status: "OK",
		message: "Updated successfully",
		updatedData: weatherData,
	});
});

export const deleteWeatherDataById = asyncErrorHandler(async (req, res) => {
	const { id } = req.params;

	const isIdExist = await weatherService.validateId(id);

	if (!isIdExist) {
		return conditionalErrorHandler("Invalid ID or record not found", 409);
	}

	const deletedData = await weatherService.deleteData(id);

	res.status(200).json({
		status: "OK",
		message: "Deleted successfully",
		deletedData: deletedData,
	});
});
