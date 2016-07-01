'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRedux = require('react-redux');

var _BusinessManager = require('../components/BusinessManager');

var _BusinessManager2 = _interopRequireDefault(_BusinessManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMessage = function getMessage(state) {
    var error = state.error;
    var business = state.business;

    if (error) return state.error.toString();
    if (!business.length) return "Create your first business!!!";
    return "";
};

var mapStateToProps = function mapStateToProps(state) {
    var business = state.business;

    var message = getMessage(state);
    return { message: message, business: business };
};

var BusinessManager = (0, _reactRedux.connect)(mapStateToProps)(_BusinessManager2.default);

exports.default = BusinessManager;
//# sourceMappingURL=BusinessManager.js.map