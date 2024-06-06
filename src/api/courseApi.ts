import { useInfiniteQuery } from '@tanstack/vue-query'
import { http } from '../utils/http'

export const fetchCourseListApi = (data: Pager) => http.get<Resources<Course>>('/courses', data)

export const fetchCourseQuery = (params: Pager) => {
  const { currentPage, perPage } = params
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['coursesApi'],
    queryFn: async ({ pageParam = currentPage }) => {
      const response = await fetchCourseListApi({ ...params, currentPage: pageParam })
      return response.data
    },
    initialPageParam: currentPage,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.resources.length < perPage) {
        return undefined
      }
      return lastPageParam + 1
    },
  })

  return { courseList: data, fetchCourseNextPage: fetchNextPage, hasCourseNextPage: hasNextPage, isFetchingCourseNextPage: isFetchingNextPage }
}
