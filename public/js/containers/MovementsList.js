import {connect} from 'react-redux'
import {removeMovement} from '../actions'
import MovementsListComponent from '../components/MovementsList'

const mapDispatchToProps = function(dispatch){
    return {
        onMovementDestroy: function(id){
            dispatch(removeMovement(id));
        }
    };
};

const MovementsList = connect(null, mapDispatchToProps)(MovementsListComponent);

export default MovementsList
