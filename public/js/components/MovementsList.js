import React from 'react'
import Movement from './Movement'
import {PropTypes} from 'react'

const MovementsList = React.createClass({

	PropTypes: {
		movements: PropTypes.arrayOf(PropTypes.object).isRequired,
		onMovementDestroy: PropTypes.func.isRequired
	},

	render: function(){
		const movements = this.props.movements;
		const movementsNodes = movements.map(function(movement){
			return (
				<Movement
					movement={movement}
					key={movement.id}
					onDestroyClick={this.props.onMovementDestroy}/>
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
