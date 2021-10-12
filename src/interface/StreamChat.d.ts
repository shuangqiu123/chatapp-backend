import { EAttachmentType, EChannelType } from "../common/StreamChat";

export type ChatUser = {
	id: string;
	name: string;
	email: string;
	coordinate: number[];
	isAdmin: boolean;
}

export type ChatChannel = {
	id?: string;
	type?: EChannelType;
	ownerId?: string;
	name?: string;
	coordinate?: number[];
	created_by_id?: string;
}

export type ChatAttachment = {
	type: EAttachmentType,
	assetUrl?: string;
	thumbUrl?: string;
};

export type ChatMessage = {
	text: string;
	attachments?: ChatAttachment[];
}