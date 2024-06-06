<template>
  <div class="mb-16">
    <span v-if="isMePending">获取我的信息</span>
    <span v-else-if="isMeError">获取我的信息失败: {{ meError }}</span>
    <span v-else class="font-bold tracking-tight text-transparent bg-gradient-to-r from-red-400 to-red-600 bg-clip-text dark:from-red-200 dark:to-red-400">
      这是邮箱 -- {{ meData?.email }}
    </span>

    <div>
      <span v-if="isTagPending">获取标签信息</span>
      <span v-else-if="isTagError">获取标签信息失败: {{ tagError }}</span>
      <span v-else class="font-bold tracking-tight text-transparent bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text dark:from-green-200 dark:to-green-400">
        这是标签名称 -- {{ tagData?.tagName }}
      </span>
    </div>

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
import { fetchTagQuery } from '../api/tagApi'
import { router } from '../router/router'
import { removeJwt } from '../utils/storage'

const {meData, isMePending, isMeError, meError} = fetchMeQuery()

const {tagData, isTagPending, isTagError, tagError} = fetchTagQuery(meData)

const {courseList, fetchCourseNextPage, hasCourseNextPage, isFetchingCourseNextPage} = fetchCourseQuery({currentPage: 1, perPage: 20 })

const logout = () => {
  router.push('/login')
  removeJwt()
}
</script>
