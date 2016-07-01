'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actions = require('../actions');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//Handles the addition and deletion of movements
var businessReducer = function businessReducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case _actions.ADD_BUSINESS:
            return [].concat(_toConsumableArray(state), [action.business]);
        case _actions.RECEIVE_BUSINESS:
            return action.business;
        default:
            return state;
    }
};

exports.default = businessReducer;
//# sourceMappingURL=business.js.map