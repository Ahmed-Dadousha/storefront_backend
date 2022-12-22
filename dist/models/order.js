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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../utilities/database"));
class OrderStore {
    // Show all orders
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const result1 = yield conn.query(sql);
                const orderProductsquery = 'SELECT product_id, quantity FROM order_products WHERE order_id=($1)';
                const orders = [];
                for (const order of result1.rows) {
                    const result2 = yield conn.query(orderProductsquery, [order.id]);
                    orders.push(Object.assign(Object.assign({}, order), { products: result2.rows }));
                }
                conn.release();
                return orders;
            }
            catch (err) {
                throw new Error(`Can not get all orders. ${err}`);
            }
        });
    }
    // Create a new order
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
                const connection = yield database_1.default.connect();
                const result1 = yield connection.query(sql, [
                    order.user_id,
                    order.status,
                ]);
                const orderProductsQuery = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity';
                const orderProducts = [];
                for (const product of order.products) {
                    const result2 = yield connection.query(orderProductsQuery, [
                        result1.rows[0].id,
                        product.product_id,
                        product.quantity,
                    ]);
                    orderProducts.push(result2.rows[0]);
                }
                connection.release();
                return Object.assign(Object.assign({}, result1.rows[0]), { products: orderProducts });
            }
            catch (err) {
                throw new Error(`Can not add new order for user ${order.user_id}. ${err}`);
            }
        });
    }
    // Show a spacific order
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM orders WHERE id=($1)';
                const conn = yield database_1.default.connect();
                const result1 = yield conn.query(sql, [id]);
                const order = result1.rows[0];
                const orderProductsQuery = 'SELECT product_id, quantity FROM order_products WHERE order_id=($1)';
                const result2 = yield conn.query(orderProductsQuery, [id]);
                conn.release();
                return Object.assign(Object.assign({}, order), { products: result2.rows });
            }
            catch (err) {
                throw new Error(`Could not find order ${id}. ${err}`);
            }
        });
    }
    // update an order
    update(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *';
                const conn = yield database_1.default.connect();
                const result1 = yield conn.query(sql, [newData.status, id]);
                const orderProductsQuery = 'UPDATE order_products SET product_id = $1, quantity = $2 WHERE order_id = $3 RETURNING product_id, quantity';
                const orderProducts = [];
                for (const product of newData.products) {
                    const result2 = yield conn.query(orderProductsQuery, [
                        product.product_id,
                        product.quantity,
                        result1.rows[0].id,
                    ]);
                    orderProducts.push(result2.rows[0]);
                }
                conn.release();
                return Object.assign(Object.assign({}, result1.rows[0]), { products: orderProducts });
            }
            catch (err) {
                throw new Error(`Can not update order for user ${newData.user_id}. ${err}`);
            }
        });
    }
    // Delete a user
    deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const orderProductsSql = 'DELETE FROM order_products WHERE order_id=($1)';
                yield conn.query(orderProductsSql, [id]);
                const sql = 'DELETE FROM orders WHERE id=($1)';
                const result2 = yield conn.query(sql, [id]);
                const order = result2.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`Could not delete order ${id}. ${err}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
