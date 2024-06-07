import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { http } from '../utils/http'


export const FETCH_TAG_QUERY_KEY = 'tagApi'
export const FETCH_TAG_LIST_QUERY_KEY = 'tagListApi'

export const fetchTagApi = (tagId: number) => http.get<Resource<Tag>>(`/tag/${tagId}`)

export const useFetchTag = (me: Ref<User | undefined>, tagId: number) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: [FETCH_TAG_QUERY_KEY, me, tagId],
    queryFn: async () => {
      const response = await fetchTagApi(tagId)
      return response.data.resource
    },
    enabled: computed(() => !!me.value?.id)
  })
  return {
    tag: data, isTagPending: isPending, isTagError: isError, tagError: error,
  }
}

export const fetchTagListApi = (data: Pager) => http.get<Resources<Tag>>('/tags', data)

export const useFetchTagList = (params: Pager) => {
  const { currentPage, perPage } = params
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, isPending } = useInfiniteQuery({
    queryKey: [FETCH_TAG_LIST_QUERY_KEY],
    queryFn: async ({ pageParam = currentPage }) => {
      const response = await fetchTagListApi({ ...params, currentPage: pageParam })
      return response.data
    },
    initialPageParam: currentPage,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      return lastPage.resources.length >= perPage ? lastPageParam + 1 : undefined
    },
  })

  return {
    tagList: data, fetchMoreTag: fetchNextPage, hasMoreTag: hasNextPage, isFetchingMoreTag: isFetchingNextPage, isFetchTagError: isError, isFetchingTagPending: isPending,
  }
}

export const addTagApi = (data: Partial<Tag>) => http.post<Resource<Tag>>('/tag', data)

export const useAddTag = () => {
  const queryClient = useQueryClient()
  const { isPending, isError, error, isSuccess, mutate } = useMutation({
    mutationFn: (newTag: Partial<Tag>) => addTagApi(newTag),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FETCH_TAG_QUERY_KEY] })
    }
  })

  return {
    isAddTagPending: isPending, isAddTagError: isError, addTagError: error, isAddTagSuccess: isSuccess, addTag: mutate
  }
}

export const updateTagApi = (newTag: Partial<Tag>) => http.patch<Resource<Tag>>(`/tag/${newTag.id}`, newTag)

export const useUpdateTag = () => {
  const queryClient = useQueryClient()
  const { isPending, isError, error, isSuccess, mutate } = useMutation({
    mutationFn: (newTag: Partial<Tag>) => updateTagApi(newTag),
    onSuccess: (data, variables) => {
      console.log('这里触发了')
      queryClient.setQueryData([FETCH_TAG_QUERY_KEY, { id: variables.id }], {...data, tagName: variables.tagName})
    }
  })

  return {
    isUpdateTagPending: isPending, isUpdateTagError: isError, updateTagError: error, isUpdateTagSuccess: isSuccess, updateTag: mutate
  }
}
