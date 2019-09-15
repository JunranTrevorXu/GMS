"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var _this = this;
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var mysqlUser = require("../Database/MySql/user");
router.post('/sendFriendRequest', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var fromUserId, toUserEmail, toUserId, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fromUserId = req.session.encryptedId;
                toUserEmail = req.body.toUserEmail;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, mysqlUser.getUserId(toUserEmail)];
            case 2:
                toUserId = _a.sent();
                return [4 /*yield*/, mysqlUser.sendFriendRequest(fromUserId, toUserId)];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                res.send('./sendFriendRequest 1');
                return [2 /*return*/];
            case 5:
                //web push
                res.send({ OK: true });
                return [2 /*return*/];
        }
    });
}); });
router.post('/acceptFriendRequest', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var toUserId, fromUserId, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                toUserId = req.session.encryptedId;
                fromUserId = req.body.fromUserId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, mysqlUser.acceptFriendRequest(fromUserId, toUserId)];
            case 2:
                _a.sent();
                return [4 /*yield*/, mysqlUser.addFriend(fromUserId, toUserId)];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                res.send('./acceptFriendRequest 1');
                return [3 /*break*/, 5];
            case 5:
                //web push
                res.send({ OK: true });
                return [2 /*return*/];
        }
    });
}); });
router.post('/subscribe', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var userId, _a, endpoint, p256dh, auth, endpointId, oldEndpointId, _b, error_3;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                userId = req.session.encryptedId;
                _a = req.body, endpoint = _a.endpoint, p256dh = _a.p256dh, auth = _a.auth;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 12, , 13]);
                return [4 /*yield*/, mysqlUser.getEndpointId(endpoint)];
            case 2:
                endpointId = (_c.sent()).endpointId;
                if (!!endpointId) return [3 /*break*/, 9];
                return [4 /*yield*/, mysqlUser.setEndpoint(endpoint, p256dh, auth)];
            case 3:
                endpointId = _c.sent();
                return [4 /*yield*/, mysqlUser.getSubscribe(userId)];
            case 4:
                oldEndpointId = _c.sent();
                if (!oldEndpointId) return [3 /*break*/, 6];
                return [4 /*yield*/, mysqlUser.updateSubscribe(userId, endpointId)];
            case 5:
                _b = _c.sent();
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, mysqlUser.subscribe(userId, endpointId)];
            case 7:
                _b = _c.sent();
                _c.label = 8;
            case 8:
                _b;
                return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, mysqlUser.preemptSubscribe(userId, endpointId)];
            case 10:
                _c.sent();
                _c.label = 11;
            case 11:
                res.send({ OK: true });
                return [3 /*break*/, 13];
            case 12:
                error_3 = _c.sent();
                res.send('./subscribe 1');
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;
