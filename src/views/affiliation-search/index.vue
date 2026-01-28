<template>
  <div class="w-full h-full overflow-auto bg-#f5f5f5 p-20px">
    <!-- 搜索区域 -->
    <div class="flex flex-col items-center pt-40px pb-30px bg-white rounded-8px mb-20px">
      <div class="mb-20px text-center">
        <h1 class="text-24px font-600 text-#303133 mb-8px">机构搜索</h1>
        <p class="text-14px text-#909399">基于大数据分析的机构智能搜索系统</p>
      </div>
      <div class="relative w-full max-w-720px group">
        <!-- 搜索图标 -->
        <div
          class="absolute left-24px top-1/2 -translate-y-1/2 text-22px text-gray-400 group-focus-within:text-[#409eff] transition-colors duration-300 z-10 pointer-events-none flex items-center"
        >
          <el-icon><Search /></el-icon>
        </div>

        <input
          v-model="searchKeyword"
          placeholder="输入技术短语搜索机构..."
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
    </div>

    <!-- 搜索结果区域 -->
    <div class="bg-white rounded-8px p-24px" v-loading="refreshing">
      <div v-if="searchKeyword" class="mb-20px">
        <span class="text-14px text-#909399">搜索结果：</span>
        <span class="text-16px font-600">{{ searchKeyword }}</span>
        <span v-if="total > 0" class="text-14px text-#909399 ml-16px">共 {{ total }} 条结果</span>
      </div>

      <!-- 机构列表 -->
      <div v-if="affiliationList.length > 0" class="space-y-16px">
        <div
          v-for="affiliation in affiliationList"
          :key="affiliation.id"
          class="pb-16px cursor-pointer p-12px rounded-6px border-b border-#dcdfe6 last:border-b-0"
          @click="handleAffiliationClick(affiliation)"
        >
          <!-- 机构基本信息 -->
          <div class="flex items-start gap-12px">
            <!-- Logo -->
            <div
              class="w-60px h-60px bg-#f0f2f5 rounded-4px flex items-center justify-center flex-shrink-0 overflow-hidden"
            >
              <img
                v-if="affiliation.logo"
                :src="affiliation.logo"
                :alt="affiliation.name"
                class="w-full h-full object-cover"
              />
              <el-icon v-else size="24" color="#C0C4CC">
                <OfficeBuilding />
              </el-icon>
            </div>

            <div class="flex-1 min-w-0">
              <!-- 名称和城市 -->
              <div class="flex items-center gap-8px mb-4px">
                <h3 class="text-16px font-600 text-#303133">{{ affiliation.name }}</h3>
                <span v-if="affiliation.regCity" class="city-tag">{{ affiliation.regCity }}</span>
              </div>

              <!-- 成立时间和注册地址 -->
              <div class="flex items-center justify-between mb-8px">
                <div v-if="affiliation.establishmentTime">
                  <span class="text-14px text-#909399 mr-8px">成立时间：</span>
                  <span class="text-14px text-#606266">{{ affiliation.establishmentTime }}</span>
                </div>
                <div v-if="affiliation.regLocation">
                  <span class="text-14px text-#909399 mr-8px">注册地址：</span>
                  <span class="text-14px text-#303133">{{ affiliation.regLocation || "暂无" }}</span>
                </div>
              </div>

              <!-- 标签组 -->
              <div class="flex flex-wrap gap-6px overflow-hidden">
                <!-- 行业标签 -->
                <el-tag
                  v-for="tag in affiliation.industryTags?.slice(0, 3) || []"
                  :key="'industry-' + tag"
                  type="primary"
                  size="small"
                  class="tag-padding"
                >
                  {{ tag }}
                </el-tag>
                <!-- 技术标签 -->
                <el-tag
                  v-for="tag in affiliation.technologyLabelTags?.slice(0, 3) || []"
                  :key="'tech-' + tag"
                  type="success"
                  size="small"
                  class="tag-padding"
                >
                  {{ tag }}
                </el-tag>
                <!-- 获奖标签 -->
                <el-tag
                  v-for="tag in affiliation.awardTags?.slice(0, 3) || []"
                  :key="'award-' + tag"
                  type="warning"
                  size="small"
                  class="tag-padding"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </div>
          </div>
        </div>

        <!-- 加载更多 -->
        <div v-if="hasMore" class="text-center py-20px">
          <el-button v-if="!increasing" @click="loadMore">加载更多</el-button>
          <div v-else class="flex items-center justify-center gap-8px text-#909399">
            <el-icon class="animate-spin"><Loading /></el-icon>
            <span>加载中...</span>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="text-center py-60px">
        <el-empty description="暂无机构信息" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue"
import { useRouter } from "vue-router"
import { Search, OfficeBuilding, Loading } from "@element-plus/icons-vue"
import { queryAffiliationListApi } from "@/api/insight"
import type { AffiliationItem, AffiliationQueryParams } from "@/api/insight/types"
import usePaginationSearch from "@/hooks/usePaginationSearch"

defineOptions({ name: "AffiliationSearch" })

const router = useRouter()

// 搜索相关
const searchKeyword = ref("人工智能")

// 使用分页 hook
const {
  data: affiliationList,
  total,
  loading: _loading,
  refreshing,
  increasing,
  hasMore,
  noData: _noData,
  setParam,
  setRefreshing,
  setIncreasing
} = usePaginationSearch<AffiliationItem, AffiliationQueryParams>(queryAffiliationListApi as any, {
  page: 1,
  pageSize: 20,
  keyword: "人工智能"
})

// 搜索处理
const handleSearch = async () => {
  // 更新参数并触发刷新
  setParam({
    page: 1,
    pageSize: 20,
    keyword: searchKeyword.value || ""
  })

  // 等待 DOM 更新后重置滚动位置到顶部
  await nextTick()
  const scrollContainer = document.querySelector(".w-full.h-full.overflow-auto") as HTMLElement
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

// 点击机构详情
const handleAffiliationClick = (affiliation: AffiliationItem) => {
  // 跳转到iframe-view页面，传递机构详情URL
  const url = `http://lan.raycoding.com/company/${affiliation.id}`
  router.push({
    path: "/iframe-view",
    query: { url: url }
  })
}

// 滚动加载
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

onMounted(() => {
  // 添加滚动监听
  scrollContainer = document.querySelector(".w-full.h-full.overflow-auto") as HTMLElement
  if (scrollContainer) {
    scrollContainer.addEventListener("scroll", handleScroll)
  }

  // 页面加载时自动搜索
  handleSearch()
})

onUnmounted(() => {
  if (scrollContainer) {
    scrollContainer.removeEventListener("scroll", handleScroll)
  }
})
</script>

<style scoped>
/* 动画效果 */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 标签内边距样式 */
.tag-padding {
  padding: 4px 8px !important;
}

/* 城市标签样式 */
.city-tag {
  display: inline-block;
  height: 20px;
  padding: 0 4px;
  background-color: #ffffff;
  color: #409eff;
  font-size: 12px;
  border: 1px solid #409eff;
  border-radius: 4px;
  font-weight: normal;
  line-height: 20px;
}
</style>
