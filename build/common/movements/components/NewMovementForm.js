'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NewMovementForm = _react2.default.createClass({
	displayName: 'NewMovementForm',


	propTypes: { onMovementSubmit: _react.PropTypes.func.isRequired },

	getInitialState: function getInitialState() {
		return {
			description: "",
			type: "income",
			amount: 0,
			comment: ""
		};
	},

	handleSubmit: function handleSubmit(e) {

		e.preventDefault();

		var d = {};
		d.description = this.state.description;
		d.amount = this.state.amount;
		d.comment = this.state.comment;
		d.date = this.formatDate(new Date());
		d.type = this.state.type;

		if (!d.description || !d.amount) return;

		this.props.onMovementSubmit(d);

		var initialData = {
			description: "",
			type: "income",
			amount: 0,
			comment: ""
		};

		this.setState(initialData);
	},

	handleDescriptionChange: function handleDescriptionChange(e) {
		this.setState({ description: e.target.value });
	},

	handleTypeChange: function handleTypeChange(e) {
		this.setState({ type: e.target.value });
	},

	handleAmountChange: function handleAmountChange(e) {
		this.setState({ amount: parseInt(e.target.value) });
	},

	handleCommentChange: function handleCommentChange(e) {
		this.setState({ comment: e.target.value });
	},

	formatDate: function formatDate(rawDate) {
		var day = rawDate.getDate();
		var month = rawDate.getMonth() + 1;
		var year = rawDate.getFullYear();

		return day + "/" + month + "/" + year;
	},

	getValueInputText: function getValueInputText() {
		return this.state.amount ? this.state.amount : "";
	},

	isIncome: function isIncome() {
		return this.state.type === "income";
	},

	isOutcome: function isOutcome() {
		return this.state.type === "outcome";
	},

	render: function render() {
		return _react2.default.createElement(
			'form',
			{ className: 'newMovementForm', onSubmit: this.handleSubmit },
			_react2.default.createElement('input', { type: 'text', placeholder: 'Description', value: this.state.description, onChange: this.handleDescriptionChange, required: true }),
			_react2.default.createElement(
				'label',
				{ htmlFor: 'incomeOpt' },
				'Income'
			),
			_react2.default.createElement('input', { type: 'radio', value: 'income', id: 'incomeOpt', checked: this.isIncome(), onChange: this.handleTypeChange }),
			_react2.default.createElement(
				'label',
				{ htmlFor: 'outcomeOpt' },
				'Outcome'
			),
			_react2.default.createElement('input', { type: 'radio', value: 'outcome', id: 'outcomeOpt', checked: this.isOutcome(), onChange: this.handleTypeChange }),
			_react2.default.createElement('input', { type: 'number', placeholder: 'Amount', value: this.getValueInputText(), onChange: this.handleAmountChange, required: true }),
			_react2.default.createElement('input', { type: 'text', placeholder: 'Comment', value: this.state.comment, onChange: this.handleCommentChange }),
			_react2.default.createElement('input', { type: 'submit', value: 'Add new movement' })
		);
	}
});

exports.default = NewMovementForm;
//# sourceMappingURL=NewMovementForm.js.map