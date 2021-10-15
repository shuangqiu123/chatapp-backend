import { Request, Response } from "express";
const BUCKET_NAME = process.env.BUCKET_NAME;

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