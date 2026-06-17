<template>
  <div>
    <CustomNav title="我的" />
    <div class="pt-nav-top pb-safe min-h-dvh bg-[#EDEDED]">
      <div class="p-32 m-16 rounded-40 bg-white">
        <div class="flex items-center gap-24">
          <div class="flex items-center justify-center rounded-full size-96 shrink-0 bg-[#07C160]">
            <SvgIcon name="line-md:person" class="w-48 h-48 text-white" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-32 font-medium text-[#333333] text-balance truncate">
              {{ meStore.me.email }}
            </p>
            <p class="mt-8 text-24 text-[#999999] tabular-nums">
              ID: {{ meStore.me.id }}
            </p>
          </div>
        </div>
      </div>

      <div v-if="isFetchingTagPending">
        <SvgIcon name="loading" class="w-48 h-48 animate-spin text-sky-400" />
      </div>
      <div v-else-if="isFetchTagError">
        数据加载失败，请刷新页面
      </div>
      <template v-else>
        <div v-for="tagItem in flattenedTagList" :key="tagItem.id" class="mx-16 mb-12 p-28 rounded-12 bg-white">
          <p class="text-30 text-[#333333] text-balance">
            {{ tagItem.tagName }}
          </p>
          <p class="mt-8 text-24 text-[#999999] tabular-nums">
            ID: {{ tagItem.id }}
          </p>
        </div>
        <div class="flex items-center justify-center py-24">
          <template v-if="isFetchingMoreTag">
            <SvgIcon name="loading" class="w-32 h-32 mr-12 animate-spin text-sky-400" />
            <span class="text-28 text-[#999999]">加载中...</span>
          </template>
          <span v-else-if="!hasMoreTag" class="text-28 text-[#999999]">没有更多了</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import { useGetTagList } from '../../api/tag-api'
import { useMeStore } from '../../stores/meStore'

const meStore = useMeStore()

const { tags, fetchMoreTag, hasMoreTag, isFetchingMoreTag, isFetchTagError, isFetchingTagPending } = useGetTagList({ currentPage: 1, perPage: 20 })

const flattenedTagList = computed(() => tags.value?.pages?.flatMap(page => page.resources) || [])

const { arrivedState } = useScroll(window, { offset: { bottom: 100 } })
watch(
  () => arrivedState.bottom,
  (val) => {
    if (val && hasMoreTag.value && !isFetchingMoreTag.value) {
      fetchMoreTag()
    }
  },
  { immediate: true },
)
</script>
