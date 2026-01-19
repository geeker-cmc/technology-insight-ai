<script lang="ts" setup>
defineOptions({ name: "SearchResult" })
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Search } from "@element-plus/icons-vue"
import { queryTechApi } from "@/api/insight"
import type { SearchResultItem, QueryTechParams } from "@/api/insight/types"
import usePaginationSearch from "@/hooks/usePaginationSearch"

const route = useRoute()
const router = useRouter()
const searchKeyword = ref("")

// 使用分页 hook
const {
  data: searchResults,
  total,
  loading,
  refreshing,
  increasing,
  hasMore,
  noData,
  setParam,
  setRefreshing,
  setIncreasing
} = usePaginationSearch<SearchResultItem, QueryTechParams>(queryTechApi, {
  keyword: ""
})

// 处理搜索
const handleSearch = async () => {
  if (!searchKeyword.value.trim()) return

  // 更新参数并触发刷新
  setParam({ keyword: searchKeyword.value })

  // 等待 DOM 更新后重置滚动位置到顶部
  await nextTick()
  if (scrollContainer) {
    scrollContainer.scrollTop = 0
  }

  setRefreshing(true)
}

// 加载更多
const loadMore = () => {
  if (!hasMore.value || increasing.value || refreshing.value) {
    return
  }
  setIncreasing(true)
}

const handleItemClick = (item: SearchResultItem) => {
  const url = `http://lan.raycoding.com/tech?name=${encodeURIComponent(item.name)}&id=${item.id}`
  // window.open(url, "_blank")
  router.push({
    path: "/iframe-view",
    query: {
      url: url
    }
  })
}

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement
  const scrollHeight = target.scrollHeight
  const scrollTop = target.scrollTop
  const clientHeight = target.clientHeight

  // 滚动到底部前100px时加载更多
  if (scrollHeight - scrollTop - clientHeight < 100) {
    loadMore()
  }
}

let scrollContainer: HTMLElement | null = null

// 监听路由查询参数变化，接收外部传入的keyword
watch(
  () => route.query.keyword,
  (newKeyword) => {
    if (newKeyword && newKeyword !== searchKeyword.value) {
      searchKeyword.value = newKeyword as string
      handleSearch()
    }
  }
)

onMounted(() => {
  // 从路由查询参数获取搜索关键词
  searchKeyword.value = (route.query.keyword as string) || ""
  if (searchKeyword.value) {
    handleSearch()
  }

  // 添加滚动监听
  scrollContainer = document.querySelector(".w-full.h-full.overflow-auto") as HTMLElement
  if (scrollContainer) {
    scrollContainer.addEventListener("scroll", handleScroll)
  }
})

onUnmounted(() => {
  if (scrollContainer) {
    scrollContainer.removeEventListener("scroll", handleScroll)
  }
})
</script>

<template>
  <div class="w-full h-full overflow-auto bg-#f5f5f5 p-20px">
    <!-- 搜索区域 -->
    <div class="flex flex-col items-center pt-40px pb-30px bg-white rounded-8px mb-20px">
      <div class="relative w-full max-w-720px group">
        <!-- 搜索图标 -->
        <div
          class="absolute left-24px top-1/2 -translate-y-1/2 text-22px text-gray-400 group-focus-within:text-[#409eff] transition-colors duration-300 z-10 pointer-events-none flex items-center"
        >
          <el-icon><Search /></el-icon>
        </div>

        <input
          v-model="searchKeyword"
          placeholder="搜索您感兴趣的科技情报、人才、政策..."
          class="w-full h-68px pl-64px pr-120px bg-white border-2 border-transparent rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.06)] text-17px text-gray-700 outline-none transition-all duration-300 placeholder:text-gray-400 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] focus:shadow-[0_16px_48px_rgba(64,158,255,0.15)] focus:border-[#409eff]/20"
          @keyup.enter="() => handleSearch()"
        />

        <!-- 按钮 -->
        <button
          class="absolute right-8px top-8px bottom-8px px-32px bg-[#409eff] text-white text-16px font-600 rounded-full transition-all duration-300 hover:bg-[#66b1ff] hover:shadow-[0_4px_12px_rgba(64,158,255,0.4)] hover:-translate-y-1px active:scale-95 active:translate-y-0 flex items-center justify-center cursor-pointer border-none tracking-wide"
          @click="() => handleSearch()"
        >
          搜索
        </button>
      </div>
    </div>

    <!-- 搜索结果区域 -->
    <div class="bg-white rounded-8px p-24px" v-loading="refreshing">
      <div v-if="searchKeyword" class="mb-20px">
        <span class="text-14px text-#909399">搜索结果：</span>
        <span class="text-16px font-600">{{ searchKeyword }}</span>
        <span v-if="total > 0" class="text-14px text-#909399 ml-16px">共 {{ total }} 条结果</span>
      </div>

      <!-- 结果列表 -->
      <div v-if="searchResults.length > 0" class="space-y-20px">
        <div
          v-for="item in searchResults"
          :key="item.id"
          class="border-b border-#e4e7ed pb-20px last:border-none cursor-pointer hover:bg-#f5f7fa p-12px rounded-6px transition-colors"
          @click="handleItemClick(item)"
        >
          <h3 class="text-18px font-600 text-#303133 mb-12px">{{ item.name }}</h3>

          <div
            v-if="item.descriptionHighlight"
            class="text-14px text-#606266 line-height-24px mb-12px"
            v-html="item.descriptionHighlight"
          />

          <div class="flex items-center gap-24px text-13px text-#909399">
            <span v-if="item.paperCount !== undefined">
              论文: <span class="text-#409eff font-600">{{ item.paperCount }}</span>
            </span>
            <span v-if="item.patentCount !== undefined">
              专利: <span class="text-#409eff font-600">{{ item.patentCount }}</span>
            </span>
            <span v-if="item.projectCount !== undefined">
              项目: <span class="text-#409eff font-600">{{ item.projectCount }}</span>
            </span>
          </div>
        </div>
      </div>

      <el-empty v-else-if="!refreshing && searchKeyword" description="暂无搜索结果" />
    </div>
  </div>
</template>

<style scoped>
/* 高亮样式 */
:deep(em) {
  color: #409eff;
  font-style: normal;
  font-weight: 600;
}
</style>
