import { Document } from "mongoose";

export interface IUser extends Document{
	email: string;
	username: string;
	password: string;
}

export interface IUserPayload {
	id?: string;
	email: string;
	username: string;
	password: string;
	streamIOToken?: string;
}

export interface IUserLoginRequest {
	email: string;
	password: string;
}