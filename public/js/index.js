import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from './common/store'
import AccountsManager from './common/containers/AccountsManager'

const initialState = window.__INITIAL_STATE_;
const store = configureStore(initialState);
const rootElement = document.getElementById('root');

render(
	<Provider store={store}>
		<AccountsManager />
	</Provider>,
	rootElement
);
