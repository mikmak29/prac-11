import dotenv from "dotenv";
import asyncErrorHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import * as userService from "../services/user.service.js";
import conditionalErrorHandler from "../utils/conditionalErrorHandler.js";
import { generateAccessToken, generateRefreshAccessToken } from "../utils/accessToken.js";

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
		id: user._id,
		name: user.name,
		email: user.email,
		country: user.country,
	};

	const accessToken = await generateAccessToken(userPayload);

	const refreshToken = await generateRefreshAccessToken(userPayload);

	res.cookie("token", refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		path: "/api/user",
	});

	res.status(200).json({
		accessToken: accessToken,
		refreshToken: refreshToken,
	});
});

export const refreshToken = asyncErrorHandler(async (req, res) => {
	const token = req.cookies?.token;

	if (!token) {
		return conditionalErrorHandler("Unauthorized", 401);
	}

	try {
		const decoded = jwt.verify(token, process.env.REFRESH_ACCESS_TOKEN);

		const userPayload = {
			id: decoded.id,
			name: decoded.name,
			email: decoded.email,
			country: decoded.country,
		};

		const accessToken = await generateAccessToken(userPayload);

		const refreshToken = await generateRefreshAccessToken(userPayload);

		res.cookie("token", refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			path: "/api/user",
		});

		res.status(200).json({ accessToken });
	} catch (error) {
		return conditionalErrorHandler(error.message, 409);
	}
});

export const userCurrentPage = asyncErrorHandler(async (req, res) => {
	const data = req.user;

	res.status(200).json(data);
});
