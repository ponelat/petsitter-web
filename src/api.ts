import fetch from 'isomorphic-fetch'
import { User, JobsPage, Job, JobApplication } from './types'

// @me - a magic ID that refers to the user idenitifed by the Authorization header
const ME = '%40me'

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

  async createUser(user: User) : Promise<Response> {
    return fetch(`${this.url}/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json',
      },
    })
  }

  async updateUser(user: User) : Promise<User> {
    return fetch(`${this.url}/users/${ME}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: this.headers(),
    }).then((res: Response) => res.json())
  }

  async deleteUser(id: string = ME) : Promise<any> {
    return fetch(`${this.url}/users/${id}`, {
      method: 'DELETE',
      headers: this.headers(true),
    })
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


  async getMyJobs() : Promise<Job[]> {
    return fetch(`${this.url}/users/${ME}/jobs`, {
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

  async fetchMyJobApplications() : Promise<JobApplication[]> {
    return fetch(`${this.url}/users/${ME}/job-applications`, {
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

  async applyToJob(id: string) : Promise<any> {
    return fetch(`${this.url}/jobs/${id}/job-applications`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({
        status: "APPLYING"
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
