import { combineReducers } from "redux";
import characterReducer from "../../Pages/HomePage/redux/reducers";
import { ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

const client = new ApolloClient({
	uri: 'https://rickandmortyapi.com/graphql',
	cache: new InMemoryCache()
});

const combinedReducers = combineReducers({
  characterReducer: characterReducer,
  // apollo: client.reducer()
})

export default combinedReducers