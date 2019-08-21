"use strict";
exports.__esModule = true;
var login_1 = require("./login");
function applyPostRouters(app) {
    app.use('/login', login_1["default"]);
}
exports["default"] = applyPostRouters;
