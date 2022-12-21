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
exports.__esModule = true;
var user_1 = require("../models/user");
var authentication_1 = require("./authentication");
var UserStoreInstance = new user_1.UserStore();
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, UserStoreInstance.index()];
            case 1:
                users = _a.sent();
                res.json(users);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                res.status(400);
                res.json(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var firstname, lastname, username, password, user, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                firstname = req.body.firstname;
                lastname = req.body.lastname;
                username = req.body.username;
                password = req.body.password;
                if (firstname === undefined ||
                    lastname === undefined ||
                    username === undefined ||
                    password === undefined) {
                    res.status(400);
                    res.send('Some required parameters are missing! eg. :firstname, :lastname, :username, :password');
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, UserStoreInstance.create({
                        firstname: firstname,
                        lastname: lastname,
                        username: username,
                        password: password
                    })];
            case 1:
                user = _a.sent();
                res.json((0, authentication_1.getTokenByUser)(user));
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                res.status(400);
                res.json(e_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var read = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                if (id === undefined) {
                    res.status(400);
                    res.send('Missing required parameter :id.');
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, UserStoreInstance.show(id)];
            case 1:
                user = _a.sent();
                res.json(user);
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                res.status(400);
                res.json(e_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, firstname, lastname, user, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                firstname = req.body.firstname;
                lastname = req.body.lastname;
                if (firstname === undefined || lastname === undefined || id === undefined) {
                    res.status(400);
                    res.send('Some required parameters are missing! eg. :firstname, :lastname, :id');
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, UserStoreInstance.update(id, {
                        firstname: firstname,
                        lastname: lastname
                    })];
            case 1:
                user = _a.sent();
                res.json(user);
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                res.status(400);
                res.json(e_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                if (id === undefined) {
                    res.status(400);
                    res.send('Missing required parameter :id.');
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, UserStoreInstance.deleteUser(id)];
            case 1:
                _a.sent();
                res.send("User with id ".concat(id, " successfully deleted."));
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                res.status(400);
                res.json(e_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var authenticate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, user, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                username = req.body.username;
                password = req.body.password;
                if (username === undefined || password === undefined) {
                    res.status(400);
                    res.send('Some required parameters are missing! eg. :username, :password');
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, UserStoreInstance.authenticate(username, password)];
            case 1:
                user = _a.sent();
                if (user === null) {
                    res.status(401);
                    res.send("Wrong password for user ".concat(username, "."));
                    return [2 /*return*/, false];
                }
                res.json((0, authentication_1.getTokenByUser)(user));
                return [3 /*break*/, 3];
            case 2:
                e_6 = _a.sent();
                res.status(400);
                res.json(e_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
function userRoutes(app) {
    app.get('/users', authentication_1.AuthHeader, index);
    app.post('/users/create', create);
    app.get('/users/:id', authentication_1.AuthHeader, read);
    app.put('/users/:id', authentication_1.AuthHeader, update);
    app["delete"]('/users/:id', authentication_1.AuthHeader, deleteUser);
    app.post('/users/auth', authenticate);
}
exports["default"] = userRoutes;
