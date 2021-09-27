import { model, Schema, Model } from "mongoose";
import { IUser } from "../interface/user";

const UserSchema: Schema = new Schema({
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true,
		index: true
	},
	username: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 20
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 30
	}
});

const UserModel: Model<IUser> = model("User", UserSchema);

export default UserModel;
