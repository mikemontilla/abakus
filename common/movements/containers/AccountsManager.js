import {connect} from 'react-redux'
import AccountsManagerComponent from '../components/AccountsManager'

const getMessage = function(state) {
    const {fetching, error, movements} = state;
    if(fetching)
        return "Loading movements...";
    if(error)
        return state.error.toString();
    if(!movements.length)
        return "There is no movements registered";
    return "";
};

const mapStateToProps = function(state) {
    const {movements} = state;
    const message = getMessage(state);
    return {message, movements};
};

const AccountsManager = connect(mapStateToProps)(AccountsManagerComponent);

export default AccountsManager