import {connect} from 'react-redux'
import AccountsManagerComponent from '../components/AccountsManager'

const mapStateToProps = function(state) {
    return {movements: state.movements};
};

const AccountsManager = connect(mapStateToProps)(AccountsManagerComponent);

export default AccountsManager
