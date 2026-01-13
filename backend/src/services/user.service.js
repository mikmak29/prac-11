import User from "../models/UserModel.js";

export const getAllData = async () => {
	return await User.find().sort({ createdAt: -1 });
};

export const createData = async (userData) => {
	return await User.create(userData);
};
