import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import mainReducer from '../reducers'

const configureStore = function(initialState) {
    const store = createStore(
        mainReducer,
        initialState,
        applyMiddleware(thunkMiddleware, createLogger())
    );
    return store;
};

export default configureStore
