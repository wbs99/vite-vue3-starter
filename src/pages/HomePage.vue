<template>
  <div class="mb-16">
    <span v-if="isMePending">获取我的信息</span>
    <span v-else-if="isMeError">获取我的信息失败: {{ meError }}</span>
    <span v-else class="font-bold tracking-tight text-transparent bg-gradient-to-r from-red-400 to-red-600 bg-clip-text dark:from-red-200 dark:to-red-400">
      {{ meData?.email }}
    </span>

    <ul v-for="(group, index) in courseList?.pages" :key="index">
      <li v-for="course in group.resources" :key="course.id">
        {{ course.name }}
      </li>
    </ul>

    <button
      :disabled="!hasCourseNextPage || isFetchingCourseNextPage"
      class="btn btn-primary"
      @click="() => fetchCourseNextPage()"
    >
      <span v-if="isFetchingCourseNextPage">正在加载更多数据...</span>
      <span v-else-if="hasCourseNextPage">加载更多</span>
      <span v-else>没有更多数据了</span>
    </button>
  </div>
  <MyButton button-name="退出登录" @click="logout" />
</template>

<script lang="ts" setup>
import { fetchCourseQuery } from '../api/courseApi'
import { fetchMeQuery } from '../api/meApi'
import { router } from '../router'
import { removeJwt } from '../utils/storage'

const {meData, isMePending, isMeError, meError} = fetchMeQuery()

const {courseList, fetchCourseNextPage, hasCourseNextPage, isFetchingCourseNextPage} = fetchCourseQuery({currentPage: 1, perPage: 20 })

const logout = () => {
  router.push('/login')
  removeJwt()
}
</script>
