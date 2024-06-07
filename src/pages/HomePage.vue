<template>
  <div class="mb-16">
    <div>
      <span v-if="isMeLoading">正在获取我的信息...</span>
      <span v-else-if="isMeError">获取我的信息失败: {{ meError }}</span>
      <span v-else class="font-bold tracking-tight text-transparent bg-gradient-to-r from-red-400 to-red-600 bg-clip-text dark:from-red-200 dark:to-red-400">
        这是邮箱 -- {{ meData?.email }}
      </span>
    </div>

    <div>
      <span v-if="isTagLoading">正在获取标签信息...</span>
      <span v-else-if="isTagError">获取标签信息失败: {{ tagError }}</span>
      <span v-else class="font-bold tracking-tight text-transparent bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text dark:from-green-200 dark:to-green-400">
        这是标签名称 -- {{ tagData?.tagName }}
      </span>
    </div>

    <div v-if="!courseList">
      <CenterDiv v-if="isCourseError">
        数据加载失败，请刷新页面
      </CenterDiv>
      <CenterDiv v-if="isCourseLoading">
        <span class="loading loading-spinner text-info" />
      </CenterDiv>
    </div>
    <div v-else>
      <ul>
        <li v-for="course in flattenedCourseList" :key="course.id" class="py-4">
          {{ course.name }}
        </li>
      </ul>
      <button
        :disabled="!hasCourseNextPage || isFetchingCourseNextPage"
        class="btn btn-primary"
        @click="() => fetchCourseNextPage()"
      >
        <span v-if="isFetchingCourseNextPage">正在加载更多数据...</span>
        <span v-else-if="!isFetchingCourseNextPage && hasCourseNextPage" ref="target">加载更多</span>
        <span v-else>没有更多数据了</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import { fetchCourseQuery } from '../api/courseApi'
import { fetchMeQuery } from '../api/meApi'
import { fetchTagQuery } from '../api/tagApi'

const {meData, isMeLoading, isMeError, meError} = fetchMeQuery()

const {tagData, isTagLoading, isTagError, tagError} = fetchTagQuery(meData)

const {courseList, isCourseLoading, fetchCourseNextPage, hasCourseNextPage, isFetchingCourseNextPage, isCourseError, } = fetchCourseQuery({currentPage: 1, perPage: 20 })

const flattenedCourseList = computed(() => courseList.value?.pages?.flatMap(page => page.resources) || [])

const target = ref(null)
useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      fetchCourseNextPage()
    }
  }
)
</script>
