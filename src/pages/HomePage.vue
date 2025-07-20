<template>
  <div>
    <div id="mapContainer" class="w-[1200px] h-[1200px]" />
  </div>
</template>

<script lang="ts" setup>
import AMapLoader from '@amap/amap-jsapi-loader'
import '@amap/amap-jsapi-types'

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  map.value?.destroy()
})

const map = ref<AMap.Map>()

const initMap = () => {
  window._AMapSecurityConfig = {
    securityJsCode: 'bc8b3af87fd871287b2e681071295c32',
  }
  AMapLoader.load({
    key: '28a319a83761ce873ce8c4618a8d3fe0',
    version: '2.0',
    plugins: ['AMap.GeoJSON', 'AMap.Marker'],
    Loca: {
      version: '2.0.0',
    },
  })
    .then(async (AMap) => {
      map.value = new AMap.Map('mapContainer', {
        viewMode: '2D',
        zoom: 9.5,
        center: [121.138825, 27.893054],
        // layers: [
        //   new AMap.TileLayer.Satellite({}),
        // ],
      })
    })
    .catch((e) => {
      console.log(e)
    })
}
</script>

<style lang="scss" scoped>

</style>
