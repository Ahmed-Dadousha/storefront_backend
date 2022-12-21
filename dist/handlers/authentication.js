"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.AuthHeader = exports.getTokenByUser = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
console.log(process.env.SECRET_TOKEN);
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
        jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (err) {
        console.error(err);
        res.status(401);
        res.json('invalid token');
        return false;
    }
};
exports.AuthHeader = AuthHeader;
