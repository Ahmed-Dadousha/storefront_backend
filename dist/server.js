"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const orders_1 = __importDefault(require("./handlers/orders"));
const product_1 = __importDefault(require("./handlers/product"));
const users_1 = __importDefault(require("./handlers/users"));
const app = (0, express_1.default)();
const address = '127.0.0.1:3000';
app.use(body_parser_1.default.json());
(0, orders_1.default)(app);
(0, product_1.default)(app);
(0, users_1.default)(app);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
