import { insightRequest } from "@/utils/insight-service"

/** 获取热门机构 */
export function getHotAffiliationByFieldApi(fieldName: string) {
  return insightRequest<any>({
    url: "/backend/tuijian-api/tech/getHotAffiliationByField",
    method: "get",
    params: { fieldName }
  })
}
