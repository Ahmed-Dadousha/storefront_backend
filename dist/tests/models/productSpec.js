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
const product_1 = require("../../models/product");
const product_store = new product_1.ProductStore();
describe('Product Model', () => {
    const product = {
        name: 'lenovo legion five',
        price: 30000,
    };
    const createProduct = (product) => {
        return product_store.create(product);
    };
    const deleteProduct = (id) => {
        return product_store.deleteProduct(id);
    };
    it('should have an index method', () => {
        expect(product_store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(product_store.show).toBeDefined();
    });
    it('should have a add method', () => {
        expect(product_store.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(product_store.deleteProduct).toBeDefined();
    });
    it('should add a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield createProduct(product);
        expect(createdProduct.price).toEqual(product.price);
        expect(createdProduct.name).toEqual(product.name);
        yield deleteProduct(createdProduct.id);
    }));
    it('should return a list of products', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield createProduct(product);
        const allProducts = yield product_store.index();
        expect(allProducts).toBeDefined();
        yield deleteProduct(createdProduct.id);
    }));
    it('should return the correct product', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield createProduct(product);
        const returnedProduct = yield product_store.show(createdProduct.id);
        expect(returnedProduct).toEqual(createdProduct);
        yield deleteProduct(createdProduct.id);
    }));
    it('should update the product', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield createProduct(product);
        const newData = {
            name: 'lenovo idea pad',
            price: 15000,
        };
        const result = yield product_store.update(createdProduct.id, newData);
        expect(result.name).toEqual(newData.name);
        expect(result.price).toEqual(newData.price);
        yield deleteProduct(createdProduct.id);
    }));
    it('should remove the product', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield createProduct(product);
        yield deleteProduct(createdProduct.id);
        const allProducts = yield product_store.index();
        expect(allProducts).toEqual([]);
    }));
});
