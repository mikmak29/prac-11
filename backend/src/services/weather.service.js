import Weather from "../models/WeatherModel.js";

export const createData = async (weatherData) => {
	return await Weather.create(weatherData);
};

export const weatherData = async () => {
	return await Weather.find().sort({ createdAt: -1 });
};

export const updateData = async (id, reqBody, updatedItem) => {
	return await Weather.findByIdAndUpdate(id, reqBody, updatedItem);
};

export const deleteData = async (id) => {
	return await Weather.findByIdAndDelete(id);
};

export const validateEmail = async (id) => {
	return await Weather.findOne(id);
};

export const validateId = async (id) => {
	return await Weather.findOne(id);
};
