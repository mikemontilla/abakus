import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from './common/movements/store'
import AccountsManager from './common/movements/containers/AccountsManager'

const initialState = window.__INITIAL_STATE_;
const businessName = window.__BUSINESS_NAME_;
const store = configureStore(initialState);
const rootElement = document.getElementById('root');

render(
	<Provider store={store}>
		<AccountsManager businessName={businessName}/>
	</Provider>,
	rootElement
);
