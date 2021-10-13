import { S3Client, PutObjectCommand, PutObjectCommandOutput } from "@aws-sdk/client-s3";

const BUCKET_NAME = process.env.BUCKET_NAME;
const REGION = "ap-southeast-2";
const s3Client = new S3Client({ region: REGION });

export const uploadObject = async (path: string, object: Buffer): Promise<PutObjectCommandOutput> => {
	const result: PutObjectCommandOutput = await s3Client.send(new PutObjectCommand({
		Bucket: BUCKET_NAME,
		Key: path,
		Body: object
	}));
	return result;
};