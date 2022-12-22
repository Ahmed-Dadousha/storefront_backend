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
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../utilities/database"));
class ProductStore {
    //Get all products
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM products';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Can not  get all products. ${err}`);
            }
        });
    }
    //Create a new product
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [product.name, product.price]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Can not create new product ${product.name}. ${err}`);
            }
        });
    }
    // Get a specific product
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM products WHERE id=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find product ${id}. ${err}`);
            }
        });
    }
    // Update a product
    update(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [newData.name, newData.price, id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Can not update the product ${newData.name}. ${err}`);
            }
        });
    }
    // delete a product (can not create a variable with name delete)
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM products WHERE id=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Can not delete the product ${id}. ${err}`);
            }
        });
    }
}
exports.ProductStore = ProductStore;
