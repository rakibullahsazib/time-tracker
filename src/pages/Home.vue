<template>
  <div>
    <Header/>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Header from '../components/page-sections/Header.vue';
import { useTimerStore } from '../store/timerStore';


const timerStore = useTimerStore()


onMounted(() => {
  timerStore.startTimer()
})

</script>

<style scoped>

</style>