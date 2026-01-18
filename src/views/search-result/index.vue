<script lang="ts" setup>
defineOptions({ name: "SearchResult" })
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue"
import { useRoute } from "vue-router"
import { Search } from "@element-plus/icons-vue"
import { queryTechApi } from "@/api/insight"
import type { SearchResultItem, QueryTechParams } from "@/api/insight/types"
import usePaginationSearch from "@/hooks/usePaginationSearch"

const route = useRoute()
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
  const url = `http://landinn--front--prod.webvpn.landinn.com/tech?name=${encodeURIComponent(item.name)}&id=${item.id}`
  window.open(url, "_blank")
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
      <div class="flex w-600px">
        <el-input v-model="searchKeyword" placeholder="搜索资源库内容" size="large" @keyup.enter="() => handleSearch()">
          <template #append>
            <el-button type="primary" :icon="Search" @click="() => handleSearch()" />
          </template>
        </el-input>
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
