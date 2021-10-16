import { comparePassword, encodePassword } from "../util/PasswordEncoder";
import { IResponse } from "../interface/response";
import {
	IUser,
	IUserLoginRequest,
	IUserPayload,
	IUserResponse,
	IProfileUpdate,
	IProfileResponse,
} from "../interface/user";
import UserModel from "../model/user";
import { connectUser, createToken, updateUserAvatar } from "../util/StreamChat";
import { generateJWT } from "../util/JWT";

export const loginService = async (data: IUserLoginRequest): Promise<IResponse<IUserResponse>> => {
	const { email, password } = data;
	let response;
	await UserModel.findOne({ email }).then((user: IUser) => {
		if (!user) {
			response = {
				code: 404,
				message: "Email is not registered",
			};
			return;
		}
		if (!comparePassword(password, user.password)) {
			response = {
				code: 404,
				message: "Wrong password",
			};
			return;
		}

		response = {
			code: 200,
			data: {
				auth: {
					streamIOToken: createToken(user._id.toString()),
					token: `bearer ${generateJWT(user._id.toString())}`,
				},
				profile: {
					id: user._id.toString(),
					email: user.email,
					username: user.username,
					bio: user.bio,
					avatar: user.avatar,
				},
			},
		};
	});
	return response;
};

export const signupService = async (data: IUserPayload): Promise<IResponse<IUserPayload>> => {
	const { email, password } = data;
	let response;
	await UserModel.findOne({ email }).then((user: IUser) => {
		if (user) {
			response = {
				code: 404,
				message: "Email has been registered",
			};
			return;
		}
	});
	if (response) return response;

	const encodedPassword = encodePassword(password);
	const user = new UserModel({
		email,
		password: encodedPassword,
	});

	await user.save().then(async (user: IUser) => {
		await connectUser(user._id.toString());
		response = {
			code: 200,
			data: {
				auth: {
					streamIOToken: createToken(user._id.toString()),
					token: `bearer ${generateJWT(user._id.toString())}`,
				},
				profile: {
					id: user._id.toString(),
					email: user.email,
				},
			},
		};
	});
	return response;
};

export const updateService = async (
	data: IProfileUpdate,
	userId: string
): Promise<IResponse<IProfileResponse>> => {
	const { username, bio } = data;
	let response;
	await UserModel.findById(userId).then(async (user: IUser) => {
		if (!user) {
			response = {
				code: 404,
				message: "User is not registered",
			};
			return;
		}

		user.username = username;
		user.bio = bio;

		await user.save().then((user: IUser) => {
			response = {
				code: 200,
				data: {
					profile: {
						id: user._id.toString(),
						email: user.email,
						username: user.username,
						bio: user.bio,
						avatar: user.avatar,
					},
				},
			};
		});
	});
	return response;
};
export const updateAvatar = async (
	avatarUrl: string,
	userId: string
): Promise<IResponse<IProfileResponse>> => {
	let response;

	await UserModel.findById(userId).then(async (user: IUser) => {
		if (!user) {
			response = {
				code: 404,
				message: "User is not registered",
			};
			return;
		}
		user.avatar = avatarUrl;
		await updateUserAvatar(avatarUrl, userId);
		await user.save().then((user: IUser) => {
			response = {
				code: 200,
				data: {
					profile: {
						id: user._id.toString(),
						avatar: user.avatar,
					},
				},
			};
		});
	});
	return response;
};
