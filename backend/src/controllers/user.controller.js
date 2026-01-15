import dotenv from "dotenv";
import asyncErrorHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import * as userService from "../services/user.service.js";
import conditionalErrorHandler from "../utils/conditionalErrorHandler.js";
// import { accessToken } from "../utils/accessToken.js";

dotenv.config();

export const registerUserData = asyncErrorHandler(async (req, res) => {
	if (!req.body) {
		return conditionalErrorHandler("Request body is required", 400);
	}

	const { name, email, password, country } = req.body;

	if (!name || !email || !password || !country) {
		return conditionalErrorHandler("All fields are required.", 409);
	}

	const isEmailExist = await userService.validateEmail(email);

	if (isEmailExist) {
		return conditionalErrorHandler("This Email already registered.", 409);
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const userData = {
		name,
		email,
		password: hashedPassword,
		country,
	};

	await userService.registerData(userData);
	res.status(201).json({
		status: "OK",
		message: "Registered successfully!",
	});
});

export const loginUser = asyncErrorHandler(async (req, res) => {
	if (!req.body) {
		return conditionalErrorHandler("Request body is required", 400);
	}

	const { email, password } = req.body;

	if (!email || !password) {
		return conditionalErrorHandler("All fields are required.", 401);
	}

	const user = await userService.validateEmail(email);

	const isPasswordMatch = await bcrypt.compare(password, user.password);

	if (!isPasswordMatch) {
		return conditionalErrorHandler("Invalid email or password.", 409);
	}

	const userPayload = {
		name: user.name,
		email: user.email,
		country: user.country,
	};

	const accessToken = jwt.sign({ user: userPayload }, process.env.ACCESS_TOKEN);

	res.cookie("token", accessToken, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		path: "/api/user",
	});

	res.status(200).json({ accessToken: accessToken });
});

export const userCurrentPage = asyncErrorHandler(async (req, res) => {
	const data = req.user;

	res.status(200).json(data);
});
