<template>
  <div class="text-gray-600 dark:text-gray-300" :class="darkMode ? 'dark' : 'light'">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRootStore } from './store/rootStore';

const rootStore = useRootStore()
const darkMode = computed(() => rootStore.darkMode)

onMounted(() => {
  window.addEventListener('click', () => {
    rootStore.toggleCurrentDropdown('')
  })
})

</script>

<style scoped>
</style>
