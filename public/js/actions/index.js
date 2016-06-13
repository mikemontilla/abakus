let newMovementId = 1;

export function addMovement(movement) {
    movement.id = newMovementId++;
    return {
        type: "ADD_MOVEMENT",
        movement
    };
}

export function removeMovement(id) {
    newMovementId--;
    return {
        type: "REMOVE_MOVEMENT",
        id
    };
}
