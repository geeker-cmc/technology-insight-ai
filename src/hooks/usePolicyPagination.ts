import { ref, watch } from "vue"

interface PolicyAPIFun<T, P> {
  (param: { page?: number; pageSize?: number } & Partial<P>): Promise<{
    code: number
    message?: string
    data: {
      records: T[]
      total?: number
    }
  }>
}

const defaultPageParams = {
  pageSize: 10,
  page: 1
}

export default function usePolicyPagination<T, P>(
  apiFun: PolicyAPIFun<T, P>,
  initParam?: Partial<P>,
  defaultValue?: T[]
) {
  // 设置默认分页参数
  const param = ref<{ page?: number; pageSize?: number } & Partial<P>>({ ...defaultPageParams, ...initParam } as any)
  const data = ref<T[]>(defaultValue || [])
  const total = ref(0)
  const loading = ref(false)
  const refreshing = ref(false)
  const increasing = ref(false)
  const error = ref("")
  const hasMore = ref(false)
  const noData = ref(false)

  // 刷新逻辑
  watch(refreshing, (isRefreshing) => {
    if (isRefreshing) {
      loading.value = true
      data.value = [] // 刷新时先清空数据
      param.value.page = 1
      fetchList()
    }
  })

  // 加载更多逻辑
  watch(increasing, (isIncreasing) => {
    if (isIncreasing) {
      loading.value = true
      param.value.page += 1
      fetchList()
    }
  })

  async function fetchList() {
    try {
      const response = await apiFun(param.value)
      error.value = ""

      if (response.data?.records === null || response.data?.records === undefined) {
        noData.value = true
        data.value = []
        hasMore.value = false
        total.value = 0
        return
      }

      const records = response.data?.records || []
      const totalCount = response.data?.total || records.length

      if (param.value.page === 1) {
        // 刷新：替换数据
        data.value = records as T[]
        noData.value = totalCount === 0
      } else {
        // 加载更多：累加数据
        noData.value = false
        data.value = [...data.value, ...records] as T[]
      }

      total.value = totalCount
      hasMore.value = data.value.length < totalCount
    } catch (e: any) {
      if (typeof e === "string") {
        error.value = e
      } else {
        error.value = e.message || "请求失败"
      }
      console.error("fetchList error:", e)
    } finally {
      loading.value = false
      refreshing.value = false
      increasing.value = false
    }
  }

  // 设置参数
  function setParam(newParam: Partial<P>) {
    param.value = { ...param.value, ...newParam }
  }

  // 设置刷新状态
  function setRefreshing(value: boolean) {
    refreshing.value = value
  }

  // 设置加载更多状态
  function setIncreasing(value: boolean) {
    increasing.value = value
  }

  // 重置数据
  function reset() {
    data.value = defaultValue || []
    total.value = 0
    loading.value = false
    refreshing.value = false
    increasing.value = false
    error.value = ""
    hasMore.value = false
    noData.value = false
    param.value = { ...defaultPageParams, ...initParam } as any
  }

  return {
    data,
    total,
    loading,
    refreshing,
    increasing,
    error,
    hasMore,
    noData,
    setParam,
    setRefreshing,
    setIncreasing,
    reset
  }
}
