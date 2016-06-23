'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Movement = _react2.default.createClass({
	displayName: 'Movement',


	propTypes: {
		onDestroyClick: _react.PropTypes.func.isRequired,
		movement: _react.PropTypes.object.isRequired
	},

	handleDestroyClick: function handleDestroyClick(e) {
		e.preventDefault();
		this.props.onDestroyClick(this.props.movement.id);
	},

	render: function render() {
		var movementClass = (0, _classnames2.default)("movement", this.props.movement.type);
		return _react2.default.createElement(
			'tr',
			{ className: movementClass },
			_react2.default.createElement(
				'td',
				null,
				this.props.movement.date
			),
			_react2.default.createElement(
				'td',
				null,
				this.props.movement.description
			),
			_react2.default.createElement(
				'td',
				null,
				this.props.movement.type
			),
			_react2.default.createElement(
				'td',
				null,
				_react2.default.createElement(
					'span',
					null,
					this.props.movement.amount
				)
			),
			_react2.default.createElement(
				'td',
				null,
				this.props.movement.comment
			),
			_react2.default.createElement(
				'td',
				{ className: 'destroy', onClick: this.handleDestroyClick },
				_react2.default.createElement('a', { href: '#' })
			)
		);
	}
});

exports.default = Movement;
//# sourceMappingURL=Movement.js.map