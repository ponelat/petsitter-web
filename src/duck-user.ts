// Actions
import { User,  Message, Dispatcher, GetState } from './types'
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
      dispatch(storeUser(fetchedUser))
    }).catch(err => {
      dispatch(setError(err))
    })
  }
}

export function storeUser(user: User) : Dispatcher {
  return (dispatch) => {
    localStorage.setItem('user', JSON.stringify(user))
    dispatch(setUser(user))
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

export function signup(user: User) : Dispatcher {
  return async (dispatch) => {
    return Api.createUser(user).then(() => {
      Api.setSimpleToken(user.email, user.password)
      dispatch(storeUser(user))
    }).catch(err => {
      dispatch(setError(err))
      throw err
    })
  }
}

export function updateUser(user: User) : Dispatcher {
  return async (dispatch) => {
    return Api.updateUser(user).then(() => {
      Api.setSimpleToken(user.email, user.password)
      dispatch(storeUser(user))
    }).catch((err: any) => {
      dispatch(setError(err))
      throw err
    })
  }
}

export function deleteUser(id: string = "@me") : Dispatcher {
  return async (dispatch) => {
    return Api.deleteUser(id).then(() => {
      dispatch(logout())
    }).catch((err: any) => {
      dispatch(setError(err))
      throw err
    })
  }
}

export function logout() : Dispatcher {
  return async (dispatch) => {
    Api.clearSimpleToken()
    localStorage.removeItem('user')
    dispatch(setUser({}))
  }
}


export function user(getState: GetState) : User {
  return getState().user
}

export function userId(getState: GetState) : string {
  return user(getState).id || ''
}
