"use strict";
exports.__esModule = true;
var get_1 = require("./get");
var post_1 = require("./post");
function applyUserRouters(app) {
    app.use('/user', get_1["default"]);
    app.use('/user', post_1["default"]);
}
exports["default"] = applyUserRouters;
