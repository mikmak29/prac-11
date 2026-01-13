import asyncErrorHandler from "express-async-handler";

import * as userService from "../services/user.service.js";

export const getAllUsers = asyncErrorHandler(async (req, res) => {
	const data = await userService.getAllData();

	res.status(200).json(data);
});

export const createUser = asyncErrorHandler(async (req, res) => {
	const { role } = req.body;

	const userData = {
		role: role,
	};
	await userService.createData(userData);
	res.status(200).json(userData);
});
