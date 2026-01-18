<script lang="ts" setup>
defineOptions({ name: "TechInfoTracking" })
import { ref, watch, onMounted, computed } from "vue"
import {
  getTechnologyHotTagListApi,
  getHotTechnologyByFieldApi,
  getHotNewsByFieldApi,
  getHotScholarByFieldApi,
  getHotAffiliationByFieldApi
} from "@/api/insight"
import type { TechnologyHotTag, HotTechnology, HotNews, HotScholar, HotAffiliation } from "@/api/insight/types"

const selectedTech = ref("")
const techOptions = ref<TechnologyHotTag[]>([])
const hotTechs = ref<HotTechnology[]>([])
const newsData = ref<HotNews[]>([])
const talentData = ref<HotScholar[]>([])
const orgData = ref<HotAffiliation[]>([])

/** 获取当前选中技术的名称 */
const selectedTechName = computed(() => {
  const tech = techOptions.value.find((item) => item.id === selectedTech.value)
  return tech?.name || ""
})

const hotTechsData = [
  "GPT",
  "生成式人工智能",
  "边缘计算",
  "特征提取",
  "入侵识别",
  "知识图谱",
  "图像分割",
  "异常检测",
  "MuZero",
  "下一代VR/AR实时全息近眼显示...",
  "计算机视觉",
  "自然语言处理",
  "传感器",
  "人形机器人",
  "自然语言理解",
  "脉冲神经网络",
  "量子芯片",
  "伺服驱动器",
  "谐波减速器",
  "压力传感器"
]

/** 获取技术分类列表 */
const fetchTechOptions = async () => {
  try {
    const response = await getTechnologyHotTagListApi()
    if (response.data && Array.isArray(response.data)) {
      techOptions.value = response.data
      // 默认选中第一个
      if (techOptions.value.length > 0) {
        selectedTech.value = techOptions.value[0].id as string
      }
    }
  } catch (error) {
    console.error("获取技术分类失败:", error)
  }
}

/** 获取热门技术列表 */
const fetchHotTechs = async (fieldName: string) => {
  if (!fieldName) return
  try {
    const response = await getHotTechnologyByFieldApi(fieldName)
    if (response.data && Array.isArray(response.data)) {
      hotTechs.value = response.data
    }
  } catch (error) {
    console.error("获取热门技术失败:", error)
  }
}

/** 获取资讯列表 */
const fetchHotNews = async (keywords: string[]) => {
  if (!keywords || keywords.length === 0) return
  try {
    const response = await getHotNewsByFieldApi(keywords)
    if (response.data && Array.isArray(response.data)) {
      newsData.value = response.data
    }
  } catch (error) {
    console.error("获取资讯失败:", error)
  }
}

/** 获取热门学者列表 */
const fetchHotScholars = async (fieldName: string) => {
  if (!fieldName) return
  try {
    const response = await getHotScholarByFieldApi(fieldName)
    if (response.data && Array.isArray(response.data)) {
      talentData.value = response.data
    }
  } catch (error) {
    console.error("获取热门学者失败:", error)
  }
}

/** 获取热门机构列表 */
const fetchHotAffiliations = async (fieldName: string) => {
  if (!fieldName) return
  try {
    const response = await getHotAffiliationByFieldApi(fieldName)
    if (response.data && Array.isArray(response.data)) {
      orgData.value = response.data
    }
  } catch (error) {
    console.error("获取热门机构失败:", error)
  }
}

/** 处理资讯点击，新标签页打开 */
const handleNewsClick = (news: HotNews) => {
  if (news.url) {
    window.open(news.url, "_blank")
  }
}

/** 处理人才点击，跳转到学者详情页 */
const handleScholarClick = (scholar: HotScholar) => {
  if (scholar.id) {
    const url = `http://landinn--front--prod.webvpn.landinn.com/scholar/${scholar.id}`
    window.open(url, "_blank")
  }
}

/** 处理热门技术点击，跳转到技术详情页 */
const handleTechClick = (tech: HotTechnology) => {
  if (tech.id && tech.name) {
    const url = `http://landinn--front--prod.webvpn.landinn.com/tech?name=${encodeURIComponent(tech.name)}&id=${tech.id}`
    window.open(url, "_blank")
  }
}

/** 监听选中技术变化 */
watch(selectedTechName, (newName) => {
  if (newName) {
    fetchHotTechs(newName)
    fetchHotScholars(newName)
    fetchHotAffiliations(newName)
  }
})

/** 监听热门技术变化，获取资讯 */
watch(hotTechs, (techs) => {
  if (techs && techs.length > 0) {
    const keywords = techs.map((t) => t.name)
    fetchHotNews(keywords)
  }
})

onMounted(async () => {
  console.log("科技情报跟踪页 mounted")
  await fetchTechOptions()
})
</script>

