<template>
  <rect
      :height="height"
      :width="width"
      :x="map.bounds.minX"
      :y="map.bounds.minY"
      fill="#d8d8d8"
      stroke="#404040"
  />
</template>

<script setup>
import {computed} from 'vue'

const props = defineProps({
  map: {type: Object, required: true},
})

const width = computed(() => props.map.bounds.maxX - props.map.bounds.minX)
const height = computed(() => props.map.bounds.maxY - props.map.bounds.minY)
</script>
