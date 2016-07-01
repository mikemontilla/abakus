'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _business = require('./business');

var _business2 = _interopRequireDefault(_business);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mainReducer = (0, _redux.combineReducers)({
    error: _error2.default,
    business: _business2.default
});

exports.default = mainReducer;
//# sourceMappingURL=index.js.map