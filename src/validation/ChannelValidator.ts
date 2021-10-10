import Joi, { ValidationResult } from "joi";
import { IChannelPayload, IChannelJoinRequest } from "../interface/channel";

export const validateChannelCreation = (payload: IChannelPayload): ValidationResult => {
	const schema = Joi.object({
		name: Joi.string().min(3).max(15).required(),
		type: Joi.string().min(1).required(),
		coordinate: Joi.array().length(2).items(Joi.number()).required()
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