import fetch from 'isomorphic-fetch'
import { User } from './types'

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

  simpleTokenHeaders() : Headers | null {
    if(!this.email)
      return null

    return new Headers({
      "Authorization": `Basic ${btoa(`${this.email}:${this.password}`)}`
    })
  }

  async getUser(id: string) : Promise<User> {
    const headers = this.simpleTokenHeaders()
    if(!headers)
      return Promise.reject(new Error("No credentials in memory"))

    return fetch(`${this.url}/users/${id}`, {
      headers
    }).then((res: Response) => res.json())
  }

}


export default new PetSitterAPI('http://localhost:4010')
