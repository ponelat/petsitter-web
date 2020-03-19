import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import { RootState } from './types'

import user from './duck-user'
import jobs from './duck-jobs'
import error from './duck-error'

const middleware = applyMiddleware(thunk)

const reducer = combineReducers({
  error,
  jobs,
  user,
});

const configureStore = (initialState: RootState) => createStore(reducer, initialState, middleware)
export default configureStore;
