<script lang="ts" setup>
defineOptions({ name: "Dashboard" })
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { Search } from "@element-plus/icons-vue"
import { queryNewsManageApi } from "@/api/insight"
import type { NewsItem } from "@/api/insight/types"

const router = useRouter()
const searchValue = ref("")
const newsList = ref<NewsItem[]>([])

// 日期格式化：只显示年月日
const formatDate = (dateStr: string) => {
  if (!dateStr) return ""
  return dateStr.split(" ")[0]
}

// 跳转到新闻链接
const handleNewsClick = (url: string) => {
  if (url) {
    window.open(url, "_blank")
  }
}

const tabs = ["人工智能", "半导体", "新能源", "微识图谱", "量子计算", "智能制造", "新材料", "航空航天"]

const modules = [
  {
    icon: "🛰️",
    title: "科技情报跟踪",
    description: "全域、实时、精准的技术情报发现",
    path: "/tech-info-tracking"
  },
  {
    icon: "🎯",
    title: "技术布局扫描",
    description: "国家布局、行业趋势、企业实践的技术传到链路",
    path: "/search-result"
  },
  {
    icon: "👁",
    title: "前沿技术预见",
    description: "技术成熟度预测与战略研判",
    path: "/advanced-tech-foresight"
  },
  {
    icon: "🛡",
    title: "政策分析",
    description: "政策解读与影响评估",
    path: "/policy-analysis"
  },
  {
    icon: "🗺",
    title: "知识图谱探索",
    description: "交互式四链关系图谱",
    path: ""
  },
  {
    icon: "📊",
    title: "智能报告生成",
    description: "AI Agent生成完整报告",
    path: "http://research.lin.iol8.cn/dashboard"
  }
]

const handleSearch = () => {
  if (searchValue.value.trim()) {
    router.push({
      path: "/search-result",
      query: {
        keyword: searchValue.value
      }
    })
  }
}

const handleTabClick = (tab: string) => {
  router.push({
    path: "/search-result",
    query: {
      keyword: tab
    }
  })
}

const handleModuleClick = (module: any) => {
  if (module.path) {
    // 如果是外部链接，在新标签页打开
    if (module.path.startsWith("http://") || module.path.startsWith("https://")) {
      window.open(module.path, "_blank")
    } else {
      // 内部路由跳转
      router.push(module.path)
    }
  }
}

