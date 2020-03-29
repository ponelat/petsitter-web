import { Dispatcher, Message } from './types'
import { setError } from './duck-error'
import {userId} from './duck-user'
import Api from './api'
import { JobsPage, Jobs, Job, JobApplication, RootState, JobApplicationStatus } from './types'

// Actions
const SET_JOB_APPLICATIONS = 'jobs/SET-JOB-APPLICATIONS';
const SET_CURRENT = 'jobs/SET-CURRENT';
const SET_PAGE = 'jobs/SET-PAGE';

// Reducer
export default function reducer(state: Jobs = {}, action: Message<any> = {}) : Jobs {
  switch (action.type) {
    case SET_JOB_APPLICATIONS:
      // Perform action
      return {...state, currentApplications: action.payload};
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
export function setJobApplications(ja: JobApplication[]) : Message<JobApplication[]> {
  return { type: SET_JOB_APPLICATIONS, payload: ja};
}

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
  return async (dispatch) => {
    return Api.createJob(job).catch(err => dispatch(setError(err)))
  }
}

export function updateJob(job: Job) : Dispatcher {
  return async (dispatch) => {
    return Api.updateJob(job).catch(err => dispatch(setError(err)))
  }
}


export function deleteJob(id: string) : Dispatcher {
  return async (dispatch) => {
    return Api.deleteJob(id).catch(err => dispatch(setError(err)))
  }
}

export function fetchJob(id: string) : Dispatcher {
  return async (dispatch) => {
    return Api.fetchJob(id)
      .then((job: Job) => {
        dispatch(setCurrent(job))
      })
      .catch(err => dispatch(setError(err)))
  }
}

export function fetchMyJobApplications() : Dispatcher {
  return async (dispatch, getState) => {
    const user_id = userId(getState)
    return Api.fetchJobApplications({user_id})
      .then((ja: JobApplication[]) => {
        dispatch(setJobApplications(ja))
      })
      .catch(err => dispatch(setError(err)))
  }
}


export function acceptDenyJobApplication(id: string,  status: JobApplicationStatus) : Dispatcher {
   return async (dispatch) => {
    return Api.acceptDenyJobApplication(id, status)
      .catch(err => dispatch(setError(err)))
  }
}




export function setCurrent(job: Job) : Message<Job> {
  return { type: SET_CURRENT, payload: job };
}

export function setPage(jobsPage: JobsPage) : Message<JobsPage> {
  return { type: SET_PAGE, payload: jobsPage };
}
