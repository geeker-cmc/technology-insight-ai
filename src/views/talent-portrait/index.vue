<template>
  <div class="w-full h-full overflow-auto bg-#f5f5f5 p-20px">
    <!-- 搜索区域 -->
    <div class="flex flex-col items-center pt-40px pb-30px bg-white rounded-8px mb-20px">
      <div class="mb-20px text-center">
        <h1 class="text-24px font-600 text-#303133 mb-8px">人才画像</h1>
        <p class="text-14px text-#909399">基于大数据分析的人才智能搜索系统</p>
      </div>
      <div class="flex w-600px">
        <el-input v-model="searchKeyword" placeholder="输入技术短语搜索" size="large" @keyup.enter="handleSearch">
          <template #append>
            <el-button type="primary" :icon="Search" @click="handleSearch" />
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

      <!-- 人才列表 -->
      <div v-if="talentList.length > 0" class="space-y-16px">
        <div
          v-for="(talent, index) in talentList"
          :key="talent.id"
          class="pb-16px cursor-pointer p-12px rounded-6px border-b border-#dcdfe6 last:border-b-0"
          @click="handleTalentClick(talent)"
        >
          <!-- 人才基本信息 -->
          <div class="flex items-start gap-12px">
            <!-- 头像 -->
            <div
              class="w-60px h-60px bg-#f0f2f5 rounded-4px flex items-center justify-center flex-shrink-0 overflow-hidden"
            >
              <img
                v-if="talent.headPortrait"
                :src="talent.headPortrait"
                :alt="talent.name"
                class="w-full h-full object-cover"
              />
              <el-icon v-else size="24" color="#C0C4CC">
                <Avatar />
              </el-icon>
            </div>

            <div class="flex-1 min-w-0">
              <!-- 姓名和城市 -->
              <div class="flex items-center gap-8px mb-4px">
                <h3 class="text-16px font-600 text-#303133">{{ talent.name }}</h3>
                <span v-if="talent.city" class="city-tag">{{ talent.city }}</span>
              </div>

              <!-- 职称和所在机构 -->
              <div class="flex items-center justify-between mb-8px">
                <div v-if="talent.professionalTitle">
                  <span class="text-14px text-#909399 mr-8px">职称：</span>
                  <span class="text-14px text-#606266">{{ talent.professionalTitle }}</span>
                </div>
                <div>
                  <span class="text-14px text-#909399 mr-8px">所在机构：</span>
                  <span class="text-14px text-#303133">{{ talent.affiliationName || "暂无" }}</span>
                </div>
              </div>

              <!-- 职称和奖项标签 -->
              <div v-if="talent.titleAndAwardTags?.length" class="flex flex-wrap gap-6px mb-8px overflow-hidden">
                <el-tag
                  v-for="tag in talent.titleAndAwardTags.slice(0, 8)"
                  :key="tag"
                  type="warning"
                  size="small"
                  class="tag-padding"
                >
                  {{ tag }}
                </el-tag>
                <span
                  v-if="talent.titleAndAwardTags.length > 8"
                  class="text-12px text-#909399 self-center flex-shrink-0"
                >
                  +{{ talent.titleAndAwardTags.length - 8 }}个
                </span>
              </div>

              <!-- 技术标签 -->
              <div
                v-if="talent.technologyLabelTags?.length || talent.majorTags?.length"
                class="flex flex-wrap gap-6px overflow-hidden"
              >
                <!-- 专业标签 -->
                <el-tag
                  v-for="tag in talent.majorTags?.slice(0, 6) || []"
                  :key="'major-' + tag"
                  type="info"
                  size="small"
                  class="tag-padding"
                >
                  {{ tag }}
                </el-tag>
                <!-- 技术标签 -->
                <el-tag
                  v-for="tag in talent.technologyLabelTags?.slice(0, 6) || []"
                  :key="'tech-' + tag"
                  type="success"
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
        <el-empty description="暂无人才信息" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue"
import { useRouter } from "vue-router"
import { Search, Avatar, Loading } from "@element-plus/icons-vue"
import { queryTalentListApi } from "@/api/insight"
import type { TalentItem, TalentQueryParams } from "@/api/insight/types"
import usePaginationSearch from "@/hooks/usePaginationSearch"

const router = useRouter()

// 搜索相关
const searchKeyword = ref("")

// 使用分页 hook
const {
  data: talentList,
  total,
  loading,
  refreshing,
  increasing,
  hasMore,
  noData,
  setParam,
  setRefreshing,
  setIncreasing
} = usePaginationSearch<TalentItem, TalentQueryParams>(queryTalentListApi, {
  page: 1,
  pageSize: 20,
  keyword: ""
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

// 点击人才详情
const handleTalentClick = (talent: TalentItem) => {
  // 跳转到iframe-view页面，传递人才详情URL
  const url = `http://landinn--front--prod.webvpn.landinn.com/scholar/${talent.id}`
  router.push({
    path: "iframe-view",
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
  padding: 4px 8px;
  background-color: #ffffff;
  color: #409eff;
  font-size: 12px;
  border: 1px solid #409eff;
  border-radius: 4px;
  font-weight: normal;
}
</style>
