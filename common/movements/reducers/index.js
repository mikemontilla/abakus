import {combineReducers} from 'redux'
import movementsReducer from './movements'
import errorReducer from './error'
import fetchingReducer from './fetching'

const mainReducer = combineReducers({
    error: errorReducer,
    fetching: fetchingReducer,
    movements: movementsReducer
});

export default mainReducer
