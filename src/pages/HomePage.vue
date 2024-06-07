<template>
  <div class="mb-16">
    <div>
      <span v-if="isMePending">正在获取我的信息...</span>
      <span v-else-if="isMeError">获取我的信息失败: {{ meError }}</span>
      <span v-else class="font-bold tracking-tight text-transparent bg-gradient-to-r from-red-400 to-red-600 bg-clip-text dark:from-red-200 dark:to-red-400">
        这是邮箱 -- {{ meData?.email }}
      </span>
    </div>

    <div>
      <span v-if="isTagPending">正在获取标签信息...</span>
      <span v-else-if="isTagError">获取标签信息失败: {{ tagError }}</span>
      <div v-else class="font-bold tracking-tight text-transparent bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text dark:from-green-200 dark:to-green-400">
        <p>这是标签名称 -- {{ tag?.tagName }}</p>
        <p>这是标签id -- {{ tag?.id }}</p>
      </div>
    </div>

    <button
      :disabled="isAddTagPending"
      class="btn btn-primary"
      @click="onAddTag"
    >
      <span>新增标签</span>
      <span v-if="isAddTagPending">正在新增标签...</span>
      <span v-if="isAddTagError">新增标签失败，失败信息 -- {{ addTagError }}</span>
      <span v-if="isAddTagSuccess">新增标签成功</span>
    </button>

    <button
      :disabled="isUpdateTagPending"
      class="btn btn-primary"
      @click="() => onUpdateTag({ id: 6, tagName: '修改标签' })"
    >
      <span>更新标签</span>
      <span v-if="isUpdateTagPending">正在更新标签...</span>
      <span v-if="isUpdateTagError">更新标签失败，失败信息 -- {{ updateTagError }}</span>
      <span v-if="isUpdateTagSuccess">更新标签成功</span>
    </button>

    <div v-if="!tagList">
      <CenterDiv v-if="isFetchTagError">
        数据加载失败，请刷新页面
      </CenterDiv>
      <CenterDiv v-if="isFetchingTagPending">
        <span class="loading loading-spinner text-info" />
      </CenterDiv>
    </div>
    <div v-else>
      <ul>
        <li v-for="tag in flattenedTagList" :key="tag.id" class="py-4">
          {{ tag.tagName }}
        </li>
      </ul>
      <button
        :disabled="!hasMoreTag || isFetchingMoreTag"
        class="btn btn-primary"
        @click="() => fetchMoreTag()"
      >
        <span v-if="isFetchingMoreTag">正在加载更多数据...</span>
        <span v-else-if="!isFetchingMoreTag && hasMoreTag" ref="target">加载更多</span>
        <span v-else>没有更多数据了</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'

import { useFetchMe } from '../api/meApi'
import { useAddTag, useFetchTag, useFetchTagList, useUpdateTag } from '../api/tagApi'

const {meData, isMePending, isMeError, meError} = useFetchMe()

const {tag, isTagPending, isTagError, tagError} = useFetchTag(meData, 6)

const {isAddTagPending, isAddTagError, addTagError, isAddTagSuccess, addTag} = useAddTag()

const onAddTag = () => {
  addTag({tagName: '测试标签'})
}

const {isUpdateTagPending, isUpdateTagError, updateTagError, isUpdateTagSuccess, updateTag} = useUpdateTag()

const onUpdateTag = (data: Partial<Tag>) => {
  updateTag(data)
}

const { tagList, fetchMoreTag, hasMoreTag, isFetchingMoreTag, isFetchTagError, isFetchingTagPending } = useFetchTagList({currentPage: 1, perPage: 20 })

const flattenedTagList = computed(() => tagList.value?.pages?.flatMap(page => page.resources) || [])

const target = ref(null)
useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      fetchMoreTag()
    }
  }
)
</script>
