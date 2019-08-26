"use strict";
exports.__esModule = true;
var index_1 = require("./index");
function createUser(email) {
    return new Promise(function (resolve, reject) {
        index_1["default"].query("insert into USER (id, email) values (uuid(), \"" + email + "\");", function (error, results) {
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
