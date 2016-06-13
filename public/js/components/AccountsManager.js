import React from 'react'
import {PropTypes} from 'react'
import MovementsList from './MovementsList'
import BalanceDisplay from './BalanceDisplay'
import NewMovementForm from './NewMovementForm'


const AccountsManager = React.createClass({

	PropTypes: {
		handleMovementSubmit: PropTypes.func.isRequired,
		handleMovementDestroy: PropTypes.func.isRequired,
		movements: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number.isRequired,
			date: PropTypes.instanceOf(Date).isRequired,
			description: PropTypes.string.isRequired,
			value: PropTypes.number.isRequired,
			type: PropTypes.oneOf(['income','outcome']).isRequired,
			comment: PropTypes.string.isRequired
		})).isRequired
	},

	getBalance: function(){
		const balance = {};
		balance.incomes = 0;
		balance.outcomes = 0;
		this.props.movements.forEach(function(movement){
			if(movement.type === "income")
				balance.incomes += movement.amount;
			else if(movement.type === "outcome")
				balance.outcomes += movement.amount;
		});
		return balance;
	},

	render: function(){
		const balance = this.getBalance();
		const movementsFlag = !!this.props.movements.length;
		let message = "";
		if(!movementsFlag)
			message = "There is no movements registered";
		return (
			<div className="accountManager">
				<h1>Morion</h1>
				{!movementsFlag && <h3 id="managerMessage">{message}</h3>}
				{movementsFlag && <MovementsList onMovementDestroy={this.props.handleMovementDestroy} movements={this.props.movements} />}
				{movementsFlag && <BalanceDisplay incomes={balance.incomes} outcomes={balance.outcomes} />}
				<NewMovementForm onMovementSubmit={this.props.handleMovementSubmit} />
			</div>
		);
	}
});

export default AccountsManager
