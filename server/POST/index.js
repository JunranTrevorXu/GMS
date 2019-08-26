"use strict";
exports.__esModule = true;
var auth_1 = require("./auth");
function applyPostRouters(app) {
    app.use('/auth', auth_1["default"]);
}
exports["default"] = applyPostRouters;
