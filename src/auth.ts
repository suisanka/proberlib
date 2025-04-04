import axios from 'axios'
import setCookieParser from 'set-cookie-parser'

export type ApiUserLoginResponse = {
  message: string
  token: string
  expires: Date
}

export async function apiAuthLogin(
  baseURL: string,
  username: string,
  password: string,
): Promise<ApiUserLoginResponse> {
  const response = await axios.post(
    `/login`,
    {
      username,
      password,
    },
    {
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    },
  )

  const cookies = setCookieParser.parse(response.headers['set-cookie'] ?? [], { map: true })

  if (cookies.jwt_token == null || cookies.jwt_token.expires == null) {
    throw new Error('No valid JWT token found')
  }

  return {
    message: response.data.message,
    token: cookies.jwt_token.value,
    expires: cookies.jwt_token.expires,
  }
}
