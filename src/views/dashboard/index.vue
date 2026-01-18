<script lang="ts" setup>
defineOptions({ name: "Dashboard" })
import { ref, onMounted } from "vue"
import { Search } from "@element-plus/icons-vue"
import { getHotAffiliationByFieldApi } from "@/api/insight"

const searchValue = ref("")

const tabs = ["人工智能", "半导体", "新能源", "微识图谱", "量子计算", "智能制造", "新材料", "航空航天"]

const modules = [
  {
    icon: "📍",
    title: "科技情报图谱",
    description: "全域、关联、精准的技术情报发现"
  },
  {
    icon: "🎯",
    title: "技术布局扫描",
    description: "揭示布局、行业趋势、企业发展研发管理"
  },
  {
    icon: "👁",
    title: "前沿技术预见",
    description: "技术政策趋势对当前政策研判"
  },
  {
    icon: "🛡",
    title: "政策分析",
    description: "政策视觉导向视情报"
  },
  {
    icon: "🗺",
    title: "知识图谱探索",
    description: "交互式组织 X 兴图构"
  },
  {
    icon: "📊",
    title: "智能报告生成",
    description: "AI Agent 生成完整报告"
  }
]

const handleSearch = () => {
  console.log("搜索:", searchValue.value)
}

onMounted(async () => {
  console.log("Dashboard mounted >>>>")
  try {
    const result = await getHotAffiliationByFieldApi("test")
    console.log("热门机构数据:", result)
  } catch (error) {
    console.error("获取热门机构失败:", error)
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
      >
        <div class="text-40px mb-20px">{{ module.icon }}</div>
        <h3 class="text-18px font-600 mb-10px">{{ module.title }}</h3>
        <p class="text-14px text-#666 mb-20px">{{ module.description }}</p>
        <div class="flex items-center justify-end">
          <span class="text-#409eff text-14px">进入 →</span>
        </div>
      </div>
    </div>
  </div>
</template>
