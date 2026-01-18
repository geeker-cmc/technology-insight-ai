import { insightRequest } from "@/utils/insight-service"
import type * as Insight from "./types"

/** 获取热门机构 */
export function getHotAffiliationByFieldApi(fieldName: string) {
  return insightRequest<Insight.InsightResponse<Insight.HotAffiliation[]>>({
    url: "/backend/tuijian-api/tech/getHotAffiliationByField",
    method: "get",
    params: { fieldName }
  })
}

/** 获取信息分类列表 */
export function getTechnologyHotTagListApi() {
  return insightRequest<Insight.InsightResponse<Insight.TechnologyHotTag[]>>({
    url: "/backend/tuijian-api/tech/getTechnologyHotTagList",
    method: "get"
  })
}

/** 获取热门技术列表 */
export function getHotTechnologyByFieldApi(fieldName: string) {
  return insightRequest<Insight.InsightResponse<Insight.HotTechnology[]>>({
    url: "/backend/tuijian-api/tech/getHotTechnologyByField",
    method: "get",
    params: { fieldName }
  })
}

/** 获取热门资讯列表 */
export function getHotNewsByFieldApi(keywords: string[]) {
  return insightRequest<Insight.InsightResponse<Insight.HotNews[]>>({
    url: "/backend/tuijian-api/tech/getHotNewsByField",
    method: "post",
    data: { keywords }
  })
}

/** 获取热门学者列表 */
export function getHotScholarByFieldApi(fieldName: string) {
  return insightRequest<Insight.InsightResponse<Insight.HotScholar[]>>({
    url: "/backend/tuijian-api/tech/getHotScholarByField",
    method: "get",
    params: { fieldName }
  })
}

/** 搜索查询 */
export function queryTechApi(params: Insight.SearchParams) {
  return insightRequest<Insight.InsightResponse<{ result: Insight.PaginationResponse<Insight.SearchResultItem> }>>({
    url: "/backend/tuijian-api/tech/query",
    method: "post",
    data: params
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
    }
  })
}
