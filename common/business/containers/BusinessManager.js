import {connect} from 'react-redux'
import BusinessManagerComponent from '../components/BusinessManager'

const getMessage = function(state) {
    const {error, business} = state;
    if(error)
        return state.error.toString();
    if(!business.length)
        return "Create your first business!!!";
    return "";
};

const mapStateToProps = function(state) {
    const {business} = state;
    const message = getMessage(state);
    return {message, business};
};

const BusinessManager = connect(mapStateToProps)(BusinessManagerComponent);

export default BusinessManager
