import { combineReducers } from "redux";
import characterReducer from "../../Pages/HomePage/redux/reducers";

const reducers = [
    characterReducer
]
const combinedReducers = {}

// const combinedReducers = wrappedReducers.reduce(
//     (obj, reducer) => {
//       return Object.assign({}, obj, reducer);
//     },
// );

  export default combinedReducers