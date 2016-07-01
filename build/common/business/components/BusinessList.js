'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BusinessList = _react2.default.createClass({
    displayName: 'BusinessList',


    propTypes: {
        business: _react.PropTypes.arrayOf(_react.PropTypes.shape({
            id: _react.PropTypes.number.isRequired,
            name: _react.PropTypes.string.isRequired
        })).isRequired
    },

    render: function render() {

        var business = this.props.business;
        var businessNodes = business.map(function (business) {
            return _react2.default.createElement(
                'li',
                { key: business.id },
                _react2.default.createElement(
                    'a',
                    { href: "/movements/" + business.id },
                    business.name
                )
            );
        });
        return _react2.default.createElement(
            'ul',
            null,
            businessNodes
        );
    }
});

exports.default = BusinessList;
//# sourceMappingURL=BusinessList.js.map