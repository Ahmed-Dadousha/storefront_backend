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
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const authentication_1 = require("./authentication");
const user_store = new user_1.UserStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_store.index();
        res.json(users);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const username = req.body.username;
        const password = req.body.password;
        if (firstname === undefined ||
            lastname === undefined ||
            username === undefined ||
            password === undefined) {
            res.status(400);
            res.send('parameters  eg. :firstname, :lastname, :username, :password are missing!');
            return false;
        }
        const user = yield user_store.create({
            firstname,
            lastname,
            username,
            password,
        });
        res.json((0, authentication_1.getTokenByUser)(user));
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id === undefined) {
            res.status(400);
            res.send('Missing required parameter :id.');
            return false;
        }
        const user = yield user_store.show(id);
        res.json(user);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        if (firstname === undefined || lastname === undefined || id === undefined) {
            res.status(400);
            res.send('parameters  eg. :firstname, :lastname, :id are missing!');
            return false;
        }
        const user = yield user_store.update(id, {
            firstname,
            lastname,
        });
        res.json(user);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id === undefined) {
            res.status(400);
            res.send('Missing required parameter :id.');
            return false;
        }
        yield user_store.deleteUser(id);
        res.send(`User with id ${id} successfully deleted.`);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const password = req.body.password;
        if (username === undefined || password === undefined) {
            res.status(400);
            res.send('Some required parameters are missing! eg. :username, :password');
            return false;
        }
        const user = yield user_store.authenticate(username, password);
        if (user === null) {
            res.status(401);
            res.send(`Wrong password for user ${username}.`);
            return false;
        }
        res.json((0, authentication_1.getTokenByUser)(user));
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
function userRoutes(app) {
    app.get('/users', authentication_1.AuthHeader, index);
    app.post('/users/create', create);
    app.get('/users/:id', authentication_1.AuthHeader, show);
    app.put('/users/:id', authentication_1.AuthHeader, update);
    app.delete('/users/:id', authentication_1.AuthHeader, deleteUser);
    app.post('/users/auth', authenticate);
}
exports.default = userRoutes;
