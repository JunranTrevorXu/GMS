"use strict";
exports.__esModule = true;
var post_1 = require("./post");
var get_1 = require("./get");
function applyAuthRouters(app) {
    app.use('/auth', post_1["default"]);
    app.use('/auth', get_1["default"]);
}
exports["default"] = applyAuthRouters;
