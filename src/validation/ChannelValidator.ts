import Joi, { ValidationResult } from "joi";
import { IChannelPayload, IChannelJoinRequest } from "../interface/channel";

export const validateChannelCreation = (payload: IChannelPayload): ValidationResult => {
	const schema = Joi.object({
		name: Joi.string().min(3).max(25).required(),
		description: Joi.string().required(),
		coordinate: Joi.string().required()
	});
	return schema.validate(payload);
};

export const validateJoinChannel = (payload: IChannelJoinRequest): ValidationResult => {
	const schema = Joi.object({
		id: Joi.string().required(),
		type: Joi.string().required()
	});
	return schema.validate(payload);
};