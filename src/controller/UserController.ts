import { Request, Response } from "express";
import { IProfileUpdate } from "../interface/user";
import { updateService } from "../service/UserService";
const BUCKET_NAME = process.env.BUCKET_NAME;

export const update = (request: Request, response: Response): void => {
	const data: IProfileUpdate = request.body;
	const userId = response.locals.userId;
	const responseData = updateService(data, userId);
	responseData.then(data => {
		response.json(data);
  };
};

export const uploadUserPhoto = (request: Request, response: Response): void => {
	const data = request.file;

	if (data) {
		response.json({
			code: 200,
			data: {
				url: `https://${BUCKET_NAME}.s3.ap-southeast-2.amazonaws.com/${data.filename}`
			}
		});
		return;
	}
	response.json({
		code: 500,
		message: "cannot upload image"
	});
};