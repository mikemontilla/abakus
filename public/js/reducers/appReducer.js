import {combineReducers} from 'redux';
import movementsReducer from './movements'

const appReducer = combineReducers({
    movements: movementsReducer
});

export default appReducer
