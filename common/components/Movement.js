import React from 'react'
import classNames from 'classnames'
import {PropTypes} from 'react'

const Movement = React.createClass({

	propTypes: {
		onDestroyClick: PropTypes.func.isRequired,
		movement: PropTypes.object.isRequired
	},

	handleDestroyClick: function(e){
		e.preventDefault();
		this.props.onDestroyClick(this.props.movement.id);
	},

	render: function(){
		const movementClass = classNames("movement", this.props.movement.type);
		return (
			<tr className={movementClass}>
				<td>{this.props.movement.date}</td>
				<td>{this.props.movement.description}</td>
				<td>{this.props.movement.type}</td>
				<td><span>{this.props.movement.amount}</span></td>
				<td>{this.props.movement.comment}</td>
				<td className="destroy" onClick={this.handleDestroyClick}><a href="#"></a></td>
			</tr>
		);
	}
});

export default Movement
