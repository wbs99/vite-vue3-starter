import type { User } from './meApi'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { http } from './http'

export type Tag = {
  id: number
  tagName: string
}

export type TagParams = Partial<Tag> & Pager

export const GET_TAG = 'GET_TAG'

export const useGetTag = (me: Ref<User | undefined>, tagId: number) => {
  const { isPending, data } = useQuery({
    queryKey: [GET_TAG, me, tagId],
    queryFn: async () => {
      const response = await http.get<Resource<Tag>>(`/tag/${tagId}`)
      return response.data.resource
    },
    enabled: computed(() => !!me.value?.id)
  })
  return {
    tag: data, isTagPending: isPending
  }
}

export const GET_TAGS = 'GET_TAGS'

export const useGetTagList = (params: Pager) => {
  const { currentPage, perPage } = params
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, isPending } = useInfiniteQuery({
    queryKey: [GET_TAGS],
    queryFn: async ({ pageParam = currentPage }) => {
      const response = await http.get<Resources<Tag>>('/tags', { ...params, currentPage: pageParam })
      return response.data
    },
    initialPageParam: currentPage,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      return lastPage.resources.length >= perPage ? lastPageParam + 1 : undefined
    },
  })

  return {
    tags: data, fetchMoreTag: fetchNextPage, hasMoreTag: hasNextPage, isFetchingMoreTag: isFetchingNextPage, isFetchTagError: isError, isFetchingTagPending: isPending,
  }
}

export const useAddTag = () => {
  const queryClient = useQueryClient()
  const { isPending, isError, error, isSuccess, mutate } = useMutation({
    mutationFn: (newTag: Partial<Tag>) => http.post<Resource<Tag>>('/tag', newTag),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_TAGS] })
    }
  })
  return {
    isAddTagPending: isPending, isAddTagError: isError, addTagError: error, isAddTagSuccess: isSuccess, addTag: mutate
  }
}

export const useUpdateTag = () => {
  const queryClient = useQueryClient()
  const { isPending, isError, error, isSuccess, mutate } = useMutation({
    mutationFn: (newTag: Partial<Tag>) => http.patch<Resource<Tag>>(`/tag/${newTag.id}`, newTag),
    onSuccess: (data, variables) => {
      console.log('这里触发了')
      queryClient.setQueryData([GET_TAG, { id: variables.id }], { ...data, tagName: variables.tagName })
    }
  })

  return {
    isUpdateTagPending: isPending, isUpdateTagError: isError, updateTagError: error, isUpdateTagSuccess: isSuccess, updateTag: mutate
  }
}
