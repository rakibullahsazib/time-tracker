<template>
  <button
    :disabled="btnType === 'disabled'"
    class="block border-2 font-semibold rounded-lg py-2 px-5 focus:outline-none transition-opacity duration-300 text-white hover:opacity-90 focus:opacity-90"
    :class="{
      ' bg-gray-600' : !btnType || btnType === 'primary',
      'bg-gray-400 opacity-50 hover:opacity-50 cursor-not-allowed': btnType === 'disabled',
      'bg-warning-700 hover:opacity-80' : btnType === 'danger',
    }"
  >
    {{ title }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  title: string,
  btnType?: 'primary' | 'danger' | 'disabled'
}>()
</script>

<style scoped>
</style>