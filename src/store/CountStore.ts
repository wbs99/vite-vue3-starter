import { defineStore } from "pinia";
import { ref } from "vue";

export const CountStore = defineStore(
  "CountStore",
  () => {
    const count = ref(0)
    const addCount = () => { count.value += 1 }
    const addFive = (n: number) => { count.value += n }
    return { count, addCount, addFive };
  },
);