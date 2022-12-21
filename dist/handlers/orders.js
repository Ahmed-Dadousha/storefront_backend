"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var order_1 = require("../models/order");
var authentication_1 = require("./authentication");
var order_store = new order_1.OrderStore();
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, order_store.index()];
            case 1:
                orders = _a.sent();
                res.json(orders);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                res.status(400);
                res.json(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, status_1, user_id, order, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                products = req.body.products;
                status_1 = req.body.status;
                user_id = req.body.user_id;
                if (products === undefined ||
                    status_1 === undefined ||
                    user_id === undefined) {
                    res.status(400);
                    res.send('parameters are  :products, :status, :user_id missing');
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, order_store.create({
                        products: products,
                        status: status_1,
                        user_id: user_id
                    })];
            case 1:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                res.status(400);
                res.json(e_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, order, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                if (id === undefined) {
                    res.status(400);
                    res.send('missing  parameter id');
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, order_store.show(id)];
            case 1:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                res.status(400);
                res.json(e_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, products, status_2, user_id, order, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                products = req.body.products;
                status_2 = req.body.status;
                user_id = req.body.user_id;
                if (products === undefined ||
                    status_2 === undefined ||
                    user_id === undefined ||
                    id === undefined) {
                    res.status(400);
                    res.send('Some required parameters are missing! eg. :products, :status, :user_id, :id');
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, order_store.update(id, {
                        products: products,
                        status: status_2,
                        user_id: user_id
                    })];
            case 1:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                res.status(400);
                res.json(e_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var deleteOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                if (id === undefined) {
                    res.status(400);
                    res.send('Missing required parameter :id.');
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, order_store.deleteOrder(id)];
            case 1:
                _a.sent();
                res.send("Order with id ".concat(id, " successfully deleted."));
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                res.status(400);
                res.json(e_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
function orderRoutes(app) {
    app.get('/orders', authentication_1.AuthHeader, index);
    app.post('/orders/create', authentication_1.AuthHeader, create);
    app.get('/orders/:id', authentication_1.AuthHeader, show);
    app.put('/orders/:id', authentication_1.AuthHeader, update);
    app["delete"]('/orders/:id', authentication_1.AuthHeader, deleteOrder);
}
exports["default"] = orderRoutes;
