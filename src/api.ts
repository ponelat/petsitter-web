import fetch from 'isomorphic-fetch'
import { User, JobsPage, Job, JobApplication, JobApplicationQueries } from './types'

export class PetSitterAPI {
  url: string;
  email?: string;
  password?: string;

  constructor(url: string) {
    this.url = url
  }

  setSimpleToken(email?: string, password?: string) {
    this.email = email
    this.password = password
  }

  clearSimpleToken() {
    this.email = ''
    this.password = ''
  }

  headers(emptyBody?: boolean) : Headers {
    const headers = new Headers({
      "Authorization": `Basic ${btoa(`${this.email}:${this.password}`)}`,
    })
    if(!emptyBody)
      headers.append("Content-Type", 'application/json')
    return headers
  }

  async getUser(id: string) : Promise<User> {
    return fetch(`${this.url}/users/${id}`, {
      headers: this.headers()
    }).then((res: Response) => res.json())
  }

  async getNextJobsPage() : Promise<JobsPage> {
    return fetch(`${this.url}/jobs`, {
      headers: this.headers()
    }).then((res: Response) => res.json())
  }

  async updateJob(job: Job) : Promise<Job> {
    return fetch(`${this.url}/jobs/${job.id}`, {
      method: 'PUT',
      body: JSON.stringify(job),
      headers: this.headers(),
    }).then((res: Response) => res.json())
  }

  async deleteJob(id: string) : Promise<any> {
    return fetch(`${this.url}/jobs/${id}`, {
      method: 'DELETE',
      headers: this.headers(true),
    })
  }

  async fetchJobApplictaions(jobId: string) : Promise<JobApplication[]> {
    return fetch(`${this.url}/jobs/${jobId}/applications`, {
      headers: this.headers(),
    }).then((res: Response) => res.json())
  }

  async createJob(job: Job) : Promise<Job> {
    return fetch(`${this.url}/jobs`, {
      method: 'POST',
      body: JSON.stringify(job),
      headers: this.headers(),
    }).then((res: Response) => res.json())
  }

  async fetchJob(id: string) : Promise<Job> {
    return fetch(`${this.url}/jobs/${id}`, {
      headers: this.headers(),
    }).then((res: Response) => res.json())
  }

  async fetchJobApplications({job_id, user_id}: JobApplicationQueries) : Promise<JobApplication[]> {
    const query = new URLSearchParams()
    if(job_id)
      query.append('job_id', job_id)
    if(user_id)
      query.append('user_id', user_id)

    return fetch(`${this.url}/job-applications?` + query.toString(), {
      headers: this.headers(),
    }).then((res: Response) => res.json())
  }

  async acceptDenyJobApplication(id: string, status: 'ACCEPTED' | 'DENIED') : Promise<any> {
    return fetch(`${this.url}/job-applications/${id}`, {
      method: 'PUT',
      headers: this.headers(),
      body: JSON.stringify({
        status
      }),
    }).then((res: Response) => res.json())
  }

}

const instance = new PetSitterAPI('')
// Used to extend the Window object

declare global {
    interface Window { api: any; }
}
window.api = instance

export default instance
