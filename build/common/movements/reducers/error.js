"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actions = require("../actions");

//Handles the error state
var errorReducer = function errorReducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case "RECEIVE_ERROR":
            return action.error;
        default:
            return state;
    }
};

exports.default = errorReducer;
//# sourceMappingURL=error.js.map