<template>
  <div class="w-full h-full overflow-auto bg-#f5f5f5 p-20px">
    <!-- 顶部技术推荐 -->
    <div class="bg-white rounded-8px p-30px mb-20px">
      <div class="flex items-center gap-16px mb-24px">
        <span class="text-18px font-600 whitespace-nowrap">技术推荐</span>
        <el-select v-model="selectedTech" placeholder="请选择技术" size="default" style="width: 120px">
          <el-option v-for="tech in techOptions" :key="tech.id" :label="tech.name" :value="tech.id" />
        </el-select>
      </div>

      <!-- 热门技术标签 -->
      <div class="flex flex-wrap gap-12px items-start">
        <span class="text-14px font-600 whitespace-nowrap flex-shrink-0">热门技术</span>
        <div class="flex flex-wrap gap-10px flex-1">
          <button
            v-for="tech in hotTechs"
            :key="tech.id"
            class="px-16px py-7px rounded-4px bg-#f5f7fa text-#606266 text-13px hover:bg-#e6f4ff hover:text-#409eff transition-all cursor-pointer border-none whitespace-nowrap"
            @click="handleTechClick(tech)"
          >
            {{ tech.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- 三栏内容区域 -->
    <div class="grid grid-cols-3 gap-20px min-h-0">
      <!-- 资讯推荐 -->
      <div class="bg-white rounded-8px p-24px flex flex-col min-h-0">
        <h3 class="text-16px font-600 mb-20px flex items-center flex-shrink-0">
          <span class="w-4px h-16px bg-#409eff mr-8px" />
          资讯推荐
        </h3>
        <div class="overflow-auto flex-1 pl-8px">
          <div class="relative">
            <!-- 资讯列表 -->
            <div
              v-for="(news, index) in newsData"
              :key="index"
              class="relative pl-28px pb-20px cursor-pointer ml--8px pr-8px hover:bg-#f5f7fa rounded-6px transition-colors"
              @click="handleNewsClick(news)"
            >
              <!-- 上方进度线（第一项不显示） -->
              <div v-if="index !== 0" class="absolute left-4px top-0 w-2px h-6px bg-#e4e7ed" />

              <!-- 圆点 - 与标题垂直居中对齐 -->
              <div class="absolute left-0 top-6px w-10px h-10px rounded-full bg-#d9d9d9 z-1" />

              <!-- 下方进度线（最后一项不显示） -->
              <div v-if="index !== newsData.length - 1" class="absolute left-4px top-16px bottom-0 w-2px bg-#e4e7ed" />

              <!-- 内容 -->
              <div>
                <h4 class="text-14px text-#303133 line-height-22px mb-8px">{{ news.title }}</h4>
                <div class="flex items-center gap-16px text-12px text-#909399">
                  <span>{{ news.sourceName }}</span>
                  <span>{{ news.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 人才推荐 -->
      <div class="bg-white rounded-8px p-24px flex flex-col min-h-0">
        <h3 class="text-16px font-600 mb-20px flex items-center flex-shrink-0">
          <span class="w-4px h-16px bg-#409eff mr-8px" />
          人才推荐
        </h3>
        <div class="space-y-20px overflow-auto flex-1">
          <div
            v-for="(talent, index) in talentData"
            :key="talent.id"
            class="cursor-pointer hover:bg-#f5f7fa p-12px rounded-6px transition-colors"
            @click="handleScholarClick(talent)"
          >
            <div class="flex items-start gap-12px">
              <img
                v-if="talent.headPortrait"
                :src="talent.headPortrait"
                :alt="talent.name"
                class="w-56px h-56px rounded-6px object-cover flex-shrink-0"
              />
              <div
                v-else
                class="w-56px h-56px rounded-6px bg-#e6f4ff flex items-center justify-center text-20px font-600 flex-shrink-0"
              >
                {{ talent.name.charAt(0) }}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-8px mb-6px min-w-0">
                  <span class="text-15px font-600 flex-shrink-0">{{ talent.name }}</span>
                  <span
                    v-if="talent.majorTags && talent.majorTags.length"
                    class="text-12px text-#909399 truncate flex-1 min-w-0"
                  >
                    {{ talent.majorTags.join("、") }}
                  </span>
                </div>
                <div class="space-y-6px text-12px">
                  <div v-if="talent.titleTags && talent.titleTags.length">
                    <el-tag size="small" type="info" effect="light">{{ talent.titleTags[0] }}</el-tag>
                  </div>
                  <div v-if="talent.city" class="text-#909399">{{ talent.city }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 机构推荐 -->
      <div class="bg-white rounded-8px p-24px flex flex-col min-h-0">
        <h3 class="text-16px font-600 mb-20px flex items-center flex-shrink-0">
          <span class="w-4px h-16px bg-#409eff mr-8px" />
          机构推荐
        </h3>
        <div class="space-y-20px overflow-auto flex-1">
          <div
            v-for="(org, index) in orgData"
            :key="org.id"
            class="cursor-pointer hover:bg-#f5f7fa p-12px rounded-6px transition-colors"
          >
            <div class="flex items-start gap-12px">
              <img
                v-if="org.logo"
                :src="org.logo"
                :alt="org.name"
                class="w-56px h-56px rounded-6px object-cover flex-shrink-0"
              />
              <div v-else class="w-56px h-56px rounded-6px bg-#f5f7fa flex items-center justify-center flex-shrink-0">
                <span class="text-24px">🏢</span>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-14px font-600 mb-10px line-clamp-2">{{ org.name }}</h4>
                <div class="space-y-4px text-12px text-#909399">
                  <div v-if="org.province">{{ org.province }}</div>
                  <div v-if="org.establishmentTimeStr">成立时间：{{ org.establishmentTimeStr }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
