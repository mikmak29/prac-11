import Weather from "../models/WeatherModel.js";

export const createData = async (weatherData) => {
	return await Weather.create(weatherData);
};

export const weatherData = async (userId) => {
	return await Weather.find({ userId }).sort({ createdAt: -1 });
};

export const weatherDataChecker = async () => {
	return await Weather.find().sort({ createdAt: -1 });
};

export const updateData = async (id, reqBody, updatedItem) => {
	return await Weather.findByIdAndUpdate(id, reqBody, updatedItem);
};

export const deleteData = async (id) => {
	return await Weather.findByIdAndDelete(id);
};

export const validateEmail = async (id) => {
	return await Weather.findById(id);
};

export const validateId = async (id) => {
	return await Weather.findById(id);
};

export const validateOwnership = async (id, userId) => {
	return await Weather.findOne({ _id: id, userId });
};
