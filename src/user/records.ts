import type { AxiosInstance } from 'axios'

export type ApiUserRecords = {
  additional_rating: number
  nickname: string
  plate: string
  rating: number
  records: ApiUserRecordItem[]
}

export type ApiUserRecordItemFcType = 'fc' | 'fcp' | 'ap' | 'app'
export type ApiUserRecordItemFsType = 'fs' | 'fsd' | 'fsdp'
export type ApiUserRecordItemRateType = 'd' | 'c' | 'b' | 'a' | 'aa' | 'aaa' | 's' | 'sp' | 'ss' | 'ssp' | 'sss' | 'sssp'
export type ApiUserRecordItemSongType = 'DX' | 'SD'

export type ApiUserRecordItem = {
  achievements: number
  ds: number
  dxScore: number
  fc: ApiUserRecordItemFcType
  fs: ApiUserRecordItemFsType
  level: string
  level_index: number
  level_label: string
  ra: number
  rate: ApiUserRecordItemRateType
  song_id: number
  title: string
  type: ApiUserRecordItemSongType
}

export async function apiUserGetAllRecords(
  client: AxiosInstance,
): Promise<ApiUserRecords> {
  const response = await client.get('/player/records', {
    responseType: 'json',
  })

  return response.data
}
