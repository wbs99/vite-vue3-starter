import type { User } from './meApi'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { http } from './http'

export type Tag = {
  id: number
  tagName: string
}

export type TagParams = Partial<Tag & Pager>

export const GET_TAG_QUERY_KEY = 'GET_TAG_QUERY_KEY'
export const GET_TAG_LIST_QUERY_KEY = 'FETCH_TAG_LIST_QUERY_KEY'

export const getTagApi = (tagId: number) => http.get<Resource<Tag>>(`/tag/${tagId}`)
export const useGetTag = (me: Ref<User | undefined>, tagId: number) => {
  const { isPending, data } = useQuery({
    queryKey: [GET_TAG_QUERY_KEY, me, tagId],
    queryFn: async () => {
      const response = await getTagApi(tagId)
      return response.data.resource
    },
    enabled: computed(() => !!me.value?.id)
  })
  return {
    tag: data, isTagPending: isPending
  }
}

export const getTagListApi = (data: Pager) => http.get<Resources<Tag>>('/tags', data)
export const useGetTagList = (params: Pager) => {
  const { currentPage, perPage } = params
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, isPending } = useInfiniteQuery({
    queryKey: [GET_TAG_LIST_QUERY_KEY],
    queryFn: async ({ pageParam = currentPage }) => {
      const response = await getTagListApi({ ...params, currentPage: pageParam })
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

export const addTagApi = (data: TagParams) => http.post<Resource<Tag>>('/tag', data)
export const useAddTag = () => {
  const queryClient = useQueryClient()
  const { isPending, isError, error, isSuccess, mutate } = useMutation({
    mutationFn: (newTag: TagParams) => addTagApi(newTag),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_TAG_LIST_QUERY_KEY] })
    }
  })
  return {
    isAddTagPending: isPending, isAddTagError: isError, addTagError: error, isAddTagSuccess: isSuccess, addTag: mutate
  }
}

export const updateTagApi = (newTag: TagParams) => http.patch<Resource<Tag>>(`/tag/${newTag.id}`, newTag)
export const useUpdateTag = () => {
  const queryClient = useQueryClient()
  const { isPending, isError, error, isSuccess, mutate } = useMutation({
    mutationFn: (newTag: TagParams) => updateTagApi(newTag),
    onSuccess: (data, variables) => {
      console.log('这里触发了')
      queryClient.setQueryData([GET_TAG_QUERY_KEY, { id: variables.id }], {...data, tagName: variables.tagName})
    }
  })

  return {
    isUpdateTagPending: isPending, isUpdateTagError: isError, updateTagError: error, isUpdateTagSuccess: isSuccess, updateTag: mutate
  }
}
