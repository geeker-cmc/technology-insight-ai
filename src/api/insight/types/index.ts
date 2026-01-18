/** Insight API 请求参数 */
export interface InsightRequestData {
  /** 查询参数 */
  query?: string
  /** 页码 */
  page?: number
  /** 每页数量 */
  pageSize?: number
}

/** Insight API 响应数据 */
export interface InsightResponseData {
  /** 状态码 */
  code: number
  /** 响应消息 */
  message: string
  /** 响应数据 */
  data: any
}
