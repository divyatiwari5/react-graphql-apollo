import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import Reducers from "../reducers";

const middlewares = [thunk];
const logger = createLogger();
const isDev = process.env.NODE_ENV === 'development';

// if (isDev) {
//   middlewares.push(logger);
// }

// const finalCreateStore = compose(applyMiddleware(...middlewares))(createStore);

// const Store = finalCreateStore(Reducers);

// export type RootState = ReturnType<typeof Store.getState>

// export default Store;