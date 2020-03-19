import { Dispatcher, Message } from './types'
// Actions

// Reducer
export default function reducer(state = {}, action: Message<any> = {}) {
  switch (action.type) {
    default: return state;
  }
}

// Action Creators
