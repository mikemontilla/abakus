import React from 'react'
import {PropTypes} from 'react'

const NewBusinessForm = React.createClass({

	propTypes: {onBusinessSubmit: PropTypes.func.isRequired},

	getInitialState: function(){
		return {businessName: ""};
	},

	handleSubmit: function(e){

		e.preventDefault();

		const d = {};
		d.name = this.state.businessName;
		d.date = this.formatDate(new Date());

		if(!d.name)
			return;

		this.props.onBusinessSubmit(d);
		this.setState({businessName: ""});
	},

	handleBusinessNameChange: function(e){
		this.setState({businessName: e.target.value});
	},

	formatDate: function(rawDate){
		const day = rawDate.getDate();
		const month = rawDate.getMonth() + 1;
		const year = rawDate.getFullYear();

		return day + "/" + month + "/" + year;
	},

	render: function(){
        const {businessName} = this.state;
		return (
			<form className="newBusinessForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="Business name" value={businessName} onChange={this.handleBusinessNameChange} />
				<input type="submit" value="Add business"/>
			</form>
		);
	}
});

export default NewBusinessForm
