import React from 'react'
import {PropTypes} from 'react'
import BusinessList from './BusinessList'
import NewBusinessForm from '../containers/NewBusinessForm'

const BusinessManager = React.createClass({

    propTypes: {
        message: PropTypes.string.isRequired,
        business: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
    },

    render: function(){
        const {message, business} = this.props;
		const messageFlag = !(message === "");
		const businessFlag = !!business.length;

        return (
            <div id="BusinessManager">
                <h1>Business</h1>
                {messageFlag && <h3 className="message">{message}</h3>}
                {businessFlag && <BusinessList business={business} />}
                <NewBusinessForm />
            </div>
        );
    }
});

export default BusinessManager
