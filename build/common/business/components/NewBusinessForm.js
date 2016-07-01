'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NewBusinessForm = _react2.default.createClass({
	displayName: 'NewBusinessForm',


	propTypes: { onBusinessSubmit: _react.PropTypes.func.isRequired },

	getInitialState: function getInitialState() {
		return { businessName: "" };
	},

	handleSubmit: function handleSubmit(e) {

		e.preventDefault();

		var d = {};
		d.name = this.state.businessName;
		d.date = this.formatDate(new Date());

		if (!d.name) return;

		this.props.onBusinessSubmit(d);
		this.setState({ businessName: "" });
	},

	handleBusinessNameChange: function handleBusinessNameChange(e) {
		this.setState({ businessName: e.target.value });
	},

	formatDate: function formatDate(rawDate) {
		var day = rawDate.getDate();
		var month = rawDate.getMonth() + 1;
		var year = rawDate.getFullYear();

		return day + "/" + month + "/" + year;
	},

	render: function render() {
		var businessName = this.state.businessName;

		return _react2.default.createElement(
			'form',
			{ className: 'newBusinessForm', onSubmit: this.handleSubmit },
			_react2.default.createElement('input', { type: 'text', placeholder: 'Business name', value: businessName, onChange: this.handleBusinessNameChange }),
			_react2.default.createElement('input', { type: 'submit', value: 'Add business' })
		);
	}
});

exports.default = NewBusinessForm;
//# sourceMappingURL=NewBusinessForm.js.map