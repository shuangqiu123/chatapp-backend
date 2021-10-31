import { Document } from "mongoose";

export interface IUser extends Document {
	email: string;
	username?: string;
	password: string;
	bio?: string;
	avatar?: string;
	joinedChannels?: string[];
	coordinate?: number[];
}

export interface IUserPayload {
	id?: string;
	email: string;
	username?: string;
	password: string;
	avatar?: string;
	streamIOToken?: string;
	bio?: string;
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
}

export interface IUserGet {
	users: string[];
}
export interface IUserGetResponse {
	location: number[][];
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
