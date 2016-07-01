import {connect} from 'react-redux'
import NewBusinessFormComponent from '../components/NewBusinessForm'
import {saveBusiness} from '../actions'

const mapDispatchToProps = function(dispatch){
    return {
        onBusinessSubmit: function(business){
            dispatch(saveBusiness(business));
        }
    };
};

const NewBusinessForm = connect(null, mapDispatchToProps)(NewBusinessFormComponent);

export default NewBusinessForm
