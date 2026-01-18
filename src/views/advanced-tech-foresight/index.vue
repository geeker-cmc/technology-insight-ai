<script lang="ts" setup>
defineOptions({ name: "AdvancedTechForesight" })
import { ref, onMounted } from "vue"
import { getTechNewsListApi } from "@/api/insight"
import type { HotNews } from "@/api/insight/types"

interface TechCard {
  id: string
  icon: string
  title: string
  stats: {
    news: number
  }
  newsList: HotNews[]
  updateTime: string
}

const techCards = ref<TechCard[]>([
  {
    id: "1541748009833005100",
    icon: "🤖",
    title: "生成式人工智能",
    stats: { news: 0 },
    newsList: [],
    updateTime: ""
  },
  {
    id: "1390457510783287328",
    icon: "⚛️",
    title: "量子计算",
    stats: { news: 0 },
    newsList: [],
    updateTime: ""
  },
  {
    id: "1394190703344682155",
    icon: "💻",
    title: "半导体制造",
    stats: { news: 0 },
    newsList: [],
    updateTime: ""
  }
])

/** 获取技术新闻数据 */
const fetchTechNews = async (card: TechCard) => {
  try {
    const response = await getTechNewsListApi({
      id: card.id,
      page: 1,
      pageSize: 5
    })
    if (response.data && response.data.records) {
      card.newsList = response.data.records
      card.stats.news = response.data.total || 0
      card.updateTime = new Date().toLocaleString("zh-CN")
    }
  } catch (error) {
    console.error(`获取${card.title}新闻失败:`, error)
  }
}

/** 处理新闻点击 */
const handleNewsClick = (event: Event, news: HotNews) => {
  event.stopPropagation() // 阻止事件冒泡
  if (news.url) {
    window.open(news.url, "_blank")
  }
}

/** 处理卡片点击，跳转到技术详情页 */
const handleCardClick = (card: TechCard) => {
  const url = `http://landinn--front--prod.webvpn.landinn.com/tech?name=${encodeURIComponent(card.title)}&id=${card.id}`
  window.open(url, "_blank")
}

onMounted(async () => {
  // 并行获取所有卡片数据
  await Promise.all(techCards.value.map((card) => fetchTechNews(card)))
})
</script>

<template>
  <div class="w-full h-full overflow-auto bg-#f5f5f5 p-20px">
    <!-- 卡片网格 -->
    <div class="grid grid-cols-3 gap-20px">
      <div
        v-for="card in techCards"
        :key="card.id"
        class="bg-white rounded-8px p-20px flex flex-col cursor-pointer"
        :class="{ 'border-2 border-#409eff': card.id === techCards[0].id }"
        @click="handleCardClick(card)"
      >
        <!-- 卡片头部 -->
        <div class="flex items-center gap-12px mb-20px">
          <span class="text-32px">{{ card.icon }}</span>
          <h3 class="text-18px font-600">{{ card.title }}</h3>
        </div>

        <!-- 新闻资讯列表 -->
        <div class="flex-1 space-y-12px mb-20px">
          <div
            v-for="news in card.newsList"
            :key="news.id"
            class="cursor-pointer hover:bg-#f5f7fa p-8px rounded-4px transition-colors"
            @click="handleNewsClick($event, news)"
          >
            <p class="text-13px font-600 text-#303133 line-height-20px mb-6px truncate">{{ news.title }}</p>
            <p v-if="news.content" class="text-12px text-#606266 line-height-18px mb-8px line-clamp-2">
              {{ news.content }}
            </p>
            <div class="flex items-center gap-12px text-11px text-#909399">
              <span class="text-#409eff">{{ news.sourceName }}</span>
              <span>{{ news.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
