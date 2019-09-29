"use strict";
exports.__esModule = true;
var get_1 = require("./get");
function applyChatRouters(app) {
    app.use('/chat', get_1["default"]);
}
exports["default"] = applyChatRouters;
