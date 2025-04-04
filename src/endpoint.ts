import { apiAuthLogin } from './auth'
import { ApiDev } from './dev'
import { ApiImport } from './import'
import { ApiQuery } from './query'
import { ApiUser } from './user'

export class ApiEndpoint {
  private _query: ApiQuery

  constructor(
    public baseURL: string,
  ) {
    this._query = new ApiQuery(baseURL)
  }

  query() {
    return this._query
  }

  dev(token: string) {
    return new ApiDev(this.baseURL, token)
  }

  import(token: string) {
    return new ApiImport(this.baseURL, token)
  }

  user(token: string) {
    return new ApiUser(this.baseURL, token)
  }

  async login(username: string, password: string) {
    const { token } = await apiAuthLogin(this.baseURL, username, password)
    return this.user(token)
  }
}
