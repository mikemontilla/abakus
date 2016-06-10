import React from 'react'
import $ from 'jquery'
import MovementsList from './MovementsList'
import BalanceDisplay from './BalanceDisplay'
import NewMovementForm from './NewMovementForm'


const AccountsManager = React.createClass({

	url: "/api/movements/",
	removeUrl: "/api/movements/remove",

	getInitialState: function(){
		return {
			movements: []
		};
	},

	loadMovementsFromServer: function(){
		$.ajax({
			url: this.url,
			dataType: "json",
			cache: false,
			success: function(data){
				this.setState({
					movements: data
				});
			}.bind(this),
			error: function(xhr, status, error){
				console.error(this.url, status, error.toString());
			}.bind(this)
		});
	},

	handleMovementSubmit: function(movement){

		const movements = this.state.movements;
		movement.id = movements.length + 1;
		const newMovements = movements.concat([movement]);
		this.setState({
			movements: newMovements}
		);

		$.ajax({
			url: this.url,
			dataType: "json",
			type: "POST",
			data: movement,
			success: function(data){
				this.setState({movements: data});
			}.bind(this),
			error: function(xhr, status, error){
				this.setState({movements: movements});
				console.error(this.url, status, error.toString());
			}.bind(this)
		});
	},

	handleMovementDestroy: function(movementId){
		const movements = this.state.movements;
		const newMovements = this.state.movements.slice();
		newMovements.splice(movementId - 1, 1);
		this.setState({movements: newMovements});

		$.ajax({
			url: this.removeUrl,
			dataType: "json",
			type: "POST",
			data: {id:movementId},
			success: function(data){
				this.setState({movements:data});
			}.bind(this),
			error: function(xhr, status, error){
				this.setState({movements:movements});
				console.error(this.removeUrl, status, error.toString());
			}.bind(this)
		});
	},

	getBalance: function(){
		const balance = {};
		balance.incomes = 0;
		balance.outcomes = 0;
		this.state.movements.forEach(function(movement){
			if(movement.type === "income")
				balance.incomes += movement.amount;
			else if(movement.type === "outcome")
				balance.outcomes += movement.amount;
		});
		return balance;
	},

	componentDidMount: function(){
		this.loadMovementsFromServer();
	},

	render: function(){
		const balance = this.getBalance();
		const movementsFlag = !!this.state.movements.length;
		let message = "";
		if(!movementsFlag)
			message = "There is not movements registered";
		return (
			<div className="accountManager">
				<h1>Morion</h1>
				{!movementsFlag && <h3 id="managerMessage">{message}</h3>}
				{movementsFlag && <MovementsList onMovementDestroy={this.handleMovementDestroy} movements={this.state.movements} />}
				{movementsFlag && <BalanceDisplay incomes={balance.incomes} outcomes={balance.outcomes} />}
				<NewMovementForm onMovementSubmit={this.handleMovementSubmit} />
			</div>
		);
	}
});

export default AccountsManager
