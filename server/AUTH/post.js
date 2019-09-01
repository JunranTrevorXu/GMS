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
var email_1 = require("../Service/email");
var mysqlUser = require("../Database/MySql/user");
router.post('/signin', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var email, password, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                password = req.body.password;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, mysqlUser.login(email, password)];
            case 2:
                result = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                res.send('/signin 1');
                return [2 /*return*/];
            case 4:
                if (result.auth) {
                    req.session.loggedin = true;
                    res.send({ OK: true });
                }
                else {
                    res.send('/signin 2');
                }
                return [2 /*return*/];
        }
    });
}); });
router.post('/signup', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var to, subject, text, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                to = req.body.email;
                subject = "One more step needed";
                text = "Thank you for registering for GMS!\nClick the link below to finish the signup:\n\n"
                    + process.env.clientHost + "/signup";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, mysqlUser.createUser(to)];
            case 2:
                _a.sent();
                return [4 /*yield*/, mysqlUser.getUserId(to)];
            case 3:
                result = _a.sent();
                if (!(result.id !== null)) return [3 /*break*/, 5];
                return [4 /*yield*/, email_1["default"](to, subject, text)];
            case 4:
                _a.sent();
                // set encrypted Id for submit register
                req.session.encryptedId = result.id;
                res.send({ OK: true });
                return [3 /*break*/, 6];
            case 5:
                res.send('/signup 1');
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_2 = _a.sent();
                if (error_2.code === 'ER_DUP_ENTRY') {
                    res.send({ code: 'ER_DUP_ENTRY' });
                }
                else if (error_2.code === 'EENVELOPE') {
                    res.send({ code: 'BAD_EMAIL' });
                }
                else {
                    res.send('/signup 2');
                }
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
router.post('/signup/submit', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id, nickname, password, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.session.encryptedId;
                nickname = req.body.nickname;
                password = req.body.password;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, mysqlUser.setNickname(id, nickname)];
            case 2:
                _a.sent();
                return [4 /*yield*/, mysqlUser.setPassword(id, password)];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                res.send('/signup/submit 1');
                return [2 /*return*/];
            case 5:
                req.session.encryptedId = null;
                req.session.loggedin = true;
                res.send({ OK: true });
                return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;
