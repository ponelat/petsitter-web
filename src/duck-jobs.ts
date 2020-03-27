import { Dispatcher, Message } from './types'
import { setError } from './duck-error'
import Api from './api'
import { JobsPage, Job } from './types'

// Actions
const SET_CURRENT = 'jobs/SET-CURRENT';
const SET_PAGE = 'jobs/SET-PAGE';

// Reducer
export default function reducer(state = {}, action: Message<any> = {}) {
  switch (action.type) {
    case SET_CURRENT:
      // Perform action
      return {...state, current: action.payload};
    case SET_PAGE:
      // Perform action
      return {...state, jobsPage: action.payload};
    default: return state;
  }
}

// Action Creators
export function getNextPage() : Dispatcher {
  return (dispatch) => {
    Api.getNextJobsPage().then(jobsPage => {
      dispatch(setPage(jobsPage))
    }).catch(err => {
      dispatch(setError(err))
    })
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

export function createJob(job: Job) : Dispatcher {
  return (dispatch) => {
    return Api.createJob(job).catch(err => dispatch(setError(err)))
  }
}

export function fetchJob(id: string) : Dispatcher {
  return (dispatch) => {
    return Api.fetchJob(id)
      .then((job: Job) => {
        dispatch(setCurrent(job))
      })
      .catch(err => dispatch(setError(err)))
  }
}

export function setCurrent(job: Job) : Message<Job> {
  return { type: SET_CURRENT, payload: job };
}

export function setPage(jobsPage: JobsPage) : Message<JobsPage> {
  return { type: SET_PAGE, payload: jobsPage };
}
