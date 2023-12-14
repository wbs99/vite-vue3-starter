<template>
  <div v-for="item in list" :key="item.id" class="mt-24px">
    {{ item.name }}
  </div>
  <ListLoading :has-more="hasMore" :is-loading="isLoading" @infinite="fetchList" />
</template>

<script lang="ts" setup>
import { fetchCourseListApi } from '../api'
import { useList } from '../hooks/useList'

const listParams = reactive({
  page: 1,
  perPage: 20,
})
// 这里的 Pager 和 Course 都是类型，根据实际数据进行相应修改即可
const { list, hasMore, fetchList, isLoading } = useList<Pager, Course>(
  listParams,
  () => fetchCourseListApi(listParams),
)
</script>
