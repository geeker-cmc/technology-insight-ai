import { insightRequest } from "@/utils/insight-service"
import { request } from "@/utils/service"
import type * as Insight from "./types"

const new_api_url = import.meta.env.VITE_NEW_API
const base_url = import.meta.env.VITE_BASE_API

/** 获取热门机构 */
export function getHotAffiliationByFieldApi(fieldName: string) {
  return insightRequest<Insight.InsightResponse<Insight.HotAffiliation[]>>({
    url: "/backend/tuijian-api/tech/getHotAffiliationByField",
    method: "get",
    params: { fieldName },
    withCredentials: true
  })
}

/** 获取信息分类列表 */
export function getTechnologyHotTagListApi() {
  return insightRequest<Insight.InsightResponse<Insight.TechnologyHotTag[]>>({
    url: "/backend/tuijian-api/tech/getTechnologyHotTagList",
    method: "get",
    withCredentials: true
  })
}

/** 获取热门技术列表 */
export function getHotTechnologyByFieldApi(fieldName: string) {
  return insightRequest<Insight.InsightResponse<Insight.HotTechnology[]>>({
    url: "/backend/tuijian-api/tech/getHotTechnologyByField",
    method: "get",
    params: { fieldName },
    withCredentials: true
  })
}

/** 获取热门资讯列表 */
export function getHotNewsByFieldApi(keywords: string[]) {
  return insightRequest<Insight.InsightResponse<Insight.HotNews[]>>({
    url: "/backend/tuijian-api/tech/getHotNewsByField",
    method: "post",
    data: { keywords },
    withCredentials: true
  })
}

/** 获取热门学者列表 */
export function getHotScholarByFieldApi(fieldName: string) {
  return insightRequest<Insight.InsightResponse<Insight.HotScholar[]>>({
    url: "/backend/tuijian-api/tech/getHotScholarByField",
    method: "get",
    params: { fieldName },
    withCredentials: true
  })
}

/** 搜索查询 */
export function queryTechApi(params: Insight.SearchParams) {
  return insightRequest<Insight.InsightResponse<{ result: Insight.PaginationResponse<Insight.SearchResultItem> }>>({
    url: "/backend/tuijian-api/tech/query",
    method: "post",
    data: params,
    withCredentials: true
  })
}
/** 获取技术新闻列表 */
export function getTechNewsListApi(params: Insight.TechNewsListParams) {
  return insightRequest<Insight.InsightResponse<Insight.PaginationResponse<Insight.HotNews>>>({
    url: `/backend/tuijian-api/tech/${params.id}/newsList`,
    method: "get",
    params: {
      page: params.page,
      pageSize: params.pageSize,
      sortField: "time"
    },
    withCredentials: true
  })
}

/** 查询新闻管理 */
export function queryNewsManageApi(params: Insight.NewsQueryParams) {
  return request<Insight.CommonResponse<Insight.NewsItem[]>>({
    url: `${new_api_url}/api/news/manage/query`,
    method: "post",
    data: params
  })
}

/** 查询政策列表 */
export function queryPolicyListApi(params: Insight.PolicyQueryParams) {
  return request<{
    code: number
    message?: string
    data: {
      records: Insight.PolicyItem[]
      total?: number
    }
  }>({
    url: `${base_url}/api/policy/list`,
    method: "post",
    data: params
  })
}

/** 查询人才列表 */
export function queryTalentListApi(params: Insight.TalentQueryParams) {
  return insightRequest<Insight.InsightResponse<{ result: Insight.PaginationResponse<Insight.TalentItem> }>>({
    url: "/backend/tuijian-api/scholars/query/V3_3",
    method: "post",
    data: params,
    withCredentials: true
  })
}
