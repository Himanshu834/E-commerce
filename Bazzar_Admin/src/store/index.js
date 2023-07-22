import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';
import rootreducer from '../reducers/index'
const store = createStore(rootreducer,composeWithDevTools(
    applyMiddleware(thunk)
));
export default store;