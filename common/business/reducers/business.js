import {ADD_BUSINESS, RECEIVE_BUSINESS} from '../actions'

//Handles the addition and deletion of movements
const businessReducer = function(state = [], action) {
    switch(action.type){
        case ADD_BUSINESS:
            return [...state, action.business];
        case RECEIVE_BUSINESS:
            return action.business;
        default:
            return state;
    }
};

export default businessReducer
