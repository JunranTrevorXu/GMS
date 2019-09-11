"use strict";
exports.__esModule = true;
var post_1 = require("./post");
function applyUserRouters(app) {
    app.use('/user', post_1["default"]);
}
exports["default"] = applyUserRouters;
