import jwt from 'jsonwebtoken';
import express from 'express';
import { User } from '../interfaces/user.interface';

// console.log(process.env.SECRET_TOKEN);

export const getTokenByUser = (user: User) => {
	return jwt.sign({ user }, process.env.SECRET_TOKEN as string);
};

export const AuthHeader = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
): void | boolean => {
	if (!req.headers.authorization) {
		res.status(401);
		res.json(' invalid token');

		return false;
	}

	try {
		const token = req.headers.authorization.split(' ')[1];
		console.log(token);
		jwt.verify(token, process.env.SECRET_TOKEN as string);

		next();
	} catch (err) {
		console.error(err);

		res.status(401);
		res.json(
			`invalid token button' + ${req.headers.authorization.split(' ')[1]}`
		);

		return false;
	}
};
