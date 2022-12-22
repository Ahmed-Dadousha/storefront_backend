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
const product_1 = require("../models/product");
const authentication_1 = require("./authentication");
const product_store = new product_1.ProductStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_store.index();
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const price = req.body.price;
        if (req.body.name === undefined ||
            req.body.price === undefined) {
            res.status(400);
            res.send(' some parameters are missing');
            return false;
        }
        const product = yield product_store.create({ name, price });
        res.json(product);
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
            res.send(' parameter :id. is missing');
            return false;
        }
        const product = yield product_store.show(id);
        res.json(product);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const price = req.body.price;
        if (name === undefined || price === undefined || id === undefined) {
            res.status(400);
            res.send(' parameters  eg. :name, :price, :id is missing');
            return false;
        }
        const product = yield product_store.update(id, {
            name,
            price,
        });
        res.json(product);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const deleteP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id === undefined) {
            res.status(400);
            res.send('parameter :id. is missing');
            return false;
        }
        yield product_store.deleteProduct(id);
        res.send(`Product with id ${id} successfully deleted.`);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
function productRoutes(app) {
    app.get('/products', index);
    app.post('/products/create', authentication_1.AuthHeader, create);
    app.get('/products/:id', show);
    app.put('/products/:id', authentication_1.AuthHeader, update);
    app.delete('/products/:id', authentication_1.AuthHeader, deleteP);
}
exports.default = productRoutes;
