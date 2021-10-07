import { Document } from "mongoose";
import { EChannelType } from "../common/StreamChat";

export interface IChannel extends Document {
	name: string;
	ownerId: string;
	type: EChannelType;
	coordinate: number[];
}

export interface IChannelPayload {
	name: string;
	ownerId?: string;
	type: EChannelType;
	coordinate: number[];
}

export interface IChannelJoinRequest {
	name: string;
	type: EChannelType;
}