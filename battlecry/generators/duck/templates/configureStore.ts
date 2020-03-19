import { createStore, applyMiddleware, combineReducers } from 'redux';
import { RootState } from './types'
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore); // apply logger to redux

const reducer = combineReducers({
});

const configureStore = (initialState: RootState) => createStoreWithMiddleware(reducer, initialState);
export default configureStore;
