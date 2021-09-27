import bcrypt from "bcrypt";
const SALT_ROUNT = 10;

export const encodePassword = (rawPassword: string): string => {
	const encodedPassword = bcrypt.hashSync(rawPassword, SALT_ROUNT);
	return encodedPassword;
};

export const comparePassword = (rawPassword: string, encodedPassword: string): boolean => {
	const isSame = bcrypt.compareSync(rawPassword, encodedPassword);
	return isSame;
};