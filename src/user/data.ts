import type { AxiosInstance } from 'axios'
import type { ApiUserRecordItem } from './records'

export async function apiUserUpdateRecords(
  client: AxiosInstance,
  records: ApiUserRecordItem[],
) {
  await client.post('/player/update_records', records, {
    responseType: 'json',
  })
}

export async function apiUserUpdateRecord(
  client: AxiosInstance,
  record: ApiUserRecordItem,
) {
  await client.post('/player/update', record, {
    responseType: 'json',
  })
}

export async function apiUserDeleteRecords(
  client: AxiosInstance,
): Promise<number> {
  const response = await client.delete('/player/delete_records', {
    responseType: 'json',
  })

  return response.data.message
}
