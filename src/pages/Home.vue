<template>
  <div>
    <Header/>
    <div class="mt-10 px-10 flex justify-evenly space-x-6">
      <!-- Log Time Manually -->
      <section>
        <h2 class="pb-4 text-center text-lg font-semibold border-b border-gray-200">
          Log Time Manually
        </h2>
        <ManualTimeLogForm class="mt-6 "/>
      </section>
      <div class="w-0.5 min-h-full bg-gray-200 rounded-full"></div>
      <section>
        <h2 class="pb-4 text-center text-lg font-semibold border-b border-gray-200">
          Start Time Tracker
        </h2>
        <StopWatch/>
      </section>
    </div>
    <TimeLogsTable class="mt-14 px-10" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Header from '../components/page-sections/Header.vue';
import { useTimerStore } from '../store/timerStore';
import ManualTimeLogForm from '../components/page-sections/Home/ManualTimeLogForm.vue';
import StopWatch from '../components/page-sections/Home/StopWatch.vue';
import TimeLogsTable from '../components/page-sections/Home/TimeLogsTable.vue';
import { useTimeLogStore } from '../store/timeLogStore';


const timerStore = useTimerStore()
const timeLogStore = useTimeLogStore()

onMounted(() => {
  timerStore.startTimer()
  timeLogStore.getCurrentUserTimeLogs()
})

</script>

<style scoped>

</style>