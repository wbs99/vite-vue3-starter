<template>
  <div class="flex flex-col gap-10">
    <section>
      <motion.div
        class="size-[200px] rounded-full bg-purple-500"
        :initial="{ opacity: 0, scale: 0 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{
          duration: 0.4,
          scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
        }"
      />
    </section>

    <section class="relative flex flex-col size-[200px]">
      <AnimatePresence :initial="false">
        <motion.div
          v-if="isVisible"
          key="box"
          class="size-[200px] rounded-lg bg-purple-500"
          :initial="{ opacity: 0, scale: 0 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0, scale: 0 }"
        />
      </AnimatePresence>
      <motion.button
        class="absolute top-full left-0 right-0 py-2 px-4 rounded-lg m-10 border border-solid border-purple-500 text-purple-500"
        :while-press="{ y: 1 }"
        @click="isVisible = !isVisible"
      >
        {{ isVisible ? 'Hide' : 'Show' }}
      </motion.button>
    </section>

    <section>
      <motion.div
        class="size-[200px] rounded-lg bg-purple-500"
        :while-hover="{ scale: 1.2 }"
        :while-press="{ scale: 0.8 }"
      />
    </section>

    <section>
      <motion.div
        class="size-20 rounded-lg bg-purple-500"
        :animate="{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ['0%', '0%', '50%', '50%', '0%'],
        }"
        :transition="{
          duration: 2,
          ease: 'easeInOut',
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }"
      />
    </section>

    <section>
      <motion.div
        class="size-20 rounded-lg bg-purple-500"
        :while-hover="{
          scale: [null, 1.1, 1.6],
          transition: {
            duration: 0.5,
            times: [0, 0.6, 1],
            ease: ['easeInOut', 'easeOut'],
          },
        }"
        :transition="{
          duration: 0.3,
          ease: 'easeOut',
        }"
      />
    </section>

    <section>
      <motion.div
        class="size-20 rounded-lg bg-purple-500"
        :animate="{ rotate: 360 }"
        :transition="{
          duration: 1,
          repeat: Infinity,
          repeatDelay: 1,
        }"
      />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { AnimatePresence, motion } from 'motion-v'

const isVisible = ref(true)
</script>

<style lang="scss" scoped>

</style>
