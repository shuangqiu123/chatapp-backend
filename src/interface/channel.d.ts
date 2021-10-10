import { Document } from "mongoose";
import { EChannelType } from "../common/StreamChat";

export interface IChannel extends Document {
	name: string;
	ownerId: string;
	type: EChannelType;
	coordinate: number[];
}

export interface IChannelPayload {
	id?: string;
	name: string;
	ownerId?: string;
	type: EChannelType;
	coordinate: number[];
}

export interface IChannelJoinRequest {
	id: string;
	type: EChannelType;
}