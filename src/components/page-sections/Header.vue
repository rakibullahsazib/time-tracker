<template>
  <header class="p-4 lg:px-10 py-4 grid grid-cols-2 lg:grid-cols-3 place-items-center  bg-gray-800 text-gray-200">
    <div class="hidden lg:block place-self-start">
      <router-link :to="{name: 'Home'}" class="block text-2xl font-semibold italic">
        Time Tracker
      </router-link>
      <button class="mt-1" @click="logOut">
        Sign Out
      </button>
    </div>
    <div class="place-self-start lg:place-self-center">
      <p class="text-xl lg:text-3xl font-bold">
        <span v-if="currentTime">{{ getHourMinuteFromISO(currentTime) }}</span>
      </p>
      <button class="lg:hidden mt-1 text-sm" @click="logOut">
        Sign Out
      </button>
    </div>
    <div class="place-self-end text-right text-sm text-white">
      <p>
        {{currentUser?.firstName}} {{currentUser?.lastName}}
      </p>
      <p class="mt-2">
        {{ formatTimeDifference(totalTimeTracked) }} tracked
      </p>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '../../store/userStore.js';
import { useTimerStore } from '../../store/timerStore';
import { getHourMinuteFromISO } from '../../helpers/dateFormatter'
import { useRouter } from 'vue-router';
import { useRootStore } from '../../store/rootStore.js';
import { formatTimeDifference, getTimeDifferenceInMins } from '../../helpers/dateFormatter';
import { useTimeLogStore } from '../../store/timeLogStore';
import { TimeLog } from '../../types/interfaces/timelog.interface';

const router = useRouter()
const rootStore = useRootStore()
const userStore = useUserStore()
const timerStore = useTimerStore()
const timeLogStore = useTimeLogStore()

const currentUser = computed(() => userStore.currentUser)
const currentTime = computed(() => timerStore.currentTime)

const totalTimeTracked = computed(() => timeLogStore.currentUserTimeLogs.reduce((total: number, log: TimeLog) => total + getTimeDifferenceInMins(log.startTime, log.endTime), 0))

const logOut = () => {
  rootStore.logOut()
  router.push({name: 'Welcome'})
}

</script>

<style scoped>

</style>