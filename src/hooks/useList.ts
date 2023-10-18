import type { AxiosResponse } from 'axios'
import type { Ref } from 'vue'
import { computed, onMounted, ref } from 'vue'

export const useList = <T extends Pager, DataType>(
  listParams: T,
  fetcher: (params: T) => Promise<AxiosResponse<ListResponse<DataType>>>
) => {
  const isLoading = ref(false)
  const listTotal = ref(0)
  const list = ref<DataType[]>([]) as Ref<DataType[]>
  const hasMore = computed(() => list.value.length < listTotal.value)

  const fetchList = async () => {
    isLoading.value = true
    const response = await fetcher(listParams)
    list.value.push(...response.data.data)
    listTotal.value = response.data.total
    listParams.page += 1
    isLoading.value = false
  }

  onMounted(fetchList)

  return {
    list, listTotal, hasMore, fetchList, isLoading
  }
}
