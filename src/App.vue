<template>
  <div class="text-gray-600" >
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRootStore } from './store/rootStore';

const rootStore = useRootStore()
onMounted(() => {
  window.addEventListener('click', () => {
    rootStore.toggleCurrentDropdown('')
  })
})

</script>

<style scoped>
</style>
