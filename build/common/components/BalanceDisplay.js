'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BalanceDisplay = _react2.default.createClass({
	displayName: 'BalanceDisplay',


	propTypes: {
		incomes: _react.PropTypes.number.isRequired,
		outcomes: _react.PropTypes.number.isRequired
	},

	render: function render() {
		var balance = this.props.incomes - this.props.outcomes;
		var balanceClass = balance < 0 ? "outcome" : "income";
		return _react2.default.createElement(
			'table',
			{ className: 'balanceDisplay' },
			_react2.default.createElement(
				'tbody',
				null,
				_react2.default.createElement(
					'tr',
					{ className: 'tableHeader' },
					_react2.default.createElement(
						'th',
						null,
						'Incomes'
					),
					_react2.default.createElement(
						'th',
						null,
						'Outcomes'
					)
				),
				_react2.default.createElement(
					'tr',
					null,
					_react2.default.createElement(
						'td',
						{ className: 'income' },
						_react2.default.createElement(
							'span',
							null,
							this.props.incomes
						)
					),
					_react2.default.createElement(
						'td',
						{ className: 'outcome' },
						_react2.default.createElement(
							'span',
							null,
							this.props.outcomes
						)
					)
				),
				_react2.default.createElement(
					'tr',
					{ className: 'tableHeader' },
					_react2.default.createElement(
						'th',
						{ colSpan: '2' },
						'Balance'
					)
				),
				_react2.default.createElement(
					'tr',
					{ className: balanceClass },
					_react2.default.createElement(
						'td',
						{ colSpan: '2' },
						_react2.default.createElement(
							'span',
							null,
							balance
						)
					)
				)
			)
		);
	}
});

exports.default = BalanceDisplay;
//# sourceMappingURL=BalanceDisplay.js.map