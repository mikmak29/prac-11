import mongoose from "mongoose";

/**
 * @param {Object} mongoose
 * @param {Object} mongoose.Schema
 *
 */

const userSchema = new mongoose.Schema(
	{
		role: {
			type: String,
			required: [true, "name is required."],
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default mongoose.models.User || mongoose.model("User", userSchema, "prac11_users");
