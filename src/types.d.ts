export interface RootState {
  user: User;
  jobs: Jobs;
  error: {
    error?: string
  }
}

export interface Message<T> {
  type?: string;
  payload?: T;
}

export interface User {
  id?: string;
  full_name?: string;
  email?: string;
  password?: string;
}

export interface Dog {
  name: string;
  size?: string;
  breed?: string;
  years_old: number;
}

export interface Job {
  id?: string;
  dog: Dog;
  activities: string[];
  description: string;
  starts_at: string;
  ends_at: string;
}

export interface JobsPage {
  items?: Job[];
  has_more?: boolean;
  total_items?: number;
}

export interface JobApplication {
  id?: string;
  user_id: string;
  job_id: string;
  status: string;
}

export interface JobApplicationQueries {
  job_id?: string;
  creator_user_id?: string;
  worker_user_id?: string;
}

export interface Jobs {
  jobsPage?: JobsPage;
  current?: Job;
  currentApplications?: JobApplication[];
}

type Dispatcher = (dispatch: Function, getState: Function) => any
