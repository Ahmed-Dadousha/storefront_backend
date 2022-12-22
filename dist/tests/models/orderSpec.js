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
const order_1 = require("../../models/order");
const user_1 = require("../../models/user");
const product_1 = require("../../models/product");
const order_store = new order_1.OrderStore();
describe('Order Model', () => {
    const user_store = new user_1.UserStore();
    const product_store = new product_1.ProductStore();
    let order, user_id, product_id;
    const createOrder = (order) => {
        return order_store.create(order);
    };
    const deleteOrder = (id) => {
        return order_store.deleteOrder(id);
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_store.create({
            username: 'mahmoudAali',
            firstname: 'mahmoud',
            lastname: 'ali',
            password: 'password7777',
        });
        user_id = user.id;
        const product = yield product_store.create({
            name: 'test product',
            price: 200,
        });
        product_id = product.id;
        order = {
            products: [
                {
                    product_id,
                    quantity: 10,
                },
            ],
            user_id,
            status: true,
        };
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_store.deleteUser(user_id);
        yield product_store.deleteProduct(product_id);
    }));
    it('should have an index method', () => {
        expect(order_store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(order_store.show).toBeDefined();
    });
    it('should have a add method', () => {
        expect(order_store.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(order_store.deleteOrder).toBeDefined();
    });
    it('should create an order', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdOrder = yield createOrder(order);
        expect(createdOrder).toEqual(Object.assign({ id: createdOrder.id }, order));
        yield deleteOrder(createdOrder.id);
    }));
    it('should return a list of orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdOrder = yield createOrder(order);
        const orderList = yield order_store.index();
        expect(orderList).toBeDefined();
        yield deleteOrder(createdOrder.id);
    }));
    it('should return the correct orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdOrder = yield createOrder(order);
        const returnedOrder = yield order_store.show(createdOrder.id);
        expect(returnedOrder).toEqual(createdOrder);
        yield deleteOrder(createdOrder.id);
    }));
    it('should update the order', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdOrder = yield createOrder(order);
        const newData = {
            products: [
                {
                    product_id,
                    quantity: 500,
                },
            ],
            user_id,
            status: false,
        };
        const result = yield order_store.update(createdOrder.id, newData);
        expect(result.products).toEqual(newData.products);
        expect(result.status).toEqual(newData.status);
        yield deleteOrder(createdOrder.id);
    }));
    it('should remove the order', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdOrder = yield createOrder(order);
        yield deleteOrder(createdOrder.id);
        const Allorders = yield order_store.index();
        expect(Allorders).toEqual([]);
    }));
});
