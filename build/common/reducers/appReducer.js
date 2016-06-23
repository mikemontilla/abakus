'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _movements = require('./movements');

var _movements2 = _interopRequireDefault(_movements);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var _fetching = require('./fetching');

var _fetching2 = _interopRequireDefault(_fetching);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appReducer = (0, _redux.combineReducers)({
    error: _error2.default,
    fetching: _fetching2.default,
    movements: _movements2.default
});

exports.default = appReducer;
//# sourceMappingURL=appReducer.js.map