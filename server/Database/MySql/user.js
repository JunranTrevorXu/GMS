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
                resolve({ id: results.length > 0 ? results[0].id : null });
            }
        });
    });
}
exports.getUserId = getUserId;
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
function logout(userId) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("update ONLINE set online = false where userId = " + userId, function (error, results) {
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
exports.logout = logout;
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
exports.setOnline = setOnline;
function getOnline(userId) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("select online from ONLINE where userId = " + userId, function (error, results) {
            if (error) {
                console.log('login error: ', error);
                reject(error);
            }
            else {
                console.log('login succeed: ', results);
                resolve({ online: results.length > 0 ? results[0].online : null });
            }
        });
    });
}
function sendFriendRequest(fromUserId, toUserId) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("insert into FRIEND_REQUEST (fromUserId, toUserId, viewed) values (" + fromUserId + ", " + toUserId + ", false)", function (error, results) {
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
exports.sendFriendRequest = sendFriendRequest;
function acceptFriendRequest(fromUserId, toUserId) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("update FRIEND_REQUEST set viewed = true where fromUserId = " + fromUserId + " and toUserId = " + toUserId, function (error, results) {
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
exports.acceptFriendRequest = acceptFriendRequest;
function addFriend(userAId, userBId) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("insert into FRIEND (userAId, userBId) values (" + userAId + ", " + userBId + ")", function (error, results) {
            if (error) {
                console.log('login error: ', error);
                reject(error);
            }
            else {
                console.log('login succeed: ', results);
                resolve();
            }
        })
            .then(function () {
            index_1["default"].query("insert into FRIEND (userAId, userBId) values (" + userBId + ", " + userAId + ")", function (error, results) {
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
    });
}
exports.addFriend = addFriend;
function setEndpoint(endpoint, p256h, auth) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("insert into ENDPOINT (endpoint, p256h, auth) values (\"" + endpoint + "\", \"" + p256h + "\", \"" + auth + "\")", function (error, results) {
            if (error) {
                console.log('insert error: ', error);
                reject(error);
            }
            else {
                console.log('insert succeed: ', results);
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
                console.log('select error: ', error);
                reject(error);
            }
            else {
                console.log('select succeed: ', results);
                resolve({ endpointId: results.length > 0 ? results[0].id : null });
            }
        });
    });
}
exports.getEndpointId = getEndpointId;
function getEndpoint(endpointId) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("select * from ENDPOINT where id = " + endpointId, function (error, results) {
            if (error) {
                console.log('select error: ', error);
                reject(error);
            }
            else {
                console.log('select succeed: ', results);
                resolve(results[0]);
            }
        });
    });
}
exports.getEndpoint = getEndpoint;
function getSubscribe(userId) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("select endpointId from USER_SUBSCRIPTION where userId = " + userId, function (error, results) {
            if (error) {
                console.log('select error: ', error);
                reject(error);
            }
            else {
                console.log('get subscribe succeed: ', results);
                resolve(results.length > 0 ? results[0].endpointId : null);
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
