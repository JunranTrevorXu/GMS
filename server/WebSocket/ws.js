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
exports.__esModule = true;
var moment = require('moment');
var mysqlUser = require("../Database/MySql/user");
var mysqlChat = require("../Database/MySql/chat");
var webpush_1 = require("../Service/webpush");
var user_socket_map = {};
function unregisterUserSocket(userId) {
    console.log("unregister: ", userId);
    user_socket_map[userId] = null;
}
exports.unregisterUserSocket = unregisterUserSocket;
function attachWebSocketServer(server) {
    var _this = this;
    var io = require('socket.io')(server);
    io.on('connection', function (socket) {
        socket.on('register', function (_a) {
            var userId = _a.userId;
            console.log("register: ", userId);
            user_socket_map[userId] = socket.id;
        });
        socket.on('typing', function (_a) {
            var fromUserId = _a.fromUserId, toUserId = _a.toUserId;
            console.log("typing: ", fromUserId, toUserId);
            if (user_socket_map[toUserId]) {
                io.to(user_socket_map[toUserId]).emit('typing', { fromUserId: fromUserId });
            }
        });
        socket.on('message', function (_a) {
            var fromUserId = _a.fromUserId, toUserId = _a.toUserId, message = _a.message;
            return __awaiter(_this, void 0, void 0, function () {
                var timestamp, subscribeData, pushSubscriptionObj, fromUserInfo, payloadObj;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            timestamp = moment(new Date()).utc().format('YYYY-MM-DD HH:mm:ss');
                            if (!user_socket_map[toUserId]) return [3 /*break*/, 1];
                            io.to(user_socket_map[toUserId]).emit('message', { fromUserId: fromUserId, timestamp: timestamp, message: message });
                            return [3 /*break*/, 4];
                        case 1: return [4 /*yield*/, mysqlUser.getSubscribe(toUserId)];
                        case 2:
                            subscribeData = _b.sent();
                            pushSubscriptionObj = {
                                endpoint: subscribeData.endpoint,
                                keys: {
                                    auth: subscribeData.auth,
                                    p256dh: subscribeData.p256dh
                                }
                            };
                            return [4 /*yield*/, mysqlUser.getUserInfo(fromUserId)];
                        case 3:
                            fromUserInfo = _b.sent();
                            payloadObj = {
                                notification: true,
                                message: 'New message',
                                nickname: fromUserInfo.nickname
                            };
                            webpush_1["default"].sendNotification(pushSubscriptionObj, Buffer.from(JSON.stringify(payloadObj)));
                            _b.label = 4;
                        case 4: return [4 /*yield*/, mysqlChat.postMessage(fromUserId, toUserId, timestamp, message)];
                        case 5:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
}
exports["default"] = attachWebSocketServer;
