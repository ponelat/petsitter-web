export interface RootState {
  user: User;
  error: {
    error?: string
  }
}

export interface Message<T> {
  type?: string;
  payload?: T;
}

export interface User {
  fullName?: string;
  email?: string;
  password?: string;
}


type Dispatcher = (dispatch: Function, getState: Function) => any
