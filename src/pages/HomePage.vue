<template>
  <div>
    <van-button type="primary" @click="pickerVisible = true">
      主要按钮
    </van-button>
    <p>选中的值：{{ selectedValues[0] }}</p>
    <van-popup v-model:show="pickerVisible" round position="bottom">
      <van-picker
        v-model="selectedValues"
        :columns="dataSource"
        :columns-field-names="dataSourceFieldNames"
        @cancel="pickerVisible = false"
        @confirm="onPickerConfirm"
      />
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import type { PickerOption } from 'vant'

const pickerVisible = ref(false)
const dataSourceFieldNames = reactive({
  value: 'id',
  text: 'label',
})
const dataSource = ref([
  { label: '杭州', id: 'Hangzhou' },
  { label: '宁波', id: 'Ningbo' },
  { label: '温州', id: 'Wenzhou' },
  { label: '绍兴', id: 'Shaoxing' },
  { label: '湖州', id: 'Huzhou' },
])
const selectedValues = ref([])
const onPickerConfirm = ({ selectedOptions }: { selectedOptions: PickerOption[] }) => {
  pickerVisible.value = false
  console.log('selectedOptions', selectedOptions)
}
</script>
