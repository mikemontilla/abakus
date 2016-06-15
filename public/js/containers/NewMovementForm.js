import {connect} from 'react-redux'
import NewMovementFormComponent from '../components/NewMovementForm'
import {saveMovement} from '../actions'

const mapDispatchToProps = function(dispatch){
    return {
        onMovementSubmit: function(movement){
            dispatch(saveMovement(movement));
        }
    };
};

const NewMovementForm = connect(null, mapDispatchToProps)(NewMovementFormComponent);

export default NewMovementForm
