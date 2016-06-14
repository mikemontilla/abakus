import React from 'react'
import {PropTypes} from 'react'
import MovementsList from '../containers/MovementsList'
import BalanceDisplay from './BalanceDisplay'
import NewMovementForm from '../containers/NewMovementForm'


const AccountsManager = React.createClass({

	PropTypes: {
		movements: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number.isRequired,
			date: PropTypes.instanceOf(Date).isRequired,
			description: PropTypes.string.isRequired,
			amount: PropTypes.number.isRequired,
			type: PropTypes.oneOf(['income','outcome']).isRequired,
			comment: PropTypes.string.isRequired
		})).isRequired
	},

	computeBalance: function(){
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
		const balance = this.computeBalance();
		const movementsFlag = !!this.props.movements.length;
		let message = "";
		if(!movementsFlag)
			message = "There is no movements registered";
		return (
			<div className="accountManager">
				<h1>Morion</h1>
				{!movementsFlag && <h3 id="managerMessage">{message}</h3>}
				{movementsFlag && <MovementsList movements={this.props.movements} />}
				{movementsFlag && <BalanceDisplay incomes={balance.incomes} outcomes={balance.outcomes} />}
				<NewMovementForm  />
			</div>
		);
	}
});

export default AccountsManager
