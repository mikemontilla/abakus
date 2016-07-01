import {combineReducers} from 'redux'
import businessReducer from './business'
import errorReducer from './error'

const mainReducer = combineReducers({
    error: errorReducer,
    business: businessReducer
});

export default mainReducer
