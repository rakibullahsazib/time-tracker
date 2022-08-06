<template>
  <div class="p-4 lg:px-10 py-4 flex items-center justify-between bg-gray-800 text-gray-200">
    <div>
      <router-link :to="{name: 'Home'}" class="hidden lg:block text-2xl font-semibold italic">
        Time Tracker
      </router-link>
      <button class="mt-1" @click="logOut">
        Log Out
      </button>
    </div>
    <p class="text-3xl font-bold">
      <span v-if="currentTime">{{ getHourMinuteFromISO(currentTime) }}</span>
    </p>
    <div class="text-right text-sm">
      <p>
        {{currentUser?.firstName}} {{currentUser?.lastName}}
      </p>
      <p class="mt-1">
        O h tracked
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '../../store/userStore.js';
import { useTimerStore } from '../../store/timerStore';
import { getHourMinuteFromISO } from '../../helpers/dateFormatter'
import { useRouter } from 'vue-router';

const router = useRouter()
const userStore = useUserStore()
const timerStore = useTimerStore()

const currentUser = computed(() => userStore.currentUser)
const currentTime = computed(() => timerStore.currentTime)

const logOut = () => {
  userStore.logOut()
  router.push({name: 'Welcome'})
}

</script>

<style scoped>

</style>