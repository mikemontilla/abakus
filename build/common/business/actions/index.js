"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RECEIVE_ERROR = exports.RECEIVE_BUSINESS = exports.ADD_BUSINESS = undefined;
exports.saveBusiness = saveBusiness;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ADD_BUSINESS = exports.ADD_BUSINESS = "ADD_BUSINESS";
var RECEIVE_BUSINESS = exports.RECEIVE_BUSINESS = "RECEIVE_BUSINESS";
var RECEIVE_ERROR = exports.RECEIVE_ERROR = "RECEIVE_ERROR";

function addBusiness(business) {
    return {
        type: ADD_BUSINESS,
        business: business
    };
}

function receiveBusiness(business) {
    return {
        type: RECEIVE_BUSINESS,
        business: business
    };
}

function receiveError(error) {
    console.log("Generating error action");
    return {
        type: RECEIVE_ERROR,
        error: error
    };
}

function saveBusiness(business) {
    return function (dispatch) {
        var newBusiness = { name: business.name, id: 2000 };
        dispatch(addBusiness(newBusiness));
        return (0, _axios2.default)({
            url: "/api/business",
            method: "post",
            responseType: "json",
            data: business
        }).then(function (response) {
            dispatch(receiveBusiness(response.data));
        }).catch(function (error) {
            dispatch(receiveError(error));
        });
    };
}
//# sourceMappingURL=index.js.map