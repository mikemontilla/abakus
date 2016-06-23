import React from 'react'
import {PropTypes} from 'react'
import MovementsList from '../containers/MovementsList'
import BalanceDisplay from './BalanceDisplay'
import NewMovementForm from '../containers/NewMovementForm'


const AccountsManager = React.createClass({

	PropTypes: {
		message: PropTypes.string.isRequired,
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
		const {message, movements} = this.props;
		const balance = this.computeBalance();
		const messageFlag = !(message === "");
		const movementsFlag = !!movements.length;

		return (
			<div className="accountManager">
				<h1>Morion</h1>
				{messageFlag && <h3 id="managerMessage">{message}</h3>}
				{movementsFlag && <MovementsList movements={movements} />}
				{movementsFlag && <BalanceDisplay incomes={balance.incomes} outcomes={balance.outcomes} />}
				<NewMovementForm  />
			</div>
		);
	}
});

export default AccountsManager
