"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RECEIVE_ERROR = exports.RECEIVE_MOVEMENTS = exports.REQUEST_MOVEMENTS = exports.REMOVE_MOVEMENT = exports.ADD_MOVEMENT = undefined;
exports.fetchMovements = fetchMovements;
exports.saveMovement = saveMovement;
exports.deleteMovement = deleteMovement;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ADD_MOVEMENT = exports.ADD_MOVEMENT = "ADD_MOVEMENT";
var REMOVE_MOVEMENT = exports.REMOVE_MOVEMENT = "REMOVE_MOVEMENT";
var REQUEST_MOVEMENTS = exports.REQUEST_MOVEMENTS = "REQUEST_MOVEMENTS";
var RECEIVE_MOVEMENTS = exports.RECEIVE_MOVEMENTS = "RECEIVE_MOVEMENTS";
var RECEIVE_ERROR = exports.RECEIVE_ERROR = "RECEIVE_ERROR";

function addMovement(movement) {
    return {
        type: ADD_MOVEMENT,
        movement: movement
    };
}

function removeMovement(id) {
    return {
        type: REMOVE_MOVEMENT,
        id: id
    };
}

function requestMovements() {
    return { type: REQUEST_MOVEMENTS };
}

function receiveMovements(movements) {
    return {
        type: RECEIVE_MOVEMENTS,
        movements: movements
    };
}

function receiveError(error) {
    return {
        type: RECEIVE_ERROR,
        error: error
    };
}

function fetchMovements() {
    return function (dispatch) {
        dispatch(requestMovements());
        return (0, _axios2.default)({
            url: "/api/movements/",
            method: "get",
            responseType: "json"
        }).then(function (response) {
            dispatch(receiveMovements(response.data));
        }).catch(function (error) {
            dispatch(receiveError(error));
        });
    };
}

function saveMovement(movement) {
    return function (dispatch) {
        dispatch(addMovement(movement));
        return (0, _axios2.default)({
            url: "/api/movements",
            method: "post",
            responseType: "json",
            data: movement
        }).then(function (response) {
            dispatch(receiveMovements(response.data));
        }).catch(function (error) {
            dispatch(receiveError(error));
        });
    };
}

function deleteMovement(id) {
    return function (dispatch) {
        dispatch(removeMovement(id));
        return (0, _axios2.default)({
            url: "/api/movements/remove",
            method: "post",
            responseType: "json",
            data: { id: id }
        }).then(function (response) {
            dispatch(receiveMovements(response.data));
        }).catch(function (error) {
            dispatch(receiveError(error));
        });
    };
}
//# sourceMappingURL=index.js.map