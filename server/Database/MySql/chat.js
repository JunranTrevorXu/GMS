"use strict";
exports.__esModule = true;
var index_1 = require("./index");
function postMessage(fromUserId, toUserId, timestamp, content) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("insert into MESSAGE (timestamp, content) values (\"" + timestamp + "\", \"" + content + "\")", function (error, results) {
            if (error) {
                console.log('insert Message error: ', error);
                reject(error);
            }
            else {
                console.log('insert Message succeed: ', results);
                resolve(results.insertId);
            }
        });
    }).then(function (insertId) {
        index_1["default"].query("insert into CHAT (fromUserId, toUserId, messageId) \n        values (" + fromUserId + ", " + toUserId + ", " + insertId + ")", function (error, results) {
            if (error) {
                console.log('insert into chat error: ', error);
                throw (error);
            }
            else {
                console.log('insert into chat succeed: ', results);
                return;
            }
        });
    });
}
exports.postMessage = postMessage;
function fetchMessage(userAId, userBId, limit, skip) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("select * from MESSAGE inner join CHAT on MESSAGE.id = CHAT.messageId\n        where (CHAT.fromUserId = " + userAId + " and CHAT.toUserId = " + userBId + ")\n        or (CHAT.fromUserId = " + userBId + " and CHAT.toUserId = " + userAId + ") \n        order by MESSAGE.timestamp desc, MESSAGE.id desc limit " + skip + ", " + limit, function (error, results) {
            if (error) {
                console.log('fetch message error: ', error);
                reject(error);
            }
            else {
                console.log('fetch message succeed: ', results);
                resolve(results);
            }
        });
    });
}
exports.fetchMessage = fetchMessage;
