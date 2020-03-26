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
  name: string[];
  size?: "small" | "medium" | "large";
  breed?: string;
}

export interface Job {
  id: string;
  dog: Dog;
  activites: string[];
  description: string;
}

export interface JobsPage {
  items?: Job[];
  has_more?: boolean;
  total_items?: number;
}

export interface Jobs {
  jobsPage: JobsPage;
}


type Dispatcher = (dispatch: Function, getState: Function) => any
