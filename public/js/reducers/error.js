import {RECEIVE_ERROR} from '../actions'

//Handles the error state
const errorReducer = function(state = null, action){
    switch (action.type) {
        case "RECEIVE_ERROR":
            return action.error;
        default:
            return state;
    }
};

export default errorReducer
