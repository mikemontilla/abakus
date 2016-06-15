import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import appReducer from './reducers/appReducer'
import AccountsManager from './containers/AccountsManager'

const store = createStore(
	appReducer,
	applyMiddleware(thunkMiddleware, createLogger())
);

render(
	<Provider store={store}>
		<AccountsManager />
	</Provider>,
	document.getElementById('root')
);
