import {ADD_MOVEMENT, REMOVE_MOVEMENT, RECEIVE_MOVEMENTS} from '../actions'

//Handles the addition and deletion of movements
const movementsReducer = function(state = [], action) {
    switch(action.type){
        case ADD_MOVEMENT:
            return [...state, action.movement];
        case REMOVE_MOVEMENT:
            return state.filter(function(movement){
                return !(movement.id === action.id);
            });
        case RECEIVE_MOVEMENTS:
            return action.movements;
        default:
            return state;
    }
};

export default movementsReducer
