'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRedux = require('react-redux');

var _NewMovementForm = require('../components/NewMovementForm');

var _NewMovementForm2 = _interopRequireDefault(_NewMovementForm);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onMovementSubmit: function onMovementSubmit(movement) {
            dispatch((0, _actions.saveMovement)(movement));
        }
    };
};

var NewMovementForm = (0, _reactRedux.connect)(null, mapDispatchToProps)(_NewMovementForm2.default);

exports.default = NewMovementForm;
//# sourceMappingURL=NewMovementForm.js.map