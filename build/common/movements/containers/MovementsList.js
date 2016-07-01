'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var _MovementsList = require('../components/MovementsList');

var _MovementsList2 = _interopRequireDefault(_MovementsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onMovementDestroy: function onMovementDestroy(id) {
            dispatch((0, _actions.deleteMovement)(id));
        }
    };
};

var MovementsList = (0, _reactRedux.connect)(null, mapDispatchToProps)(_MovementsList2.default);

exports.default = MovementsList;
//# sourceMappingURL=MovementsList.js.map