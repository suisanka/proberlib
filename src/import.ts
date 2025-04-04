import type { AxiosInstance } from 'axios'
import type { ApiUserRecordItem } from './user/records'
import axios from 'axios'
import { apiUserDeleteRecords, apiUserUpdateRecord, apiUserUpdateRecords } from './user/data'

export type { ApiUserRecordItem }

export class ApiImport {
  private readonly _client: AxiosInstance
  constructor(
    public baseURL: string,
    public token: string,
  ) {
    this._client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Import-Token': this.token,
      },
      responseType: 'json',
    })
  }

  async importRecords(records: ApiUserRecordItem[]) {
    return apiUserUpdateRecords(this._client, records)
  }

  async importRecord(record: ApiUserRecordItem) {
    return apiUserUpdateRecord(this._client, record)
  }

  async deleteRecords() {
    return apiUserDeleteRecords(this._client)
  }
}
