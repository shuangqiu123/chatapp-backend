import mongoose, { ConnectOptions, Mongoose } from "mongoose";

const URL = process.env.DATABASE_URL;
const connectOptions: ConnectOptions = {
	dbName: process.env.DATABASE_NAME,
	user: process.env.DATABASE_USER,
	pass: process.env.DATABASE_PASSWORD,
	autoIndex: true,
	autoCreate: true
};

const connect = (): Promise<Mongoose> => {
	return mongoose.connect(URL, connectOptions);
};

export default connect;