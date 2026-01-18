import { ref, watch } from "vue"

interface APIFun<T, P> {
  (param: { page?: number; pageSize?: number } & Partial<P>): Promise<{
    code: number
    data: {
      result: {
        records: T[]
        total: number
      }
    }
  }>
}

const defaultPageParams = {
  pageSize: 10,
  page: 1
}

export default function usePaginationSearch<T, P>(apiFun: APIFun<T, P>, initParam?: Partial<P>, defaultValue?: T[]) {
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

      if (response.data?.result === null) {
        noData.value = true
        data.value = []
        hasMore.value = false
        total.value = 0
        return
      }

      const records = response.data?.result?.records || []
      const totalCount = response.data?.result?.total || 0

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
        error.value = e.toString()
      }
      if (param.value.page === 1) {
        data.value = []
      }
    } finally {
      loading.value = false
      refreshing.value = false
      increasing.value = false
    }
  }

  return {
    param,
    setParam: (p: Partial<P>) => {
      param.value = { ...param.value, ...p } as any
    },
    setIncreasing: (bool: boolean) => {
      increasing.value = bool
    },
    setRefreshing: (bool: boolean) => {
      refreshing.value = bool
    },
    updateList: (item: T, index: number) => {
      if (data.value && index >= 0 && index < data.value.length) {
        const newData = [...data.value] as any[]
        newData[index] = item
        data.value = newData as any
      }
    },
    error,
    data,
    total,
    loading,
    refreshing,
    increasing,
    hasMore,
    noData
  }
}
