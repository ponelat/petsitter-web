// Actions
import { User,  Message, Dispatcher } from './types'
import { setError }  from './duck-error'
import Api from './api'

const SET = 'user/SET'

// Reducer
export default function reducer(state = {}, action: Message<any>) {
  switch (action.type) {
    case SET:
      return action.payload
    default: return state
  }
}

// Action Creators

export function getCurrentUser()  : Dispatcher {
  return (dispatch) => {
    Api.getUser('@me').then((fetchedUser) => {
      localStorage.setItem('user', JSON.stringify(fetchedUser))
      dispatch(setUser(fetchedUser))
    }).catch(err => {
      dispatch(setError(err))
    })
  }
}

export function setUser(user: User) : Message<User> {
  return { type: SET, payload: user }
}


// Async Actions
export function login(user: User) : Dispatcher {
  return async (dispatch) => {
    Api.setSimpleToken(user.email, user.password)
    dispatch(getCurrentUser())
  }
}

export function logout() : Dispatcher {
  return async (dispatch) => {
    Api.clearSimpleToken()
    localStorage.removeItem('user')
    dispatch(setUser({}))
  }
}
