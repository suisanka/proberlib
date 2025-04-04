import type { AxiosInstance } from 'axios'
import type { ApiMessageResponse } from '../basic'

export async function apiUserHasAcceptedAgreement(
  client: AxiosInstance,
): Promise<boolean> {
  const response = await client.get(`/player/agreement`, {
    responseType: 'json',
  })

  return response.data.accept_agreement
}

export async function apiUserAcceptAgreement(
  client: AxiosInstance,
  accept: boolean,
): Promise<ApiMessageResponse> {
  const response = await client.post(`/player/agreement`, {
    accept_agreement: accept,
  }, {
    responseType: 'json',
  })

  return response.data
}
