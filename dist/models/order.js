"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.OrderStore = void 0;
var database_1 = __importDefault(require("../utilities/database"));
var OrderStore = /** @class */ (function () {
    function OrderStore() {
    }
    // Show all orders
    OrderStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result1, orderProductsquery, orders, _i, _a, order, result2, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _b.sent();
                        sql = 'SELECT * FROM orders';
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result1 = _b.sent();
                        orderProductsquery = 'SELECT product_id, quantity FROM order_products WHERE order_id=($1)';
                        orders = [];
                        _i = 0, _a = result1.rows;
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        order = _a[_i];
                        return [4 /*yield*/, conn.query(orderProductsquery, [order.id])];
                    case 4:
                        result2 = _b.sent();
                        orders.push(__assign(__assign({}, order), { products: result2.rows }));
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        conn.release();
                        return [2 /*return*/, orders];
                    case 7:
                        err_1 = _b.sent();
                        throw new Error("Can not get all orders. ".concat(err_1));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // Create a new order
    OrderStore.prototype.create = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, result1, orderProductsQuery, orderProducts, _i, _a, product, result2, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _b.sent();
                        return [4 /*yield*/, connection.query(sql, [
                                order.user_id,
                                order.status,
                            ])];
                    case 2:
                        result1 = _b.sent();
                        orderProductsQuery = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity';
                        orderProducts = [];
                        _i = 0, _a = order.products;
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        product = _a[_i];
                        return [4 /*yield*/, connection.query(orderProductsQuery, [
                                result1.rows[0].id,
                                product.product_id,
                                product.quantity,
                            ])];
                    case 4:
                        result2 = _b.sent();
                        orderProducts.push(result2.rows[0]);
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        connection.release();
                        return [2 /*return*/, __assign(__assign({}, result1.rows[0]), { products: orderProducts })];
                    case 7:
                        err_2 = _b.sent();
                        throw new Error("Can not add new order for user ".concat(order.user_id, ". ").concat(err_2));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // Show a spacific order
    OrderStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result1, order, orderProductsQuery, result2, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        sql = 'SELECT * FROM orders WHERE id=($1)';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result1 = _a.sent();
                        order = result1.rows[0];
                        orderProductsQuery = 'SELECT product_id, quantity FROM order_products WHERE order_id=($1)';
                        return [4 /*yield*/, conn.query(orderProductsQuery, [id])];
                    case 3:
                        result2 = _a.sent();
                        conn.release();
                        return [2 /*return*/, __assign(__assign({}, order), { products: result2.rows })];
                    case 4:
                        err_3 = _a.sent();
                        throw new Error("Could not find order ".concat(id, ". ").concat(err_3));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // update an order
    OrderStore.prototype.update = function (id, newData) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result1, orderProductsQuery, orderProducts, _i, _a, product, result2, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        sql = 'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _b.sent();
                        return [4 /*yield*/, conn.query(sql, [newData.status, id])];
                    case 2:
                        result1 = _b.sent();
                        orderProductsQuery = 'UPDATE order_products SET product_id = $1, quantity = $2 WHERE order_id = $3 RETURNING product_id, quantity';
                        orderProducts = [];
                        _i = 0, _a = newData.products;
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        product = _a[_i];
                        return [4 /*yield*/, conn.query(orderProductsQuery, [
                                product.product_id,
                                product.quantity,
                                result1.rows[0].id,
                            ])];
                    case 4:
                        result2 = _b.sent();
                        orderProducts.push(result2.rows[0]);
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        conn.release();
                        return [2 /*return*/, __assign(__assign({}, result1.rows[0]), { products: orderProducts })];
                    case 7:
                        err_4 = _b.sent();
                        throw new Error("Can not update order for user ".concat(newData.user_id, ". ").concat(err_4));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // Delete a user
    OrderStore.prototype.deleteOrder = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, orderProductsSql, sql, result2, order, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        orderProductsSql = 'DELETE FROM order_products WHERE order_id=($1)';
                        return [4 /*yield*/, conn.query(orderProductsSql, [id])];
                    case 2:
                        _a.sent();
                        sql = 'DELETE FROM orders WHERE id=($1)';
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 3:
                        result2 = _a.sent();
                        order = result2.rows[0];
                        conn.release();
                        return [2 /*return*/, order];
                    case 4:
                        err_5 = _a.sent();
                        throw new Error("Could not delete order ".concat(id, ". ").concat(err_5));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return OrderStore;
}());
exports.OrderStore = OrderStore;
