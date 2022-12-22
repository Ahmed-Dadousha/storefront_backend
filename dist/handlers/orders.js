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
const order_1 = require("../models/order");
const authentication_1 = require("./authentication");
const order_store = new order_1.OrderStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_store.index();
        res.json(orders);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let products = req.body.products;
        const status = req.body.status;
        const user_id = req.body.user_id;
        if (products === undefined ||
            status === undefined ||
            user_id === undefined) {
            res.status(400);
            res.send('parameters are  :products, :status, :user_id missing');
            return false;
        }
        const order = yield order_store.create({
            products,
            status,
            user_id,
        });
        res.json(order);
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
            res.send('missing  parameter id');
            return false;
        }
        const order = yield order_store.show(id);
        res.json(order);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let products = req.body.products;
        const status = req.body.status;
        const user_id = req.body.user_id;
        if (products === undefined ||
            status === undefined ||
            user_id === undefined ||
            id === undefined) {
            res.status(400);
            res.send('Some required parameters are missing! eg. :products, :status, :user_id, :id');
            return false;
        }
        const order = yield order_store.update(id, {
            products,
            status,
            user_id,
        });
        res.json(order);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id === undefined) {
            res.status(400);
            res.send('Missing required parameter :id.');
            return false;
        }
        yield order_store.deleteOrder(id);
        res.send(`Order with id ${id} successfully deleted.`);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
function orderRoutes(app) {
    app.get('/orders', authentication_1.AuthHeader, index);
    app.post('/orders/create', authentication_1.AuthHeader, create);
    app.get('/orders/:id', authentication_1.AuthHeader, show);
    app.put('/orders/:id', authentication_1.AuthHeader, update);
    app.delete('/orders/:id', authentication_1.AuthHeader, deleteOrder);
}
exports.default = orderRoutes;
