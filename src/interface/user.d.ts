import { Document } from "mongoose";

export interface IUser extends Document{
	email: string;
	username: string;
	password: string;
	bio: string;
	photo: string;
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

export interface IUserResponse {
	auth: Auth;
	profile: Profile;
}

export interface IProfileUpdate {
	username: string;
	bio: string;
	password:string;
}

export interface IProfileResponse {
	profile: Profile;
}

export interface Profile {
	email: string;
	username: string;
	bio: string;
	photo: string;
}

export interface Auth {
	streamIOToken: string;
	token: string;
}