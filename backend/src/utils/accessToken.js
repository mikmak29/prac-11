import dotenv from "dotenv";
import asyncErrorHandler from "express-async-handler";
import jwt from "jsonwebtoken";

dotenv.config();

export const generateAccessToken = asyncErrorHandler(async (userPayload) => {
	return jwt.sign(userPayload, process.env.ACCESS_TOKEN, { expiresIn: "30s" });
});

export const generateRefreshAccessToken = asyncErrorHandler(async (userPayload) => {
	return jwt.sign(userPayload, process.env.REFRESH_ACCESS_TOKEN, { expiresIn: "7d" });
});
