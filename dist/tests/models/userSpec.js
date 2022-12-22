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
const user_1 = require("../../models/user");
const user_store = new user_1.UserStore();
describe('User Model', () => {
    const user = {
        username: 'ahmedDadousha',
        firstname: 'ahmed',
        lastname: 'Dadousha',
        password: 'password4444',
    };
    const createUser = (user) => {
        return user_store.create(user);
    };
    const deleteUser = (id) => {
        return user_store.deleteUser(id);
    };
    it('should have an index method', () => {
        expect(user_store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(user_store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(user_store.create).toBeDefined();
    });
    it('should have a remove method', () => {
        expect(user_store.deleteUser).toBeDefined();
    });
    it('should create a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        expect(createdUser.username).toBe(user.username);
        expect(createdUser.firstname).toBe(user.firstname);
        expect(createdUser.lastname).toBe(user.lastname);
        yield deleteUser(createdUser.id);
    }));
    it('should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        const users = yield user_store.index();
        expect(users).toBeDefined();
        yield deleteUser(createdUser.id);
    }));
    it('should return the correct user', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        const returnedUser = yield user_store.show(createdUser.id);
        expect(returnedUser).toEqual(createdUser);
        yield deleteUser(createdUser.id);
    }));
    it('should remove the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        yield deleteUser(createdUser.id);
        const users = yield user_store.index();
        expect(users).toEqual([]);
    }));
    it('should update the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        const newUserData = {
            firstname: 'ali',
            lastname: 'ibrahim',
        };
        const newUser = yield user_store.update(createdUser.id, newUserData);
        expect(newUser.firstname).toEqual(newUserData.firstname);
        expect(newUser.lastname).toEqual(newUserData.lastname);
        yield deleteUser(createdUser.id);
    }));
    it('should authenticates the user with a password', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        const returnedUser = yield user_store.authenticate(createdUser.username, createdUser.password);
        if (returnedUser) {
            expect(returnedUser.username).toBe(createdUser.username);
            expect(returnedUser.firstname).toBe(createdUser.firstname);
            expect(returnedUser.lastname).toBe(createdUser.lastname);
        }
        yield deleteUser(createdUser.id);
    }));
});
