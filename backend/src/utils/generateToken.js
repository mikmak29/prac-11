import dotenv from "dotenv";
import asyncErrorHandler from "express-async-handler";
import jwt from "jsonwebtoken";

dotenv.config();

export const generateAccessToken = asyncErrorHandler(async (user) => {
	return jwt.sign({ user }, process.env.ACCCESS_TOKEN, { expiresIn: "30s" });
});

export const generateRefreshToken = asyncErrorHandler(async (user) => {
	return jwt.sign({ user }, process.env.REFRESH_ACCESS_TOKEN, { expiresIn: "7d" });
});
