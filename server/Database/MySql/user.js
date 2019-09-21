"use strict";
exports.__esModule = true;
var index_1 = require("./index");
function createUser(email) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("insert into USER (email) values (\"" + email + "\");", function (error, results) {
            if (error) {
                console.log('create user error: ', error);
                reject(error);
            }
            else {
                console.log('create user succeed: ', results);
                resolve();
            }
        });
    });
}
exports.createUser = createUser;
function getUserId(email) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("select id from USER where email = \"" + email + "\"", function (error, results) {
            if (error) {
                console.log('get user Id error: ', error);
                reject(error);
            }
            else {
                console.log('get user Id succeed: ', results);
                resolve(results.length > 0 ? results[0].id : null);
            }
        });
    });
}
exports.getUserId = getUserId;
function getUserInfo(id) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("select email, nickname from USER where id = \"" + id + "\"", function (error, results) {
            if (error) {
                console.log('get user info error: ', error);
                reject(error);
            }
            else {
                console.log('get user info succeed: ', results);
                resolve(results.length > 0 ? results[0] : null);
            }
        });
    });
}
exports.getUserInfo = getUserInfo;
function login(email, password) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("select id from USER where email = \"" + email + "\" and password = \"" + password + "\"", function (error, results) {
            if (error) {
                console.log('login error: ', error);
                reject(error);
            }
            else {
                console.log('login succeed: ', results);
                resolve({ auth: results.length > 0 });
            }
        });
    });
}
exports.login = login;
function setNickname(id, nickname) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("update USER set nickname = \"" + nickname + "\" where id = " + id, function (error, result) {
            if (error) {
                console.log('set nickname error: ', error);
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
}
exports.setNickname = setNickname;
function setPassword(id, password) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("update USER set password = \"" + password + "\" where id = " + id, function (error, result) {
            if (error) {
                console.log('set password error: ', error);
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
}
exports.setPassword = setPassword;
function createOnline(userId) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("insert into ONLINE (userId, online) values (" + userId + ", false)", function (error, results) {
            if (error) {
                console.log('login error: ', error);
                reject(error);
            }
            else {
                console.log('login succeed: ', results);
                resolve();
            }
        });
    });
}
exports.createOnline = createOnline;
function setOnline(userId) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("update ONLINE set online = true where userId = " + userId, function (error, results) {
            if (error) {
                console.log('set online error: ', error);
                reject(error);
            }
            else {
                console.log('set online succeed: ', results);
                resolve();
            }
        });
    });
}
exports.setOnline = setOnline;
function getOnline(userId) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("select online from ONLINE where userId = " + userId, function (error, results) {
            if (error) {
                console.log('get online error: ', error);
                reject(error);
            }
            else {
                console.log('get online succeed: ', results);
                resolve(results.length > 0 ? results[0].online : null);
            }
        });
    });
}
exports.getOnline = getOnline;
function setOffline(userId) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("update ONLINE set online = false where userId = " + userId, function (error, results) {
            if (error) {
                console.log('set offline error: ', error);
                reject(error);
            }
            else {
                console.log('set offline succeed: ', results);
                resolve();
            }
        });
    });
}
exports.setOffline = setOffline;
function sendFriendRequest(fromUserId, toUserId) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("insert into FRIEND_REQUEST (fromUserId, toUserId, accepted) values (" + fromUserId + ", " + toUserId + ", false)", function (error, results) {
            if (error) {
                console.log('send friend request error: ', error);
                reject(error);
            }
            else {
                console.log('send friend request succeed: ', results);
                resolve();
            }
        });
    });
}
exports.sendFriendRequest = sendFriendRequest;
function acceptFriendRequest(fromUserId, toUserId) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("update FRIEND_REQUEST set accepted = true where fromUserId = " + fromUserId + " and toUserId = " + toUserId, function (error, results) {
            if (error) {
                console.log('accept friend request error: ', error);
                reject(error);
            }
            else {
                console.log('accept friend request succeed: ', results);
                resolve();
            }
        });
    });
}
exports.acceptFriendRequest = acceptFriendRequest;
function getFriendRequest(toUserId) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("select USER.id, USER.nickname, USER.email from FRIEND_REQUEST inner join USER \n        on FRIEND_REQUEST.fromUserId = USER.id where FRIEND_REQUEST.toUserId = " + toUserId + " and FRIEND_REQUEST.accepted = false", function (error, results) {
            if (error) {
                console.log('get friend request error: ', error);
                reject(error);
            }
            else {
                console.log('get friend request succeed: ', results);
                resolve(results);
            }
        });
    });
}
exports.getFriendRequest = getFriendRequest;
function addFriend(userAId, userBId) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("insert into FRIEND (userAId, userBId) values (" + userAId + ", " + userBId + ")", function (error, results) {
            if (error) {
                console.log('add friend  error: ', error);
                reject(error);
            }
            else {
                console.log('add friend succeed: ', results);
                resolve();
            }
        });
    }).then(function () {
        index_1["default"].query("insert into FRIEND (userAId, userBId) values (" + userBId + ", " + userAId + ")", function (error, results) {
            if (error) {
                console.log('add friend reverse error: ', error);
                throw (error);
            }
            else {
                console.log('add friend reverse succeed: ', results);
                return;
            }
        });
    });
}
exports.addFriend = addFriend;
function getFriend(userAId) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("select USER.id, USER.nickname, USER.email, ONLINE.online from \n        FRIEND inner join USER on FRIEND.userBId = USER.id\n        inner join ONLINE on USER.id = ONLINE.userId where FRIEND.userAId = " + userAId, function (error, results) {
            if (error) {
                console.log('get friend  error: ', error);
                reject(error);
            }
            else {
                console.log('get friend succeed: ', results);
                resolve(results);
            }
        });
    });
}
exports.getFriend = getFriend;
function setEndpoint(endpoint, p256dh, auth) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("insert into ENDPOINT (endpoint, p256dh, auth) values (\"" + endpoint + "\", \"" + p256dh + "\", \"" + auth + "\")", function (error, results) {
            if (error) {
                console.log('set endpoint error: ', error);
                reject(error);
            }
            else {
                console.log('set endpoint succeed: ', results);
                resolve(results.insertId);
            }
        });
    });
}
exports.setEndpoint = setEndpoint;
function getEndpointId(endpoint) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("select id from ENDPOINT where endpoint = \"" + endpoint + "\"", function (error, results) {
            if (error) {
                console.log('get endpointId error: ', error);
                reject(error);
            }
            else {
                console.log('get endpointId succeed: ', results);
                resolve({ endpointId: results.length > 0 ? results[0].id : null });
            }
        });
    });
}
exports.getEndpointId = getEndpointId;
function getSubscribe(userId) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("select ENDPOINT.* from ENDPOINT inner join USER_SUBSCRIPTION \n        on ENDPOINT.id = USER_SUBSCRIPTION.endpointId where USER_SUBSCRIPTION.userId = " + userId, function (error, results) {
            if (error) {
                console.log('get subscribe error: ', error);
                reject(error);
            }
            else {
                console.log('get subscribe succeed: ', results);
                resolve(results.length > 0 ? results[0] : null);
            }
        });
    });
}
exports.getSubscribe = getSubscribe;
function subscribe(userId, endpointId) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("insert into USER_SUBSCRIPTION (userId, endpointId) values (" + userId + ", " + endpointId + ")", function (error, results) {
            if (error) {
                console.log('insert error: ', error);
                reject(error);
            }
            else {
                console.log('insert succeed: ', results);
                resolve();
            }
        });
    });
}
exports.subscribe = subscribe;
function preemptSubscribe(userId, endpointId) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("update USER_SUBSCRIPTION set userId = " + userId + " where endpointId = " + endpointId, function (error, results) {
            if (error) {
                console.log('preempt error: ', error);
                reject(error);
            }
            else {
                console.log('preempt succeed: ', results);
                resolve();
            }
        });
    });
}
exports.preemptSubscribe = preemptSubscribe;
function removeSubscribe(userId) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("delete from USER_SUBSCRIPTION where userId = " + userId, function (error, results) {
            if (error) {
                console.log('remove error: ', error);
                reject(error);
            }
            else {
                console.log('remove succeed: ', results);
                resolve();
            }
        });
    });
}
exports.removeSubscribe = removeSubscribe;
function updateSubscribe(userId, endpointId) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("update USER_SUBSCRIPTION set endpointId = " + endpointId + " where userId = " + userId, function (error, results) {
            if (error) {
                console.log('update error: ', error);
                reject(error);
            }
            else {
                console.log('update succeed: ', results);
                resolve();
            }
        });
    });
}
exports.updateSubscribe = updateSubscribe;
function checkEndpointOccupation(endpointId) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("select * from USER_SUBSCRIPTION where endpointId = " + endpointId, function (error, results) {
            if (error) {
                console.log('check error: ', error);
                reject(error);
            }
            else {
                console.log('check succeed: ', results);
                resolve(results.length > 0);
            }
        });
    });
}
exports.checkEndpointOccupation = checkEndpointOccupation;
