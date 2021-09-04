import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './Styles/styles.scss';

import './style.scss';

const cache = new InMemoryCache();

const client = new ApolloClient({
	uri: 'https://rickandmortyapi.com/graphql',
	cache
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);