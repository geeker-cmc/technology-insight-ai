<script lang="ts" setup>
defineOptions({ name: "PolicyAnalysis" })
import { ref, onMounted, onUnmounted } from "vue"
import { Loading } from "@element-plus/icons-vue"
import { queryPolicyListApi } from "@/api/insight"
import type { PolicyItem, PolicyQueryParams } from "@/api/insight/types"
import usePolicyPagination from "@/hooks/usePolicyPagination"

// 使用分页 hook
const {
  data: policyList,
  total,
  loading,
  refreshing,
  increasing,
  hasMore,
  noData,
  setParam,
  setRefreshing,
  setIncreasing
} = usePolicyPagination<PolicyItem, PolicyQueryParams>(queryPolicyListApi, {})

// 格式化日期，只显示年月日
const formatDate = (dateStr: string) => {
  if (!dateStr) return ""
  // 从 "2025-12-31 14:00:00" 中提取 "2025-12-31"
  return dateStr.split(" ")[0]
}
// 科技领域分类
const categories = ["太空算力", "量子信息", "核聚变", "脑机接口", "光伏"]

const selectedCategory = ref<string>("太空算力")

// 处理分类选择
const handleCategoryChange = (category: string) => {
  if (selectedCategory.value === category) {
    // 如果点击的是已选中的，则取消选择
    selectedCategory.value = ""
  } else {
    selectedCategory.value = category
  }

  // 重新获取数据
  setParam({ category: selectedCategory.value || undefined })
  setRefreshing(true)
}
// 加载更多
const loadMore = () => {
  console.log("loadMore called", { hasMore: hasMore.value, increasing: increasing.value, refreshing: refreshing.value })
  if (!hasMore.value || increasing.value || refreshing.value) {
    return
  }
  setIncreasing(true)
}

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement
  const scrollHeight = target.scrollHeight
  const scrollTop = target.scrollTop
  const clientHeight = target.clientHeight

  const distanceToBottom = scrollHeight - scrollTop - clientHeight

  console.log("scroll event", { scrollHeight, scrollTop, clientHeight, distanceToBottom })

  // 滚动到底部前100px时加载更多
  if (distanceToBottom < 100 && distanceToBottom >= 0) {
    console.log("触发加载更多")
    loadMore()
  }
}

let scrollContainer: HTMLElement | null = null

onMounted(() => {
  // 设置默认分类并触发初始加载
  setParam({ category: selectedCategory.value })
  setRefreshing(true)

  // 延迟添加滚动监听，确保DOM已渲染
  setTimeout(() => {
    scrollContainer = document.querySelector(".policy-scroll-container") as HTMLElement
    if (scrollContainer) {
      console.log("找到滚动容器", scrollContainer)
      scrollContainer.addEventListener("scroll", handleScroll, { passive: true })
    } else {
      console.error("未找到滚动容器 .policy-scroll-container")
    }
  }, 100)
})

onUnmounted(() => {
  if (scrollContainer) {
    scrollContainer.removeEventListener("scroll", handleScroll)
  }
})
</script>

<template>
  <div class="policy-scroll-container w-full h-full overflow-auto bg-#f5f5f5 p-20px">
    <div class="max-w-1400px mx-auto">
      <!-- 分类选择区域 -->
      <div class="bg-white rounded-8px p-20px mb-20px">
        <div class="flex items-center gap-20px">
          <div class="text-16px font-500 text-#303133">科技领域</div>
          <div class="flex gap-8px">
            <div
              v-for="category in categories"
              :key="category"
              :class="[
                'px-16px py-8px rounded-6px text-14px cursor-pointer transition-all',
                selectedCategory === category ? 'bg-#409eff text-white' : 'bg-#f5f7fa text-#606266'
              ]"
              @click="handleCategoryChange(category)"
            >
              {{ category }}
            </div>
          </div>
        </div>
      </div>

      <!-- 政策内容区域 -->
      <div class="bg-white rounded-8px p-24px min-h-500px" v-loading="refreshing">
        <div v-if="total > 0" class="mb-20px">
          <span class="text-14px text-#909399">共 {{ total }} 条政策</span>
        </div>

        <div v-if="policyList.length > 0" class="space-y-20px">
          <div
            v-for="item in policyList"
            :key="item.createTime + item.title"
            class="group p-20px border border-#e4e7ed rounded-8px hover:border-#409eff hover:shadow-sm transition-all cursor-pointer"
          >
            <!-- 标题 -->
            <h3 class="text-18px font-600 text-#303133 mb-12px">
              {{ item.title }}
            </h3>

            <!-- 摘要 -->
            <p class="text-14px text-#606266 line-height-24px mb-16px line-clamp-2" v-html="item.textDigest" />

            <!-- 底部信息：发布部门 + 发布时间 -->
            <div class="flex items-center flex-wrap gap-24px text-13px text-#909399">
              <div class="flex items-center">
                <span class="i-ep-office-building mr-4px" />
                <span>发布部门：{{ item.departmentName }}</span>
              </div>
              <div class="flex items-center">
                <span class="i-ep-calendar mr-4px" />
                <span>发布时间：{{ formatDate(item.releaseTime) }}</span>
              </div>
            </div>
          </div>

          <!-- 加载更多提示 -->
          <div v-if="increasing" class="text-center py-20px">
            <el-icon class="is-loading mr-8px"><Loading /></el-icon>
            <span class="text-14px text-#909399">加载更多...</span>
          </div>

          <div v-else-if="!hasMore" class="text-center py-20px text-14px text-#909399">已加载全部政策</div>
        </div>

        <!-- 空状态 -->
        <el-empty v-else-if="!refreshing" description="暂无政策分析数据" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
