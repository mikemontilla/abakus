'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actions = require('../actions');

//Handle fetching state
var fetchingReducer = function fetchingReducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case 'REQUEST_MOVEMENTS':
            return true;
        case 'RECEIVE_MOVEMENTS':
            return false;
        default:
            return state;
    }
};

exports.default = fetchingReducer;
//# sourceMappingURL=fetching.js.map