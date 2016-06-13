import React from 'react'
import Movement from './Movement'
import {PropTypes} from 'react'

const MovementsList = React.createClass({

	propTypes: {
		onMovementDestroy: PropTypes.func.isRequired,
		movements: PropTypes.arrayOf(PropTypes.object).isRequired
	},

	handleDestroy: function(movementId) {
		this.props.onMovementDestroy(movementId);
	},

	render: function(){
		const movements = this.props.movements;
		const movementsNodes = movements.map(function(movement){
			return (
				<Movement
					movement={movement}
					key={movement.id}
					onDestroy={this.handleDestroy}/>
			);
		}.bind(this));

		return (
			<table className="movementsList">
				<tbody>
					<tr className="tableHeader">
						<th>Date</th>
						<th>Description</th>
						<th>Type</th>
						<th>Value</th>
						<th>Comment</th>
					</tr>
					{movementsNodes}
				</tbody>
			</table>
		);
	}
});

export default MovementsList
