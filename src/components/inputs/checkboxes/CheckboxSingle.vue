<template>
  <div @click.stop="$emit('toggle')" class="flex items-center cursor-pointer">
    <!-- Checkbox -->
    <div class="flex-shrink-0 w-4 h-4 flex-center bg-transparent border border-gray-300 dark:border-gray-500 rounded">
      <img v-if="checked" class="w-3 h-3" src="/assets/icons/tick.svg" alt="Checked">
    </div>
    <p class="truncate" :title="name">
      {{ name }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string,
  checked: boolean
}>()
</script>

<style scoped>

</style>