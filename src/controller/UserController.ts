import { Request, Response } from "express";
import { IProfileUpdate, IUserGet } from "../interface/user";
import { getUserService, updateAvatar, updateService } from "../service/UserService";
const BUCKET_NAME = process.env.BUCKET_NAME;

export const update = (request: Request, response: Response): void => {
	const data: IProfileUpdate = request.body;
	const userId = response.locals.userId;
	const responseData = updateService(data, userId);
	responseData.then((data) => {
		response.json(data);
	});
};

export const getUserLocation = (request: Request, response: Response): void => {
	const data: IUserGet = request.body;
	const userId = response.locals.userId;
	const responseData = getUserService(data, userId);
	responseData.then((data) => {
		response.json(data);
	});
};

export const uploadUserPhoto = (request: Request, response: Response): void => {
	const data = request.file;

	if (data) {
		const avatarUrl = `https://${BUCKET_NAME}.s3.ap-southeast-2.amazonaws.com/${data.filename}`;
		const userId = response.locals.userId;
		const responseData = updateAvatar(avatarUrl, userId);
		responseData.then((data) => {
			response.json(data);
		});
		return;
	}
	response.json({
		code: 500,
		message: "cannot upload image",
	});
};
