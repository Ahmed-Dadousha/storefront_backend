"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHeader = exports.getTokenByUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// console.log(process.env.SECRET_TOKEN);
const getTokenByUser = (user) => {
    return jsonwebtoken_1.default.sign({ user }, process.env.SECRET_TOKEN);
};
exports.getTokenByUser = getTokenByUser;
const AuthHeader = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401);
        res.json(' invalid token');
        return false;
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN);
        next();
    }
    catch (err) {
        console.error(err);
        res.status(401);
        res.json(`invalid token button' + ${req.headers.authorization.split(' ')[1]}`);
        return false;
    }
};
exports.AuthHeader = AuthHeader;
