import React from 'react'
import classNames from 'classnames'

const Movement = React.createClass({

	handleDestroyClick: function(){
		this.props.onDestroy(this.props.movement.id);
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
				<div className="destroy" onClick={this.handleDestroyClick}></div>
			</tr>
		);
	}
});

export default Movement
