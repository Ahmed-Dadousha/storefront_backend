"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.AuthHeader = exports.getTokenByUser = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// console.log(process.env.SECRET_TOKEN);
var getTokenByUser = function (user) {
    return jsonwebtoken_1["default"].sign({ user: user }, process.env.SECRET_TOKEN);
};
exports.getTokenByUser = getTokenByUser;
var AuthHeader = function (req, res, next) {
    if (!req.headers.authorization) {
        res.status(401);
        res.json(' invalid token');
        return false;
    }
    try {
        var token = req.headers.authorization.split(' ')[1];
        console.log(token);
        jsonwebtoken_1["default"].verify(token, process.env.SECRET_TOKEN);
        next();
    }
    catch (err) {
        console.error(err);
        res.status(401);
        res.json("invalid token button' + ".concat(req.headers.authorization.split(' ')[1]));
        return false;
    }
};
exports.AuthHeader = AuthHeader;
// import jwt, { Secret } from 'jsonwebtoken';
// import { User } from '../interfaces/user.interface';
// import { NextFunction, Request, Response } from 'express';
// import dotenv from 'dotenv';
// dotenv.config();
// const SECRET = process.env.TOKEN_KEY as Secret;
// export const getTokenByUser = (user: User) => {
// 	return jwt.sign({ user }, SECRET);
// };
// export const AuthHeader = (req: Request, res: Response, next: NextFunction) => {
// 	if (!req.headers.authorization) {
// 		res.status(401).json({ error: 'Access denied, invalid token' });
// 		return false;
// 	}
// 	try {
// 		const token = req.headers.authorization.split(' ')[1];
// 		jwt.verify(token, SECRET);
// 		next();
// 	} catch (error) {
// 		res.status(401);
// 		res.json('Access denied, invalid token');
// 		return;
// 	}
// };
