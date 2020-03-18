import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import { RootState } from '../types'

import user from './modules/user'

const middleware = applyMiddleware(thunk)

const reducer = combineReducers({
  user,
});

const configureStore = (initialState: RootState) => createStore(reducer, initialState, middleware)
export default configureStore;
