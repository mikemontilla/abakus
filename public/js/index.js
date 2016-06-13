import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import appReducer from './reducers/appReducer'
import AccountsManager from './containers/AccountsManager'

const store = createStore(appReducer);

render(
	<Provider store={store}>
		<AccountsManager />
	</Provider>,
	document.getElementById('root')
);
