import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
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
