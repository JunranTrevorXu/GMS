"use strict";
exports.__esModule = true;
var checkCookie_1 = require("./checkCookie");
function applyMiddleWare(app) {
    app.use(checkCookie_1["default"]);
}
exports["default"] = applyMiddleWare;
