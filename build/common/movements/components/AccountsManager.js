'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MovementsList = require('../containers/MovementsList');

var _MovementsList2 = _interopRequireDefault(_MovementsList);

var _BalanceDisplay = require('./BalanceDisplay');

var _BalanceDisplay2 = _interopRequireDefault(_BalanceDisplay);

var _NewMovementForm = require('../containers/NewMovementForm');

var _NewMovementForm2 = _interopRequireDefault(_NewMovementForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AccountsManager = _react2.default.createClass({
	displayName: 'AccountsManager',


	PropTypes: {
		businessName: _react.PropTypes.string.isRequired,
		message: _react.PropTypes.string.isRequired,
		movements: _react.PropTypes.arrayOf(_react.PropTypes.shape({
			id: _react.PropTypes.number.isRequired,
			date: _react.PropTypes.instanceOf(Date).isRequired,
			description: _react.PropTypes.string.isRequired,
			amount: _react.PropTypes.number.isRequired,
			type: _react.PropTypes.oneOf(['income', 'outcome']).isRequired,
			comment: _react.PropTypes.string.isRequired
		})).isRequired
	},

	computeBalance: function computeBalance() {
		var balance = {};
		balance.incomes = 0;
		balance.outcomes = 0;
		this.props.movements.forEach(function (movement) {
			if (movement.type === "income") balance.incomes += movement.amount;else if (movement.type === "outcome") balance.outcomes += movement.amount;
		});
		return balance;
	},

	render: function render() {
		var _props = this.props;
		var message = _props.message;
		var movements = _props.movements;
		var businessName = _props.businessName;

		var balance = this.computeBalance();
		var messageFlag = !(message === "");
		var movementsFlag = !!movements.length;

		return _react2.default.createElement(
			'div',
			{ className: 'accountManager' },
			_react2.default.createElement(
				'h1',
				null,
				businessName
			),
			messageFlag && _react2.default.createElement(
				'h3',
				{ id: 'managerMessage' },
				message
			),
			movementsFlag && _react2.default.createElement(_MovementsList2.default, { movements: movements }),
			movementsFlag && _react2.default.createElement(_BalanceDisplay2.default, { incomes: balance.incomes, outcomes: balance.outcomes }),
			_react2.default.createElement(_NewMovementForm2.default, null)
		);
	}
});

exports.default = AccountsManager;
//# sourceMappingURL=AccountsManager.js.map