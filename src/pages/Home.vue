<template>
  <div>
    <Header/>
    <div class="mt-10 px-10 flex">
      <!-- Log Time Manually -->
      <section>
        <h2 class="pb-4 text-center text-lg font-semibold border-b border-gray-200">
          Log Time Manually
        </h2>
        <ManualTimeLogForm class="mt-6 "/>
      </section>
      <section>

      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Header from '../components/page-sections/Header.vue';
import { useTimerStore } from '../store/timerStore';
import ManualTimeLogForm from '../components/page-sections/Home/ManualTimeLogForm.vue';


const timerStore = useTimerStore()


onMounted(() => {
  timerStore.startTimer()
})

</script>

<style scoped>

</style>