import {connect} from 'react-redux'
import {deleteMovement} from '../actions'
import MovementsListComponent from '../components/MovementsList'

const mapDispatchToProps = function(dispatch){
    return {
        onMovementDestroy: function(id){
            dispatch(deleteMovement(id));
        }
    };
};

const MovementsList = connect(null, mapDispatchToProps)(MovementsListComponent);

export default MovementsList
