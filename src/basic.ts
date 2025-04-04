import { AxiosError } from 'axios'

export type ApiMessageResponse = {
  message: 'success' | string
}

export type ApiError = AxiosError<ApiMessageResponse> | AxiosError<any>

export function isApiError(error: unknown): error is ApiError {
  return error instanceof AxiosError
}

export function getApiErrorMessage(error: ApiError): string | undefined {
  return error.response?.data.message
}
