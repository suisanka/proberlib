import type { AxiosInstance } from 'axios'
import type { ApiUserRecordItem, ApiUserRecords } from './user'
import axios from 'axios'

export type { ApiUserRecords }

export async function apiDevGetUserRecords(
  client: AxiosInstance,
  type: 'username' | 'qq',
  query: string,
): Promise<ApiUserRecords> {
  const response = await client.get('/dev/player/records', {
    params: {
      [type]: query,
    },
    responseType: 'json',
  })
  return response.data
}

export async function apiDevGetUserRecord(
  client: AxiosInstance,
  type: 'username' | 'qq',
  query: string,
  musicId: number[],
): Promise<Record<`${number}`, ApiUserRecordItem[]>> {
  const response = await client.post('/dev/player/record', {
    [type]: query,
    music_id: musicId,
  }, {
    responseType: 'json',
  })

  return response.data
}

export class ApiDev {
  private readonly _client: AxiosInstance
  constructor(
    public baseURL: string,
    public token: string,
  ) {
    this._client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Developer-Token': this.token,
      },
      responseType: 'json',
    })
  }

  async getUserRecords(
    type: 'username' | 'qq',
    query: string,
  ): Promise<ApiUserRecords> {
    return apiDevGetUserRecords(this._client, type, query)
  }

  async getUserRecord(
    type: 'username' | 'qq',
    query: string,
    musicId: number[],
  ): Promise<Record<`${number}`, ApiUserRecordItem[]>> {
    return apiDevGetUserRecord(this._client, type, query, musicId)
  }
}
