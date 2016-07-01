import axios from 'axios'

export const ADD_BUSINESS = "ADD_BUSINESS";
export const RECEIVE_BUSINESS = "RECEIVE_BUSINESS";
export const RECEIVE_ERROR = "RECEIVE_ERROR";

function addBusiness(business) {
    return {
        type: ADD_BUSINESS,
        business
    };
}

function receiveBusiness(business) {
    return {
        type: RECEIVE_BUSINESS,
        business
    };
}

function receiveError(error) {
    console.log("Generating error action");
    return {
        type: RECEIVE_ERROR,
        error
    };
}

export function saveBusiness(business) {
    return function(dispatch) {
        const newBusiness = {name: business.name, id: 2000};
        dispatch(addBusiness(newBusiness));
        return axios({
            url: "/api/business",
            method: "post",
            responseType: "json",
            data: business
        })
        .then(function(response){
            dispatch(receiveBusiness(response.data));
        })
        .catch(function(error){
            dispatch(receiveError(error));
        });
    };
}
