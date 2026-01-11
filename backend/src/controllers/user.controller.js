import dotenv from "dotenv";
import asyncErrorHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";

dotenv.config();

export const createData = asyncErrorHandler(async (req, res) => {
	const { username, email, role } = req.body;

	if (!username || !email || !role) {
		throw new Error("All fields are mandatory.");
	}

	const user = {
		username,
		email,
		role,
	};

	const accessToken = await generateAccessToken(user);

	const refreshToken = await generateRefreshToken(user);

	res.cookie("token", refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		path: "/api",
	});

	res.status(200).json({
		accessToken: accessToken,
		refreshToken: refreshToken,
	});
});

export const refreshToken = asyncErrorHandler(async (req, res) => {
	const token = req.cookies?.token;

	try {
		const verifyToken = jwt.verify(token, process.env.REFRESH_ACCESS_TOKEN);

		const user = verifyToken;
		const accessToken = await generateAccessToken(user);

		res.status(200).json({ accessToken: accessToken });
	} catch (error) {
		throw new Error(error.message);
	}
});

export const readData = asyncErrorHandler(async (req, res) => {
	const data = req.user;
	console.log(data);
	res.status(200).json(req.user);
});

export const readDataByCookie = asyncErrorHandler(async (req, res) => {
	const token = req.cookies?.token;
	res.status(200).json(token);
});
