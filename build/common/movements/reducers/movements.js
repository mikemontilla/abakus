'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actions = require('../actions');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//Handles the addition and deletion of movements
var movementsReducer = function movementsReducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case _actions.ADD_MOVEMENT:
            return [].concat(_toConsumableArray(state), [action.movement]);
        case _actions.REMOVE_MOVEMENT:
            return state.filter(function (movement) {
                return !(movement.id === action.id);
            });
        case _actions.RECEIVE_MOVEMENTS:
            return action.movements;
        default:
            return state;
    }
};

exports.default = movementsReducer;
//# sourceMappingURL=movements.js.map