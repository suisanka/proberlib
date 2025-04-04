import type { ApiUserRecords } from './user/records'
import axios from 'axios'

export type ApiChartStats = {
  charts: Record<`${number}`, ApiChartStatItem[]>
  diff_data: Record<`${number}`, ApiChartStatDiffItem>
}

export type ApiChartStatItem = {
  cnt: number
  diff: string
  fit_diff: number
  avg: number
  avg_dx: number
  std_dev: number
  dist: number[]
  fc_dist: number[]
}

export type ApiChartStatDiffItem = {
  achievements: number
  dist: number[]
  fc_dist: number[]
}

export type ApiMusicDataChartItem = {
  notes: number[]
  charter: string
}

export type ApiMusicDataBasicInfoItem = {
  title: string
  artist: string
  genre: string
  bpm: number
  release_date: string
  from: string
  is_new: boolean
}

export type ApiMusicDataItem = {
  id: string
  title: string
  type: string
  ds: number[]
  level: string[]
  cids: number[]
  charts: ApiMusicDataChartItem[]
  basic_info: ApiMusicDataBasicInfoItem
}

export async function apiQueryBestRecords(
  baseURL: string,
  type: 'username' | 'qq',
  query: string,
  b50: boolean = true,
): Promise<ApiUserRecords> {
  const response = await axios.post('/query/player', {
    [type]: query,
    b50: b50 ? true : null,
  }, {
    baseURL,
    responseType: 'json',
  })

  return response.data
}

export type ApiQueryRatingRankingItem = {
  username: string
  ra: number
}

export async function apiQueryRatingRanking(baseURL: string): Promise<ApiQueryRatingRankingItem[]> {
  const response = await axios.get('/rating_ranking', {
    baseURL,
    responseType: 'json',
  })

  return response.data
}

export async function apiQueryChartStats(baseURL: string): Promise<ApiChartStats> {
  const response = await axios.get('/chart_stats', {
    baseURL,
    responseType: 'json',
  })

  return response.data
}

let etag: string | null = null
let cached: ApiMusicDataItem[] | null = null
export async function apiQueryMusicData(baseURL: string, useCache: boolean = true): Promise<ApiMusicDataItem[]> {
  const response = await axios.get('/music_data', {
    baseURL,
    responseType: 'json',
    headers: {
      'If-None-Match': useCache ? etag : null,
    },
    validateStatus: status => status === 200 || (useCache && etag != null && status === 304),
  })

  if (useCache && response.status === 200) {
    etag = response.headers.etag
    cached = response.data
  }

  return useCache ? cached! : response.data
}

export class ApiQuery {
  constructor(
    public baseURL: string,
  ) {}

  queryBestRecords(
    type: 'username' | 'qq',
    query: string,
    b50: boolean = true,
  ): Promise<ApiUserRecords> {
    return apiQueryBestRecords(this.baseURL, type, query, b50)
  }

  queryRatingRanking(): Promise<ApiQueryRatingRankingItem[]> {
    return apiQueryRatingRanking(this.baseURL)
  }

  queryChartStats(): Promise<ApiChartStats> {
    return apiQueryChartStats(this.baseURL)
  }

  queryMusicData(useCache: boolean = true): Promise<ApiMusicDataItem[]> {
    return apiQueryMusicData(this.baseURL, useCache)
  }
}
