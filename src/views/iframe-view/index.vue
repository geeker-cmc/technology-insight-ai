<script lang="ts" setup>
defineOptions({ name: "IframeView" })
import { ref, computed, watch } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const loading = ref(true)

/** 从路由查询参数获取 URL */
const iframeUrl = computed(() => {
  console.log("router", route.query.url)
  return (route.query.url as string) || ""
})

/** iframe 加载完成 */
const handleLoad = () => {
  loading.value = false
}

/** 监听路由变化，重新显示加载状态 */
watch(
  () => route.query.url,
  () => {
    loading.value = true
  }
)
</script>

<template>
  <div class="w-full h-full relative">
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white z-10">
      <el-icon class="is-loading text-40px text-#409eff">
        <i class="ep:loading" />
      </el-icon>
    </div>
    <iframe
      v-if="iframeUrl"
      :src="iframeUrl"
      class="w-full border-none"
      style="height: calc(100% + 70px); margin-top: -70px"
      @load="handleLoad"
    />
  </div>
</template>

<style scoped></style>
