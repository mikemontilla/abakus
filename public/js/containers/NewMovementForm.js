import {connect} from 'react-redux'
import NewMovementFormComponent from '../components/NewMovementForm'
import {addMovement} from '../actions'

const mapDispatchToProps = function(dispatch){
    return {
        onMovementSubmit: function(movement){
            dispatch(addMovement(movement));
        }
    };
};

const NewMovementForm = connect(null, mapDispatchToProps)(NewMovementFormComponent);

export default NewMovementForm