onMounted(async () => {
  console.log("Dashboard mounted >>>>")
  try {
    // 查询最近三天的新闻
    const now = new Date()
    const endDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} 23:59:59`

    const startDateTime = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
    const startDate = `${startDateTime.getFullYear()}-${String(startDateTime.getMonth() + 1).padStart(2, "0")}-${String(startDateTime.getDate()).padStart(2, "0")} 00:00:00`

    const newsResult = await queryNewsManageApi({ startDate, endDate, status: "1" })
    console.log("最近三天新闻数据:", newsResult)

    // 保存前10条数据
    if (newsResult.data) {
      newsList.value = newsResult.data.slice(0, 10)
    }
  } catch (error) {
    console.error("获取数据失败:", error)
  }
})
</script>

<template>
  <div class="relative w-full h-full overflow-auto p-20px bg-#f5f5f5">
    <!-- 顶部搜索区域 -->
    <div class="flex flex-col items-center pt-60px pb-40px bg-white">
      <h2 class="text-16px text-#666 mb-30px">整合全球科技、产业、技术、企业及人才数据，为决策提供专业支持</h2>

      <!-- 搜索框 -->
      <div class="relative w-full max-w-720px mb-48px group">
        <!-- 搜索图标 -->
        <div
          class="absolute left-24px top-1/2 -translate-y-1/2 text-22px text-gray-400 group-focus-within:text-[#409eff] transition-colors duration-300 z-10 pointer-events-none flex items-center"
        >
          <el-icon><Search /></el-icon>
        </div>

        <input
          v-model="searchValue"
          placeholder="搜索您感兴趣的科技情报、人才、政策..."
          class="w-full h-68px pl-64px pr-120px bg-white border-2 border-transparent rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.06)] text-17px text-gray-700 outline-none transition-all duration-300 placeholder:text-gray-400 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] focus:shadow-[0_16px_48px_rgba(64,158,255,0.15)] focus:border-[#409eff]/20"
          @keyup.enter="handleSearch"
        />

        <!-- 按钮 -->
        <button
          class="absolute right-8px top-8px bottom-8px px-32px bg-[#409eff] text-white text-16px font-600 rounded-full transition-all duration-300 hover:bg-[#66b1ff] hover:shadow-[0_4px_12px_rgba(64,158,255,0.4)] hover:-translate-y-1px active:scale-95 active:translate-y-0 flex items-center justify-center cursor-pointer border-none tracking-wide"
          @click="handleSearch"
        >
          搜索
        </button>
      </div>

      <!-- 标签切换 -->
      <div class="flex gap-12px text-14px">
        <button
          v-for="tab in tabs"
          :key="tab"
          class="px-20px py-8px rounded-4px cursor-pointer transition-all border-none bg-#f0f2f5 text-#666 hover:bg-#e6f4ff hover:text-#409eff"
          @click="handleTabClick(tab)"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <!-- 模块卡片区域 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24px mt-32px max-w-1400px mx-auto">
      <div
        v-for="(module, index) in modules"
        :key="index"
        class="group relative bg-white rounded-24px p-24px cursor-pointer transition-all duration-300 ease-out border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-4px overflow-hidden"
        @click="handleModuleClick(module)"
      >
        <!-- 悬浮光晕 -->
        <div
          class="absolute -right-20px -top-20px w-120px h-120px bg-gradient-to-br from-[#ecf5ff] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
        />

        <div class="relative z-10 flex flex-col h-full">
          <!-- 头部：图标和箭头 -->
          <div class="flex items-start justify-between mb-24px">
            <div
              class="w-56px h-56px rounded-16px bg-gray-50 flex items-center justify-center text-32px group-hover:bg-[#ecf5ff] group-hover:scale-110 transition-all duration-300 ease-out"
            >
              {{ module.icon }}
            </div>

            <div
              class="w-32px h-32px flex items-center justify-center text-gray-300 group-hover:text-[#409eff] group-hover:translate-x-4px transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </div>

          <!-- 内容 -->
          <h3
            class="text-18px font-700 text-gray-900 mb-8px tracking-tight group-hover:text-[#409eff] transition-colors duration-300"
          >
            {{ module.title }}
          </h3>
          <p class="text-14px text-gray-500 leading-relaxed font-400 min-h-44px">
            {{ module.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- 最新动态模块 -->
    <div class="mt-30px max-w-1400px mx-auto bg-white rounded-8px p-24px">
      <h3 class="text-20px font-600 mb-20px">最新动态</h3>
      <div>
        <div
          v-for="news in newsList"
          :key="news.id"
          class="p-16px border-b border-#dcdfe6 last:border-none cursor-pointer hover:bg-#f5f7fa transition-colors"
          @click="handleNewsClick(news.newsUrl)"
        >
          <!-- 第一行：标题 + 类型标签 -->
          <div class="flex items-center gap-8px mb-8px">
            <div class="text-16px font-600 text-#303133">{{ news.newsTitle }}</div>
            <el-tag v-if="news.type" size="small" type="primary">{{ news.type }}</el-tag>
          </div>

          <!-- 第二行：摘要（省略） -->
          <p class="text-14px text-#606266 line-height-22px mb-8px line-clamp-2">{{ news.summary }}</p>

          <!-- 第三行：来源 + 日期 -->
          <div class="flex items-center text-13px text-#909399">
            <span>{{ news.newsSource }}</span>
            <span class="mx-8px">•</span>
            <span>{{ formatDate(news.newsDate) }}</span>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <el-empty v-if="newsList.length === 0" description="暂无最新动态" />
    </div>
  </div>
</template>
