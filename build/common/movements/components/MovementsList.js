'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Movement = require('./Movement');

var _Movement2 = _interopRequireDefault(_Movement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MovementsList = _react2.default.createClass({
	displayName: 'MovementsList',


	PropTypes: {
		movements: _react.PropTypes.arrayOf(_react.PropTypes.object).isRequired,
		onMovementDestroy: _react.PropTypes.func.isRequired
	},

	render: function render() {
		var movements = this.props.movements;
		var movementsNodes = movements.map(function (movement) {
			return _react2.default.createElement(_Movement2.default, {
				movement: movement,
				key: movement.id,
				onDestroyClick: this.props.onMovementDestroy });
		}.bind(this));

		return _react2.default.createElement(
			'table',
			{ className: 'movementsList' },
			_react2.default.createElement(
				'tbody',
				null,
				_react2.default.createElement(
					'tr',
					{ className: 'tableHeader' },
					_react2.default.createElement(
						'th',
						null,
						'Date'
					),
					_react2.default.createElement(
						'th',
						null,
						'Description'
					),
					_react2.default.createElement(
						'th',
						null,
						'Type'
					),
					_react2.default.createElement(
						'th',
						null,
						'Value'
					),
					_react2.default.createElement(
						'th',
						null,
						'Comment'
					)
				),
				movementsNodes
			)
		);
	}
});

exports.default = MovementsList;
//# sourceMappingURL=MovementsList.js.map