'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRedux = require('react-redux');

var _NewBusinessForm = require('../components/NewBusinessForm');

var _NewBusinessForm2 = _interopRequireDefault(_NewBusinessForm);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onBusinessSubmit: function onBusinessSubmit(business) {
            dispatch((0, _actions.saveBusiness)(business));
        }
    };
};

var NewBusinessForm = (0, _reactRedux.connect)(null, mapDispatchToProps)(_NewBusinessForm2.default);

exports.default = NewBusinessForm;
//# sourceMappingURL=NewBusinessForm.js.map