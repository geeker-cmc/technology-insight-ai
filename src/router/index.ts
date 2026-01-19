import { type RouteRecordRaw, createRouter } from "vue-router"
import { history, flatMultiLevelRoutes } from "./helper"
import routeSettings from "@/config/route"

const Layouts = () => import("@/layouts/index.vue")

/**
 * 常驻路由
 * 除了 redirect/403/404/login 等隐藏页面,其他页面建议设置 Name 属性
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layouts,
    meta: {
      hidden: true
    },
    children: [
      {
        path: ":path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/chat",
    component: () => import("@/views/chat/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    component: Layouts,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "科技速览",
          svgIcon: "dashboard",
          affix: true,
          keepAlive: true
        }
      },
      {
        path: "tech-info-tracking",
        component: () => import("@/views/tech-info-tracking/index.vue"),
        meta: {
          title: "科技情报跟踪页",
          hidden: true,
          keepAlive: true
        }
      },
      {
        path: "search-result",
        component: () => import("@/views/search-result/index.vue"),
        meta: {
          title: "搜索结果",
          hidden: true,
          keepAlive: true
        }
      },
      {
        path: "advanced-tech-foresight",
        component: () => import("@/views/advanced-tech-foresight/index.vue"),
        meta: {
          title: "前沿技术预见",
          hidden: true,
          keepAlive: true
        }
      },
      {
        path: "policy-analysis",
        component: () => import("@/views/policy-analysis/index.vue"),
        meta: {
          title: "政策分析",
          hidden: true,
          keepAlive: true
        }
      },
      {
        path: "iframe-view",
        component: () => import("@/views/iframe-view/index.vue"),
        meta: {
          title: "",
          hidden: true
        }
      }
    ]
  },
  {
    path: "/talent-portrait",
    component: Layouts,
    children: [
      {
        path: "",
        component: () => import("@/views/talent-portrait/index.vue"),
        name: "TalentPortrait",
        meta: {
          title: "人才画像",
          elIcon: "Avatar",
          keepAlive: true
        }
      }
    ]
  },
  {
    path: "/industry-mining",
    component: Layouts,
    redirect: "/industry-mining/country",
    meta: {
      title: "产业挖掘",
      elIcon: "DataAnalysis"
    },
    children: [
      {
        path: "country",
        component: () => import("@/views/iframe/index.vue"),
        name: "IndustryMapCountry",
        meta: {
          title: "全国图谱",
          page: "/cyfx/industry-chart/industry-panorama",
          keepAlive: true
        }
      },
      {
        path: "region",
        component: () => import("@/views/iframe/index.vue"),
        name: "IndustryMapRegion",
        meta: {
          title: "区域图谱",
          page: "/cyfx/industry-chart/industry-area",
          keepAlive: true
        }
      },
      {
        path: "industry-chain",
        component: () => import("@/views/iframe/index.vue"),
        name: "CompetitionIndustryChain",
        meta: {
          title: "产业链地图",
          page: "/cyfx/industry-map/industry-chain",
          keepAlive: true
        }
      },
      {
        path: "supply-chain",
        component: () => import("@/views/iframe/index.vue"),
        name: "CompetitionSupplyChain",
        meta: {
          title: "供应链地图",
          page: "/cyfx/industry-map/supply-chain",
          keepAlive: true
        }
      },
      {
        path: "technology-chain",
        component: () => import("@/views/iframe/index.vue"),
        name: "CompetitionTechnologyChain",
        meta: {
          title: "技术链地图",
          page: "/cyfx/industry-map/technology-chain",
          keepAlive: true
        }
      },
      {
        path: "sales-chain",
        component: () => import("@/views/iframe/index.vue"),
        name: "CompetitionSalesChain",
        meta: {
          title: "销售链地图",
          page: "/cyfx/industry-map/sales-chain",
          keepAlive: true
        }
      },
      {
        path: "industry",
        component: () => import("@/views/iframe/index.vue"),
        name: "RegionalComparisonIndustry",
        meta: {
          title: "产业对比分析",
          page: "/cyfx/benchmarking-area/industry-contrast",
          keepAlive: true
        }
      },
      {
        path: "advantage",
        component: () => import("@/views/iframe/index.vue"),
        name: "RegionalComparisonAdvantage",
        meta: {
          title: "产业占比分析",
          page: "/cyfx/benchmarking-area/industry-rate",
          keepAlive: true
        }
      },
      {
        path: "list",
        component: () => import("@/views/iframe/index.vue"),
        name: "ParkList",
        meta: {
          title: "园区榜单",
          page: "/cyfx/park-map/park-hot",
          keepAlive: true
        }
      },
      {
        path: "industry-overview",
        component: () => import("@/views/iframe/index.vue"),
        name: "OperationIndustryOverview",
        meta: {
          title: "产业总览",
          page: "/cyfx/operation-analysis/industry-overview",
          keepAlive: true
        }
      },
      {
        path: "enterprise-layout",
        component: () => import("@/views/iframe/index.vue"),
        name: "OperationEnterpriseLayout",
        meta: {
          title: "企业布局",
          page: "/cyfx/operation-analysis/enterprise-layout",
          keepAlive: true
        }
      },
      {
        path: "industry-chain-evaluation",
        component: () => import("@/views/iframe/index.vue"),
        name: "OperationIndustryChainEvaluation",
        meta: {
          title: "产业链整体评价",
          page: "/cyfx/operation-analysis/industry-evaluate",
          keepAlive: true
        }
      },
      {
        path: "industry-chain-analysis",
        component: () => import("@/views/iframe/index.vue"),
        name: "OperationIndustryChainAnalysis",
        meta: {
          title: "产业链载体分析",
          page: "/cyfx/operation-analysis/industry-carrier-analyse",
          keepAlive: true
        }
      },
      {
        path: "industry-chain-strength",
        component: () => import("@/views/iframe/index.vue"),
        name: "OperationIndustryChainStrength",
        meta: {
          title: "产业链强弱分析",
          page: "/cyfx/operation-analysis/industry-depend",
          keepAlive: true
        }
      },
      {
        path: "industry-chain",
        component: () => import("@/views/iframe/index.vue"),
        name: "InvestmentModelIndustryChain",
        meta: {
          title: "产业链招商",
          page: "/jzzs/industry-chain",
          keepAlive: true
        }
      },
      {
        path: "industry-map",
        component: () => import("@/views/iframe/index.vue"),
        name: "InvestmentModelIndustryMap",
        meta: {
          title: "产业地图招商",
          page: "/jzzs/cydt",
          keepAlive: true
        }
      },
      {
        path: "strong-chain",
        component: () => import("@/views/iframe/index.vue"),
        name: "InvestmentModelStrongChain",
        meta: {
          title: "强延补链招商",
          page: "/jzzs/ses-chain",
          keepAlive: true
        }
      },
      {
        path: "related-chain",
        component: () => import("@/views/iframe/index.vue"),
        name: "InvestmentModelRelatedChain",
        meta: {
          title: "关系链招商",
          page: "/jzzs/relation-chain",
          keepAlive: true
        }
      },
      {
        path: "similar",
        component: () => import("@/views/iframe/index.vue"),
        name: "InvestmentModelSimilar",
        meta: {
          title: "以商招商",
          page: "/jzzs/local-support",
          keepAlive: true
        }
      },
      {
        path: "famous-enterprise",
        component: () => import("@/views/parent-page/index.vue"),
        redirect: "/investment-model/famous-enterprise/world-500",
        meta: {
          title: "名企榜单招商"
        },
        children: [
          {
            path: "world-500",
            component: () => import("@/views/iframe/index.vue"),
            name: "InvestmentModelFamousEnterpriseWorld500",
            meta: {
              title: "世界500强",
              page: "/jzzs/famous/top500-42",
              keepAlive: true
            }
          },
          {
            path: "china-500",
            component: () => import("@/views/iframe/index.vue"),
            name: "InvestmentModelFamousEnterpriseChina500",
            meta: {
              title: "中国500强",
              page: "/jzzs/famous/top500-45",
              keepAlive: true
            }
          },
          {
            path: "china-private-500",
            component: () => import("@/views/iframe/index.vue"),
            name: "InvestmentModelFamousEnterpriseChinaPrivate500",
            meta: {
              title: "中国民企500强",
              page: "/jzzs/famous/top500-47",
              keepAlive: true
            }
          },
          {
            path: "china-innovation-100",
            component: () => import("@/views/iframe/index.vue"),
            name: "InvestmentModelFamousEnterpriseChinaInnovation100",
            meta: {
              title: "中国创新100强",
              page: "/jzzs/famous/top500-66",
              keepAlive: true
            }
          }
        ]
      },
      {
        path: "leading-enterprise",
        component: () => import("@/views/iframe/index.vue"),
        name: "InvestmentModelLeadingEnterprise",
        meta: {
          title: "龙头骨干招商",
          page: "/jzzs/inventory/faucet",
          keepAlive: true
        }
      },
      {
        path: "qualified-enterprise",
        component: () => import("@/views/iframe/index.vue"),
        name: "InvestmentModelQualifiedEnterprise",
        meta: {
          title: "资质企业招商",
          page: "/jzzs/inventory/leading",
          keepAlive: true
        }
      },
      {
        path: "investment-fund",
        component: () => import("@/views/iframe/index.vue"),
        name: "InvestmentModelInvestmentFund",
        meta: {
          title: "投行基金招商",
          page: "/jzzs/inventory/ib",
          keepAlive: true
        }
      },
      {
        path: "research-institute",
        component: () => import("@/views/iframe/index.vue"),
        name: "InvestmentModelResearchInstitute",
        meta: {
          title: "科研机构招商",
          page: "/jzzs/inventory/organization",
          keepAlive: true
        }
      },
      {
        path: "chain-master",
        component: () => import("@/views/parent-page/index.vue"),
        redirect: "/investment-model/chain-master/supporting",
        meta: {
          title: "链主适配招商"
        },
        children: [
          {
            path: "supporting",
            component: () => import("@/views/iframe/index.vue"),
            name: "InvestmentModelChainMasterSupporting",
            meta: {
              title: "链主配套招商",
              page: "/jzzs/area-chain/faucet-matching",
              keepAlive: true
            }
          },
          {
            path: "peer",
            component: () => import("@/views/iframe/index.vue"),
            name: "InvestmentModelChainMasterPeer",
            meta: {
              title: "链主同业招商",
              page: "/jzzs/area-chain/faucet-analogy",
              keepAlive: true
            }
          }
        ]
      },
      {
        path: "overview",
        component: () => import("@/views/iframe/index.vue"),
        name: "EnterprisePortraitOverview",
        meta: {
          title: "企业总览",
          page: "/qyjc/enterprise-overview",
          keepAlive: true
        }
      },
      {
        path: "monitoring",
        component: () => import("@/views/iframe/index.vue"),
        name: "EnterprisePortraitMonitoring",
        meta: {
          title: "企业监测",
          page: "/qyjc/enterprise-monitoring",
          keepAlive: true
        }
      },
      {
        path: "list",
        component: () => import("@/views/iframe/index.vue"),
        name: "EnterprisePortraitList",
        meta: {
          title: "企业榜单",
          page: "/qyjc/company-hot",
          keepAlive: true
        }
      },
      {
        path: "selector",
        component: () => import("@/views/iframe/index.vue"),
        name: "EnterprisePortraitSelector",
        meta: {
          title: "企业筛选器",
          page: "/qyjc/enterprise-filter",
          keepAlive: true
        }
      },
      {
        path: "portrait",
        component: () => import("@/views/iframe/index.vue"),
        name: "EnterprisePortraitDetail",
        meta: {
          title: "企业画像",
          page: "/qyjc/archives-home",
          keepAlive: true
        }
      },
      {
        path: "evaluation",
        component: () => import("@/views/iframe/index.vue"),
        name: "EnterprisePortraitEvaluation",
        meta: {
          title: "企业综合评价",
          page: "/qyjc/synthesis",
          keepAlive: true
        }
      },
      {
        path: "industry",
        component: () => import("@/views/iframe/index.vue"),
        name: "ForecastMonitoringIndustry",
        meta: {
          title: "产业发展预警",
          page: "/cydt/risk-warning/industry-dev-warning",
          keepAlive: true
        }
      },
      {
        path: "enterprise",
        component: () => import("@/views/iframe/index.vue"),
        name: "ForecastMonitoringEnterprise",
        meta: {
          title: "企业外迁预警",
          page: "/cydt/risk-warning/out-migration-warning",
          keepAlive: true
        }
      },
      {
        path: "news",
        component: () => import("@/views/iframe/index.vue"),
        name: "IntelligenceDynamicsNews",
        meta: {
          title: "资讯热点",
          page: "/cydt/industry-news",
          keepAlive: true
        }
      },
      {
        path: "policy",
        component: () => import("@/views/iframe/index.vue"),
        name: "IntelligenceDynamicsPolicy",
        meta: {
          title: "政策规划",
          page: "/cydt/industry-policy",
          keepAlive: true
        }
      }
    ]
  },
  {
    path: "/enterprise-investment",
    component: Layouts,
    redirect: "/enterprise-investment/panorama",
    meta: {
      title: "企业智投",
      elIcon: "TrendCharts"
    },
    children: [
      {
        path: "panorama",
        component: () => import("@/views/empty-page/index.vue"),
        name: "EnterprisePanorama",
        meta: {
          title: "企业全景",
          keepAlive: true
        }
      },
      {
        path: "state-owned-layout",
        component: () => import("@/views/empty-page/index.vue"),
        name: "StateOwnedLayout",
        meta: {
          title: "央企布局",
          keepAlive: true
        }
      },
      {
        path: "potential-enterprises",
        component: () => import("@/views/empty-page/index.vue"),
        name: "PotentialEnterprises",
        meta: {
          title: "潜力企业",
          keepAlive: true
        }
      },
      {
        path: "monitoring",
        component: () => import("@/views/empty-page/index.vue"),
        name: "EnterpriseMonitoring",
        meta: {
          title: "企业监测",
          keepAlive: true
        }
      }
    ]
  },
  {
    path: "/technology-scanning",
    component: Layouts,
    redirect: "/technology-scanning/knowledge-graph",
    meta: {
      title: "技术扫描",
      elIcon: "Monitor"
    },
    children: [
      {
        path: "knowledge-graph",
        component: () => import("@/views/empty-page/index.vue"),
        name: "TechnologyKnowledgeGraph",
        meta: {
          title: "技术图谱构建",
          keepAlive: true
        }
      },
      {
        path: "frontier-mining",
        component: () => import("@/views/empty-page/index.vue"),
        name: "FrontierTechnologyMining",
        meta: {
          title: "前沿技术挖掘",
          keepAlive: true
        }
      },
      {
        path: "hotspot-analysis",
        component: () => import("@/views/empty-page/index.vue"),
        name: "TechnologyHotspotAnalysis",
        meta: {
          title: "技术热点分析",
          keepAlive: true
        }
      },
      {
        path: "trend-prediction",
        component: () => import("@/views/empty-page/index.vue"),
        name: "TechnologyTrendPrediction",
        meta: {
          title: "技术趋势预判",
          keepAlive: true
        }
      }
    ]
  }
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const dynamicRoutes: RouteRecordRaw[] = []

export const router = createRouter({
  history,
  routes: routeSettings.thirdLevelRouteCache ? flatMultiLevelRoutes(constantRoutes) : constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}
