import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import { BrowserRouter as Router } from 'react-router-dom';
import './_index.scss';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	reducers,
	composeEnhancers(applyMiddleware(reduxThunk))
);

const stripePromise = loadStripe(
	'pk_test_51HXk0yHVfAceukGqNABvLb6jfVpzFHZJeTSJWh2PzxdS5o5MzTXSpwYu1XecyKKNcdPFRCkJOQIFzPTFHTPiISHR00KWRjtxl2'
);

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<React.StrictMode>
				<Elements stripe={stripePromise}>
					<App />
				</Elements>
			</React.StrictMode>
		</Provider>
	</Router>,
	document.getElementById('root')
);
