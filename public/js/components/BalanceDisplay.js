import React from 'react'
import {PropTypes} from 'react'

const BalanceDisplay = React.createClass({

	propTypes: {
		incomes: PropTypes.number.isRequired,
		outcomes: PropTypes.number.isRequired
	},

	render: function(){
		const balance =  this.props.incomes - this.props.outcomes;
		const balanceClass = (balance < 0) ? "outcome" : "income";
		return (
			<table className="balanceDisplay">
				<tbody>
					<tr className="tableHeader">
						<th>Incomes</th>
						<th>Outcomes</th>
					</tr>
					<tr>
						<td className="income"><span>{this.props.incomes}</span></td>
						<td className="outcome"><span>{this.props.outcomes}</span></td>
					</tr>
					<tr className="tableHeader">
						<th colSpan="2">Balance</th>
					</tr>
					<tr className={balanceClass}>
						<td colSpan="2"><span>{balance}</span></td>
					</tr>
				</tbody>
			</table>
		);
	}
});

export default BalanceDisplay
