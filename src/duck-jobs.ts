import { Dispatcher, Message } from './types'

// Actions
const SET_CURRENT = 'jobs/SET-CURRENT';
const SET_PAGE = 'jobs/SET-PAGE';

// Reducer
export default function reducer(state = {}, action: Message<any> = {}) {
  switch (action.type) {
    case SET_CURRENT:
      // Perform action
      return state;
    case SET_PAGE:
      // Perform action
      return state;
    default: return state;
  }
}

// Action Creators
export function findAll()  : Dispatcher {
  return (dispatch) => {

  }
}

export function applyTo()  : Dispatcher {
  return (dispatch) => {

  }
}

export function findById()  : Dispatcher {
  return (dispatch) => {

  }
}

export function setCurrent() : Message<any> {
  return { type: SET_CURRENT };
}

export function setPage() : Message<any> {
  return { type: SET_PAGE };
}
