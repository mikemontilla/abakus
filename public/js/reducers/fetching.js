import {REQUEST_MOVEMENTS, RECEIVE_MOVEMENTS} from '../actions'

//Handle fetching state
const fetchingReducer = function(state = false, action){
    switch (action.type) {
        case 'REQUEST_MOVEMENTS':
            return true;
        case 'RECEIVE_MOVEMENTS':
            return false;
        default:
            return state;
    }
};

export default fetchingReducer
