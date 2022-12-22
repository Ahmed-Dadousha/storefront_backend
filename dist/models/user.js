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
exports.UserStore = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../utilities/database"));
class UserStore {
    // return all data in users table
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Can not users  users. ${err}`);
            }
        });
    }
    // create a new user and return it
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO users (firstname, lastname, username, password_digest) VALUES($1, $2, $3, $4) RETURNING *';
                const hash = bcrypt_1.default.hashSync(user.password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS, 10));
                const connection = yield database_1.default.connect();
                const result = yield connection.query(sql, [
                    user.firstname,
                    user.lastname,
                    user.username,
                    hash,
                ]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Can not add  a new user ${user.firstname} ${user.lastname}. ${err}`);
            }
        });
    }
    // return a spacific user data
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM users WHERE id=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Can not find the user ${id}. ${err}`);
            }
        });
    }
    // update a user information
    update(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3 RETURNING *';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [
                    newData.firstname,
                    newData.lastname,
                    id,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Can not update the user ${newData.firstname} ${newData.lastname}. ${err}`);
            }
        });
    }
    // delete a user from users table
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM users WHERE id=($1)';
                const conn = yield database_1.default.connect();
                yield conn.query(sql, [id]);
                conn.release();
                return true;
            }
            catch (err) {
                throw new Error(`Can not delete user ${id}. ${err}`);
            }
        });
    }
    // check if a user is exist in users table
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM users WHERE username=($1)';
                const connection = yield database_1.default.connect();
                const result = yield connection.query(sql, [username]);
                if (result.rows[0].length) {
                    const user = result.rows[0];
                    if (bcrypt_1.default.compareSync(password + process.env.BCRYPT_PASSWORD, user.password_digest)) {
                        return user;
                    }
                }
                connection.release();
                return null;
            }
            catch (err) {
                throw new Error(`Can not find user ${username}. ${err}`);
            }
        });
    }
}
exports.UserStore = UserStore;
