<template>
  <button
    :disabled="type === 'disabled'"
    class="block border-2 font-semibold rounded-full py-2 px-5 focus:outline-none transition-opacity duration-300 text-white hover:opacity-90 focus:opacity-90 dark:hover:text-gray-200"
    :class="{
      ' bg-gray-600' : !type || type === 'primary',
      'bg-gray-400 opacity-50 cursor-not-allowed': type === 'disabled',
      'bg-warning-700' : type === 'danger',
    }"
  >
    {{ title }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  title: string,
  type?: 'primary' | 'danger' | 'disabled'
}>()
</script>

<style scoped>
</style>