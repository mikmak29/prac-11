import User from "../models/UserModel.js";

export const registerData = async (userData) => {
	return await User.create(userData);
};

export const loginData = async (userEmail) => {
	return await User.findOne({ email: userEmail });
};

export const validateEmail = async (userEmail) => {
	return await User.findOne({ email: userEmail });
};

export const currentPage = async () => {
	return await User.find();
};
