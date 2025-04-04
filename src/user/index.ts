import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { ApiMessageResponse } from '../basic'
import type { ApiUserUpdateImportTokenResponse } from './import-token'
import type { ApiUserProfile } from './profile'
import type { ApiUserRecordItem, ApiUserRecordItemFcType, ApiUserRecordItemFsType, ApiUserRecordItemRateType, ApiUserRecordItemSongType, ApiUserRecords } from './records'
import axios, { mergeConfig } from 'axios'
import { jwtDecode } from 'jwt-decode'
import { apiQueryBestRecords } from '../query'
import { apiUserAcceptAgreement, apiUserHasAcceptedAgreement } from './agreement'
import { apiUserDeleteRecords, apiUserUpdateRecord, apiUserUpdateRecords } from './data'
import { apiUserUpdateImportToken } from './import-token'
import { apiUserGetProfile, apiUserUpdateProfile } from './profile'
import { apiUserGetAllRecords } from './records'

export type {
  ApiMessageResponse,
  ApiUserProfile,
  ApiUserRecordItem,
  ApiUserRecordItemFcType,
  ApiUserRecordItemFsType,
  ApiUserRecordItemRateType,
  ApiUserRecordItemSongType,
  ApiUserRecords,
  ApiUserUpdateImportTokenResponse,
}

export class ApiUser {
  private readonly _client: AxiosInstance

  constructor(
    public baseURL: string,
    public jwtToken: string,
    config?: AxiosRequestConfig,
  ) {
    this._client = axios.create(
      mergeConfig(config ?? {}, {
        baseURL: this.baseURL,
        headers: {
          Cookie: `jwt_token=${this.jwtToken}`,
        },
        responseType: 'json',
      }),
    )
  }

  isExpired() {
    const decoded = jwtDecode(this.jwtToken)
    return decoded.exp != null && decoded.exp < Date.now() / 1000
  }

  async getAllRecords() {
    return apiUserGetAllRecords(this._client)
  }

  async getProfile() {
    return apiUserGetProfile(this._client)
  }

  async updateProfile(profile: Partial<ApiUserProfile>) {
    return apiUserUpdateProfile(this._client, profile)
  }

  async getBestRecords(b50: boolean = true) {
    const { username } = await this.getProfile()
    return apiQueryBestRecords(this.baseURL, 'username', username, b50)
  }

  async hasAcceptedAgreement() {
    return apiUserHasAcceptedAgreement(this._client)
  }

  async acceptAgreement(accept: boolean = true) {
    return apiUserAcceptAgreement(this._client, accept)
  }

  async updateImportToken() {
    return apiUserUpdateImportToken(this._client)
  }

  async deleteRecords() {
    return apiUserDeleteRecords(this._client)
  }

  async updateRecord(record: ApiUserRecordItem) {
    return apiUserUpdateRecord(this._client, record)
  }

  async updateRecords(records: ApiUserRecordItem[]) {
    return apiUserUpdateRecords(this._client, records)
  }
}
