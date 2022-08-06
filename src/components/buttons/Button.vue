<template>
  <button
    :disabled="type === 'disabled'"
    class="block border-2 font-semibold rounded-full py-2 px-5 focus:outline-none transition-colors duration-300 hover:text-white focus:text-white dark:hover:text-gray-200"
    :class="{
      'text-gray-500 border-gray-400 hover:bg-gray-500 focus:bg-gray-500 dark:text-gray-500 dark:border-gray-600 dark:hover:bg-gray-600' : !type || type === 'primary',
      'text-white border-gray-400 bg-gray-400 opacity-50 cursor-not-allowed': type === 'disabled',
      'text-warning-400 border-warning-400 hover:bg-warning-400 focus:bg-warning-400 dark:text-warning-700 dark:border-warning-800 dark:hover:bg-warning-800' : type === 'danger',
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