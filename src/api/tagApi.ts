import { useQuery } from '@tanstack/vue-query'
import { http } from '../utils/http'

export const fetchTagQuery = (me: Ref<User | undefined>) => {
  const enabled = computed(() => !!me.value?.id)
  const { isPending, isFetching, isError, data, error } = useQuery({
    queryKey: ['tagApi'],
    queryFn: async () => {
      const response = await http.get<Resource<Tag>>('/tag')
      return response.data.resource
    },
    enabled
  })
  return {
    tagData: data, tagError: error, isTagError: isError, isTagPending: isPending, isTagFetching: isFetching
  }
}
