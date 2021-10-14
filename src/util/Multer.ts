import { Request } from "express";
import multer from "multer";
import crypto from "crypto";
import { uploadObject } from "./AWS";

const BUCKET_NAME = process.env.BUCKET_NAME;

interface CustomFileResult extends Partial<Express.Multer.File> {
	url: string;
}

class CustomStorageEngine implements multer.StorageEngine {
	_handleFile = (
		request: Request,
		file: Express.Multer.File,
		callback: (error?: unknown, info?: CustomFileResult) => void
	): void => {
		const path = crypto.randomBytes(8).toString("hex") + "/" + file.originalname;
		file.filename = `https://${BUCKET_NAME}.s3.ap-southeast-2.amazonaws.com/${path}`;
		file.stream.on("data", chunk => {
			uploadObject(path, chunk)
				.then((result) => {
					console.log(result);
					callback(null, {
						url: file.filename
					});
				})
				.catch(error => {
					callback(error);
				});
		});
	};

	_removeFile = (
		_req: Request,
		file: Express.Multer.File & { name: string },
		callback: (error: Error | null) => void
	): void => {
		callback(null);
	};
}

export default CustomStorageEngine;