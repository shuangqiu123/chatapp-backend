import { Request, Response } from "express";

export const uploadUserPhoto = (request: Request, response: Response): void => {
	const data = request.file;
	console.log(data);

	if (data) {
		response.json({
			code: 200,
			data: {
				url: data.filename
			}
		});
		return;
	}
	response.json({
		code: 500,
		message: "cannot upload image"
	});
};