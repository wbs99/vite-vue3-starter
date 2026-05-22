<template>
  <div class="w-full">
    <div id="nav-bar" ref="navBarRef" class="fixed top-0 left-0 right-0 pt-safe z-[var(--z-navbar)]">
      <img class="nav-bg-image w-full h-full absolute top-0 left-0 z-[-1]" :src="navBg" :style="{ opacity: tabsStickyRatio }">
      <div class="flex items-center justify-between px-32 h-108">
        <span
          class="font-title font-normal text-36 text-[#4F381D]"
          :style="{ opacity: tabsStickyRatio, transform: `translateY(${(1 - tabsStickyRatio) * 10}px)` }"
        >
          AI视频彩铃
        </span>
        <div class="inline-flex items-center gap-10 rounded-full py-14 px-30 me-btn" @click="toMePage">
          <span class="text-26 text-[#624710]">
            我的作品
          </span>
          <SvgIcon name="mangosteen-icon" color="#624710" class="w-24 h-24" />
        </div>
      </div>
    </div>

    <div class="w-full h-470">
      <img src="../assets/images/home-banner-image.png" alt="home-banner" class="w-full h-full">
    </div>

    <div id="sticky-anchor" ref="stickyAnchorRef" class="sticky z-[calc(var(--z-navbar)-1)] tabs-container" :style="tabsContainerStyle">
      <div class="overflow-hidden bg-white rounded-t-50">
        111111
      </div>
    </div>

    <div class="pb-32 px-32 z-[calc(var(--z-navbar)-2)] bg-white">
      <div v-if="isFetchingTagPending">
        <SvgIcon name="loading" class="w-48 h-48 animate-spin text-sky-400" />
      </div>
      <div v-else-if="isFetchTagError">
        数据加载失败，请刷新页面
      </div>
      <div v-else>
        <div v-for="tagItem in flattenedTagList" :key="tagItem.id" class="mx-16 mb-12 bg-white p-28 rounded-12">
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useElementBounding, useScroll } from '@vueuse/core'
import { useGetTagList } from '../api/tag-api'
import navBg from '../assets/images/nav-bg.png'

const router = useRouter()

const navBarRef = ref(null)
const stickyAnchorRef = ref(null)
const { height: navHeight } = useElementBounding(navBarRef)
const { top: stickyAnchorViewportTop } = useElementBounding(stickyAnchorRef)

const TABS_TRANSITION_DISTANCE = 50

const tabsStickyRatio = computed(() => {
  const threshold = navHeight.value + TABS_TRANSITION_DISTANCE
  if (stickyAnchorViewportTop.value >= threshold)
    return 0
  if (stickyAnchorViewportTop.value <= navHeight.value)
    return 1
  return (threshold - stickyAnchorViewportTop.value) / TABS_TRANSITION_DISTANCE
})

const tabsContainerStyle = computed(() => {
  const t = tabsStickyRatio.value
  const c0r = Math.round(236 + 18 * t)
  const c0g = Math.round(235 + 3 * t)
  const c0b = Math.round(241 - 69 * t)
  const c1r = Math.round(236 + 17 * t)
  const c1g = Math.round(235 + 7 * t)
  const c1b = Math.round(241 - 50 * t)
  const c2r = Math.round(249 + 5 * t)
  const c2g = Math.round(246 + 1 * t)
  const c2b = Math.round(240 - 7 * t)
  const c3r = Math.round(249 + 5 * t)
  const c3g = Math.round(246 + 2 * t)
  const c3b = Math.round(240 - 3 * t)
  return {
    top: `${navHeight.value}px`,
    background: `linear-gradient(270deg, rgb(${c0r},${c0g},${c0b}) 0%, rgb(${c1r},${c1g},${c1b}) 20%, rgb(${c2r},${c2g},${c2b}) 80%, rgb(${c3r},${c3g},${c3b}) 100%)`,
  }
})

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

const toMePage = () => {
  router.push('/me')
}
</script>

<style lang="scss" scoped>
.me-btn {
  background: linear-gradient(270deg, #fff3c4 0%, #ffffff 100%);
  border-image: linear-gradient(270deg, #ffffff 0%, rgba(255, 255, 255, 0.4) 100%) 1;
  box-shadow: 0px 0px 16px 0px rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
}

.nav-bg-image {
  transition: opacity 0.1s ease;
}

.tabs-container {
  transition: background 0.1s ease;
}
</style>
