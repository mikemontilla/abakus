import {connect} from 'react-redux'
import {addMovement, removeMovement} from '../actions'
import AccountsManager from '../components/AccountsManager'

const mapStateToProps = function(state) {
    return {movements: state.movements};
};

const mapDispatchToProps = function(dispatch) {
    return {
        handleMovementSubmit: function(movement){
            dispatch(addMovement(movement));
        },
        handleMovementDestroy: function(movementId){
            dispatch(removeMovement(movementId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountsManager);
