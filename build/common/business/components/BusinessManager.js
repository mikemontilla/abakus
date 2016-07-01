'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BusinessList = require('./BusinessList');

var _BusinessList2 = _interopRequireDefault(_BusinessList);

var _NewBusinessForm = require('../containers/NewBusinessForm');

var _NewBusinessForm2 = _interopRequireDefault(_NewBusinessForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BusinessManager = _react2.default.createClass({
    displayName: 'BusinessManager',


    propTypes: {
        message: _react.PropTypes.string.isRequired,
        business: _react.PropTypes.arrayOf(_react.PropTypes.object.isRequired).isRequired
    },

    render: function render() {
        var _props = this.props;
        var message = _props.message;
        var business = _props.business;

        var messageFlag = !(message === "");
        var businessFlag = !!business.length;

        return _react2.default.createElement(
            'div',
            { id: 'BusinessManager' },
            _react2.default.createElement(
                'h1',
                null,
                'Business'
            ),
            messageFlag && _react2.default.createElement(
                'h3',
                { className: 'message' },
                message
            ),
            businessFlag && _react2.default.createElement(_BusinessList2.default, { business: business }),
            _react2.default.createElement(_NewBusinessForm2.default, null)
        );
    }
});

exports.default = BusinessManager;
//# sourceMappingURL=BusinessManager.js.map