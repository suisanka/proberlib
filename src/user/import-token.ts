import type { AxiosInstance } from 'axios'

export type ApiUserUpdateImportTokenResponse = {
  token: string
}

export async function apiUserUpdateImportToken(
  client: AxiosInstance,
): Promise<ApiUserUpdateImportTokenResponse> {
  const response = await client.put('/player/import-token', null, {
    responseType: 'json',
  })

  return response.data
}
