import axios from 'axios'

export const ADD_MOVEMENT = "ADD_MOVEMENT";
export const REMOVE_MOVEMENT = "REMOVE_MOVEMENT";
export const REQUEST_MOVEMENTS = "REQUEST_MOVEMENTS";
export const RECEIVE_MOVEMENTS = "RECEIVE_MOVEMENTS";
export const RECEIVE_ERROR = "RECEIVE_ERROR";

function addMovement(movement) {
    return {
        type: ADD_MOVEMENT,
        movement
    };
}

function removeMovement(id) {
    return {
        type: REMOVE_MOVEMENT,
        id
    };
}

function requestMovements() {
    return {type: REQUEST_MOVEMENTS};
}

function receiveMovements(movements) {
    return {
        type: RECEIVE_MOVEMENTS,
        movements
    };
}

function receiveError(error) {
    return{
        type: RECEIVE_ERROR,
        error
    };
}

export function fetchMovements() {
    return function(dispatch) {
        dispatch(requestMovements());
        return axios({
            url: "/api/movements/",
            method: "get",
            responseType: "json"
        })
        .then(function(response){
            dispatch(receiveMovements(response.data));
        })
        .catch(function(response){
            dispatch(receiveError(response.data));
        });
    };
}

export function saveMovement(movement) {
    return function(dispatch) {
        dispatch(addMovement(movement));
        return axios({
            url: "/api/movements",
            method: "post",
            responseType: "json",
            data: movement
        })
        .then(function(response){
            dispatch(receiveMovements(response.data));
        })
        .catch(function(response){
            dispatch(receiveError(response.data));
        });
    };
}

export function deleteMovement(id) {
    return function(dispatch) {
        dispatch(removeMovement(id));
        return axios({
            url: "/api/movements/remove",
            method: "post",
            responseType: "json",
            data: {id}
        })
        .then(function(response){
            dispatch(receiveMovements(response.data));
        })
        .catch(function(response){
            dispatch(receiveError(response.data));
        });
    }
}
