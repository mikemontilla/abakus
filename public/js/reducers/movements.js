//Handles the addition and deletion of movements
const movementsReducer = function(state = [], action) {
    let modifiedMovements;
    switch(action.type){
        case "ADD_MOVEMENT":
            modifiedMovements = state.slice();
            modifiedMovements.push(action.movement);
            return modifiedMovements;
        case "REMOVE_MOVEMENT":
            modifiedMovements = state.filter(function(movement){
                return !(movement.id === action.id);
            });
            return modifiedMovements;
        default:
            return state;
    }
};

export default movementsReducer
