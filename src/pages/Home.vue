<template>
  <div>
    <Header/>
    <div class="mt-10 px-4 lg:px-10 grid grid-cols-4 lg:grid-cols-9 gap-6 place-items-center max-w-screen-xl mx-auto">
      <!-- Log Time Manually -->
      <section class="col-span-4">
        <h2 class="pb-4 text-center text-lg font-semibold border-b border-gray-200">
          Log Time Manually
        </h2>
        <ManualTimeLogForm class="mt-6 "/>
      </section>
      <div class="hidden lg:block col-span-1 w-0.5 min-h-full bg-gray-200 rounded-full"></div>
      <section class="self-start mt-10 lg:mt-0 col-span-4">
        <h2 class="pb-4 text-center text-lg font-semibold border-b border-gray-200">
          Use Time Tracker
        </h2>
        <StopWatch class="mt-6"/>
      </section>
    </div>
    <section class="mt-20 px-4 lg:px-10 max-w-screen overflow-auto">
      <TimeLogsTable v-if="timeLogs.length"  />
      <p v-else class="text-center">
        Sorry, you have not created any time logs yet.
      </p>
    </section>
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
import { computed } from '@vue/reactivity';


const timerStore = useTimerStore()
const timeLogStore = useTimeLogStore()

const timeLogs = computed(() => timeLogStore.currentUserTimeLogs)

onMounted(() => {
  timerStore.startClock()
  timeLogStore.getCurrentUserTimeLogs()
})

</script>

<style scoped>

</style>