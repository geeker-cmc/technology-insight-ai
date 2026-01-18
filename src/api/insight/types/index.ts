/** 通用响应接口 */
export interface InsightResponse<T = any> {
  /** 状态码 */
  code: number
  /** 响应消息 */
  msg?: string
  message?: string
  /** 响应数据 */
  data: T
}

/** Insight API 请求参数 */
export interface InsightRequestData {
  /** 查询参数 */
  query?: string
  /** 页码 */
  page?: number
  /** 每页数量 */
  pageSize?: number
}

/** 信息分类项 */
export interface TechnologyHotTag {
  /** 分类ID */
  id: string | number
  /** 分类名称 */
  name: string
}

/** 热门技术项 */
export interface HotTechnology {
  /** 技术ID */
  id: string | number
  /** 技术名称 */
  name: string
  /** 格式化节点分数 */
  formattedNodeScore: number
}

/** 热门资讯项 */
export interface HotNews {
  /** 资讯ID */
  id: string | number
  /** 标题 */
  title: string
  /** 内容 */
  content?: string
  /** 内容高亮 */
  contentHighlight?: string
  /** 资讯摘要 */
  newsAbstract?: string
  /** 链接地址 */
  url: string
  /** 图片地址 */
  pic?: string
  /** 来源URL */
  sourceUrl?: string
  /** 来源名称 */
  sourceName: string
  /** 日期 */
  date: string
  /** 日期字符串 */
  dateStr?: string
  /** 作者列表 */
  authors?: any[]
}

/** 技术新闻列表请求参数 */
export interface TechNewsListParams {
  /** 技术ID */
  id: string
  /** 页码 */
  page: number
  /** 每页数量 */
  pageSize: number
}

/** 搜索结果项 */
export interface SearchResultItem {
  /** ID */
  id: string
  /** 名称 */
  name: string
  /** 描述 */
  description?: string
  /** 描述高亮 */
  descriptionHighlight?: string
  /** 论文数量 */
  paperCount?: number
  /** 专利数量 */
  patentCount?: number
  /** 项目数量 */
  projectCount?: number
  /** 格式化节点分数 */
  formattedNodeScore?: number
}

/** 分页响应 */
export interface PaginationResponse<T> {
  /** 总数 */
  total: number
  /** 记录列表 */
  records: T[]
}

/** 搜索请求参数 */
export interface SearchParams {
  /** 页码 */
  page: number
  /** 每页数量 */
  pageSize: number
  /** 搜索关键词 */
  keyword: string
}

/** 查询技术请求参数 */
export interface QueryTechParams {
  /** 页码 */
  page?: number
  /** 每页数量 */
  pageSize?: number
  /** 搜索关键词 */
  keyword?: string
}

/** 新闻查询请求参数 */
export interface NewsQueryParams {
  /** 开始日期 */
  startDate: string
  /** 结束日期 */
  endDate: string
}

/** 新闻项 */
export interface NewsItem {
  /** 新闻ID */
  id: number
  /** 新闻日期 */
  newsDate: string
  /** 新闻标题 */
  newsTitle: string
  /** 新闻链接 */
  newsUrl: string
  /** 新闻内容 */
  newsContent: string
  /** 原始标题 */
  originalTitle: string
  /** 新闻来源 */
  newsSource: string
  /** 关键词 */
  keyword: string
  /** 类型 */
  type: string
  /** 摘要 */
  summary: string
  /** 创建时间 */
  createTime: string
  /** 更新时间 */
  updateTime: string
  /** 状态 */
  status: string
}

/** 通用响应接口 */
export interface CommonResponse<T = any> {
  /** 状态码 */
  code: number
  /** 响应消息 */
  message?: string
  /** 响应数据 */
  data: T
}

/** 热门机构项 */
export interface HotAffiliation {
  /** 机构ID */
  id: string
  /** 机构名称 */
  name: string
  /** 法人代表 */
  legalPerson?: any
  /** 法人代表姓名 */
  legalPersonName?: string
  /** 注册资本 */
  regCapital?: string
  /** 注册地 */
  regLocation?: string
  /** ISO3166国家代码 */
  iso3166?: string
  /** 省份 */
  province?: string
  /** 注册省份 */
  regProvince?: string
  /** 别名 */
  alias?: string
  /** Logo地址 */
  logo?: string
  /** 基本信息 */
  baseInfo?: string
  /** 成立时间 */
  establishmentTime?: string
  /** 成立时间字符串 */
  establishmentTimeStr?: string
  /** 成立时间范围 */
  establishmentTimeRange?: string
  /** 搜索类型（原始） */
  searchTypeRaw?: string
  /** 搜索类型 */
  searchType?: number
  /** 搜索类型字符串 */
  searchTypeStr?: string
  /** 是否新增 */
  isNew?: number
  /** 是否国外 */
  isAbroad?: boolean
  /** 专利数量 */
  patentCount?: number
  /** 总数 */
  totalCount?: number
  /** 省市字符串 */
  provinceCityStr?: string
  /** 地区名称 */
  regionName?: string
  /** 高价值专利数量 */
  highvaluePatentCount?: number
  /** 机构类型 */
  affiliationType?: string
  /** 简要信息 */
  briefInfo?: {
    baseInfo?: string
    statusInfo?: string
    achievementInfo?: string
  }
  /** 代表列表 */
  representList?: any[]
  /** 使用过的名称 */
  usedNames?: any[]
  /** 行业分类代码 */
  industryCategoryCode?: string
  /** 融资轮次标签 */
  financeRoundTags?: any[]
  /** 搜索类型标签 */
  searchTypeTags?: any[]
  /** 国内合作学者列表 */
  cnCooperateScholarList?: any[]
  /** 国内合作机构列表 */
  cnCooperateAffiliationList?: any[]
}

/** 热门学者项 */
export interface HotScholar {
  /** 学者ID */
  id: string
  /** 学者姓名 */
  name: string
  /** 作者主页 */
  authorHomepage?: string
  /** 职称 */
  title?: string
  /** 职称（专业） */
  professionalTitle?: string
  /** 专业领域 */
  major?: string
  /** 专业标签 */
  majorTags?: string[]
  /** 职称标签 */
  titleTags?: string[]
  /** 职位 */
  position?: string
  /** 学历 */
  education?: string
  /** 毕业院校 */
  school?: string
  /** 头像 */
  headPortrait?: string
  /** 简介 */
  brief?: string
  /** AI简介 */
  aiBrief?: string
  /** 所属部门 */
  department?: string
  /** 所属机构ID */
  affiliationId?: string
  /** 所属机构名称 */
  affiliationName?: string
  /** 所属机构信息 */
  affiliation?: any
  /** 论文数量 */
  paperCount?: number
  /** 获奖数量 */
  awardCount?: number
  /** 引用数量 */
  citationCount?: number
  /** 博士后数量 */
  postGraduateCount?: number
  /** 合作者数量 */
  cooperatorCount?: number
  /** H指数 */
  hindex?: number
  /** 年龄 */
  age?: number
  /** 地区代码 */
  regionCode?: string
  /** 地区名称 */
  regionName?: string
  /** 城市 */
  city?: string
  /** 搜索标签 */
  searchLabels?: string
  /** 学者类型分类 */
  authorTypeClassification?: number
  /** 学者类型分类标签 */
  authorTypeClassificationTag?: string
  /** 简要信息 */
  briefInfo?: {
    baseInfo?: string
    majorInfo?: string
    achievementInfo?: string
    statusInfo?: string
  }
}
