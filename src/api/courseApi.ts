import { useInfiniteQuery } from '@tanstack/vue-query'
import { http } from '../utils/http'

export const fetchCourseListApi = (data: Pager) => http.get<Resources<Course>>('/courses', data)

export const fetchCourseQuery = (params: Pager) => {
  const { currentPage, perPage } = params
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, isLoading } = useInfiniteQuery({
    queryKey: ['coursesApi'],
    queryFn: async ({ pageParam = currentPage }) => {
      const response = await fetchCourseListApi({ ...params, currentPage: pageParam })
      return response.data
    },
    initialPageParam: currentPage,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      return lastPage.resources.length >= perPage ? lastPageParam + 1 : undefined
    },
  })

  return { courseList: data, isCourseLoading: isLoading, fetchCourseNextPage: fetchNextPage, hasCourseNextPage: hasNextPage, isFetchingCourseNextPage: isFetchingNextPage, isCourseError: isError, }
}
