import { useQuery } from '@tanstack/vue-query'
import { http } from '../utils/http'

export const fetchTagQuery = (me: Ref<User | undefined>) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['tagApi'],
    queryFn: async () => {
      const response = await http.get<Resource<Tag>>('/tag')
      return response.data.resource
    },
    enabled: computed(() => !!me.value?.id)
  })
  return {
    tagData: data, isTagLoading: isLoading, isTagError: isError, tagError: error,
  }
}
