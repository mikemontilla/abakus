import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import appReducer from '../reducers/appReducer'

const configureStore = function(initialState) {
    const store = createStore(
        appReducer,
        initialState,
        applyMiddleware(thunkMiddleware, createLogger())
    );
    return store;
};

export default configureStore
