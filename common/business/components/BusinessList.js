import React from 'react'
import {PropTypes} from 'react'

const BusinessList = React.createClass({

    propTypes: {
        business: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        })).isRequired
    },

    render: function(){

        const business = this.props.business;
        const businessNodes = business.map(function(business){
            return (
                <li key={business.id}>
                    <a href={"/movements/" + business.id}>{business.name}</a>
                </li>
            );
        });
        return (
            <ul>{businessNodes}</ul>
        );
    }
});

export default BusinessList
