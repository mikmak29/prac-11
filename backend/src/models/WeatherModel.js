import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		name: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		condition: {
			type: String,
			required: true,
		},
		temp_fahrenheit: {
			type: Number,
			required: true,
		},
		humidity: {
			type: Number,
			required: true,
		},
		local_time: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default mongoose.models.Weather || mongoose.model("Weather", weatherSchema, "prac11_user_weathers");
