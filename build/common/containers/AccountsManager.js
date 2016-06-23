'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRedux = require('react-redux');

var _AccountsManager = require('../components/AccountsManager');

var _AccountsManager2 = _interopRequireDefault(_AccountsManager);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMessage = function getMessage(state) {
    var fetching = state.fetching;
    var error = state.error;
    var movements = state.movements;

    if (fetching) return "Loading movements...";
    if (error) return state.error.toString();
    if (!movements.length) return "There is no movements registered";
    return "";
};

var mapStateToProps = function mapStateToProps(state) {
    var movements = state.movements;

    var message = getMessage(state);
    return { message: message, movements: movements };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return { initialize: function initialize() {
            dispatch((0, _actions.fetchMovements)());
        } };
};

var AccountsManager = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_AccountsManager2.default);

exports.default = AccountsManager;
//# sourceMappingURL=AccountsManager.js.map