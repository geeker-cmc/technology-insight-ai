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
    redirect: "/industry-mining/chain-construction",
    meta: {
      title: "产业挖掘",
      elIcon: "DataAnalysis"
    },
    children: [
      {
        path: "chain-construction",
        component: () => import("@/views/empty-page/index.vue"),
        name: "IndustryChainConstruction",
        meta: {
          title: "产业链构建",
          keepAlive: true
        }
      },
      {
        path: "strategic-analysis",
        component: () => import("@/views/empty-page/index.vue"),
        name: "IndustryStrategicAnalysis",
        meta: {
          title: "产业链强弱分析",
          keepAlive: true
        }
      },
      {
        path: "trend-analysis",
        component: () => import("@/views/empty-page/index.vue"),
        name: "IndustryTrendAnalysis",
        meta: {
          title: "产业趋势分析",
          keepAlive: true
        }
      },
      {
        path: "regional-analysis",
        component: () => import("@/views/empty-page/index.vue"),
        name: "RegionalIndustryAnalysis",
        meta: {
          title: "区域产业分析",
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
