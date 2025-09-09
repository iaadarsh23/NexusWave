import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
	name: { type: String, required: true },
	userName: { type: String, required: true, unique: true },
	password: {
		type: String,
		required: true,
	},
	//we will store the token on the local storage
	token: { type: String },
});
const User = mongoose.model("User", userSchema);

export { User };
