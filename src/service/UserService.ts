import { comparePassword, encodePassword } from "../util/PasswordEncoder";
import { IResponse } from "../interface/response";
import { IUser, IUserLoginRequest, IUserPayload } from "../interface/user";
import UserModel from "../model/user";
import { createToken } from "../util/StreamChat";

export const loginService = async (data: IUserLoginRequest): Promise<IResponse<IUserPayload>> => {
	const { email, password } = data;
	let response;
	await UserModel.findOne({ email })
		.then((user: IUser) => {
			if (!user) {
				response = {
					code: 404,
					message: "Email is not registered"
				};
				return;
			}
			if (!comparePassword(password, user.password)) {
				response = {
					code: 404,
					message: "Wrong password"
				};
				return;
			}
			response = {
				code: 200,
				data: {
					id: user._id.toString(),
					email: user.email,
					username: user.username,
					streamIOToken: createToken(user._id.toString())
				}
			};
		});
	return response;
};

export const signupService = async (data: IUserPayload): Promise<IResponse<IUserPayload>> => {
	const { username, email, password } = data;
	let response;
	await UserModel.findOne({ email })
		.then((user: IUser) => {
			if (user) {
				response = {
					code: 404,
					message: "Email has been registered"
				};
				return;
			}
		});
	if (response) return response;

	const encodedPassword = encodePassword(password);
	const user = new UserModel({
		email,
		username,
		password: encodedPassword
	});
	await user.save().then((user: IUser) => {
		response = {
			code: 200,
			data: {
				id: user._id.toString(),
				email: user.email,
				username: user.username,
				streamIOToken: createToken(user._id.toString())
			}
		};
	});
	return response;
};