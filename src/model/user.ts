import { model, Schema, Model } from "mongoose";
import { IUser } from "../interface/user";

const UserSchema: Schema = new Schema({
	email: { type: String, required: true, unique: true, index: true},
	username: { type: String, required: true },
	password: { type: String, required: true }
});

const UserModel: Model<IUser> = model("User", UserSchema);

export default UserModel;