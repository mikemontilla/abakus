import React from 'react'
import {PropTypes} from 'react'

const NewMovementForm = React.createClass({

	propTypes: {onMovementSubmit: PropTypes.func.isRequired},

	getInitialState: function(){
		return {
			description: "",
			type: "income",
			amount: 0,
			comment: ""
		};
	},

	handleSubmit: function(e){

		e.preventDefault();

		const d = {};
		d.description = this.state.description;
		d.amount = this.state.amount;
		d.comment =  this.state.comment;
		d.date = this.formatDate(new Date());
		d.type = this.state.type;

		if(!d.description || !d.amount || !d.comment)
			return;

		this.props.onMovementSubmit(d);

		const initialData = {
			description: "",
			type: "income",
			amount: 0,
			comment: ""
		};

		this.setState(initialData);
	},

	handleDescriptionChange: function(e){
		this.setState({description: e.target.value});
	},

	handleTypeChange: function(e){
		this.setState({type: e.target.value});
	},

	handleAmountChange: function(e){
		this.setState({amount: parseInt(e.target.value)});
	},

	handleCommentChange: function(e){
		this.setState({comment: e.target.value});
	},

	formatDate: function(rawDate){
		const day = rawDate.getDate();
		const month = rawDate.getMonth() + 1;
		const year = rawDate.getFullYear();

		return day + "/" + month + "/" + year;
	},

	getValueInputText: function(){
		return (this.state.amount ? this.state.amount : "");
	},

	isIncome: function(){
		return this.state.type === "income";
	},

	isOutcome: function(){
		return this.state.type === "outcome";
	},

	render: function(){
		return (
			<form className="newMovementForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="Description" value={this.state.description} onChange={this.handleDescriptionChange} />
				<label for="incomeOpt">Income</label>
				<input type="radio" value="income" id="incomeOpt" checked={this.isIncome()} onChange={this.handleTypeChange} />
				<label for="outcomeOpt">Outcome</label>
				<input type="radio" value="outcome" id="outcomeOpt" checked={this.isOutcome()} onChange={this.handleTypeChange} />
				<input type="number" placeholder="Amount" value={this.getValueInputText()} onChange={this.handleAmountChange} />
				<input type="text" placeholder="Comment" value={this.state.comment} onChange={this.handleCommentChange} />
				<input type="submit" value="Add new movement"/>
			</form>
		);
	}
});

export default NewMovementForm
