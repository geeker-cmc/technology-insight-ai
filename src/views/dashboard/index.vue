<script lang="ts" setup>
defineOptions({ name: "Dashboard" })
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { Search } from "@element-plus/icons-vue"
import { getHotAffiliationByFieldApi, queryNewsManageApi } from "@/api/insight"
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
    icon: "📍",
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
    path: ""
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

    const newsResult = await queryNewsManageApi({ startDate, endDate })
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
      <div class="flex w-600px mb-30px">
        <el-input v-model="searchValue" placeholder="搜索资源库内容" size="large" @keyup.enter="handleSearch">
          <template #append>
            <el-button type="primary" :icon="Search" @click="handleSearch" />
          </template>
        </el-input>
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
    <div class="grid grid-cols-3 gap-20px mt-20px max-w-1400px mx-auto">
      <div
        v-for="(module, index) in modules"
        :key="index"
        class="bg-white rounded-8px p-30px cursor-pointer transition-shadow hover:shadow-lg"
        @click="handleModuleClick(module)"
      >
        <div class="text-40px mb-20px">{{ module.icon }}</div>
        <h3 class="text-18px font-600 mb-10px">{{ module.title }}</h3>
        <p class="text-14px text-#666 mb-20px">{{ module.description }}</p>
        <div class="flex items-center justify-end">
          <span class="text-#409eff text-14px">进入 →</span>
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
