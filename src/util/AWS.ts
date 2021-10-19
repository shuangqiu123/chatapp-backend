import AWS from "aws-sdk";
import { Request } from "express";
import multer from "multer";
import multerS3 from "multer-s3";

const BUCKET_NAME = process.env.BUCKET_NAME;
const REGION = "ap-southeast-2";
const s3 = new AWS.S3({ region: REGION });

export const uploader = multer({
	storage: multerS3({
		s3,
		bucket: BUCKET_NAME,
		acl: "public-read",
		metadata: function (request, file, callback) {
			callback(null, {});
		},
		key: function (request: Request, file, callback) {
			const userId = request.session.userId;
			if (request.originalUrl.includes("/channel")) {
				file.filename = "channel/" + userId + "/" + file.originalname;
			}
			else {
				file.filename = userId + "/" + file.originalname;
			}
			callback(null, file.filename);
		}
	})
});