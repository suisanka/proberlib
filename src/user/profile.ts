import type { AxiosInstance } from 'axios'

export type ApiUserProfile = {
  accept_agreement: boolean
  additional_rating: number
  bind_qq: string
  import_token: string
  mask: string
  nickname: string
  plate: string
  qq: string
  privacy: boolean
  qq_channel_uid: string
  username: string
}

export async function apiUserGetProfile(
  client: AxiosInstance,
): Promise<ApiUserProfile> {
  const response = await client.get('/player/profile', {
    responseType: 'json',
  })

  return response.data
}

export async function apiUserUpdateProfile(
  client: AxiosInstance,
  profile: Partial<ApiUserProfile>,
): Promise<ApiUserProfile> {
  const response = await client.post('/player/profile', profile, {
    responseType: 'json',
  })

  return response.data
}
