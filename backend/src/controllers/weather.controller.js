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

	// Add userId to weather data to associate it with the logged-in user
	const weatherDataWithUserId = {
		userId: req.user.id,
		ownedBy: req.user.name,
		...weatherData,
	};

	const createdWeatherData = await weatherService.createData(weatherDataWithUserId);

	res.status(200).json({
		status: "OK",
		isDataSave: isDataSave,
		createdWeatherData,
	});
});

export const fetchAllWeathers = asyncErrorHandler(async (req, res) => {
	// Only fetch weather data for the logged-in user
	const data = await weatherService.weatherData(req.user.id);

	if (!data || data.length === 0) {
		return conditionalErrorHandler("No data.", 409);
	}
	res.status(200).json(data);
});

export const weatherDataChecker = asyncErrorHandler(async (req, res) => {
	const data = await weatherService.weatherDataChecker();

	res.status(200).json(data);
});

export const updateWeatherDataById = asyncErrorHandler(async (req, res) => {
	if (!req.body) {
		return conditionalErrorHandler("Request body is required", 400);
	}

	const { id } = req.params;
	const { name } = req.body;

	// Check if the weather data exists and belongs to the logged-in user
	const weatherRecord = await weatherService.validateOwnership(id, req.user.id);

	if (!weatherRecord) {
		return conditionalErrorHandler("Invalid ID, record not found, or you don't have permission to update this record", 409);
	}

	const isCountryNameChange = name || weatherRecord.country;

	const weatherData = await weatherAPI(isCountryNameChange);
	// Ensure userId is preserved when updating
	const updatedWeatherData = {
		userId: req.user.id,
		ownedBy: req.user.name,
		...weatherData,
	};

	await weatherService.updateData(id, updatedWeatherData, { new: true });

	res.status(200).json({
		status: "OK",
		message: "Updated successfully",
		updatedData: updatedWeatherData,
	});
});

export const deleteWeatherDataById = asyncErrorHandler(async (req, res) => {
	if (!req.body) {
		return conditionalErrorHandler("Request body is required", 400);
	}

	const { id } = req.params;

	// Check if the weather data exists and belongs to the logged-in user
	const weatherRecord = await weatherService.validateOwnership(id, req.user.id);

	if (!weatherRecord) {
		return conditionalErrorHandler("Invalid ID, record not found, or you don't have permission to delete this record", 409);
	}

	const deletedData = await weatherService.deleteData(id);

	res.status(200).json({
		status: "OK",
		message: "Deleted successfully",
		deletedData: deletedData,
	});
});
