<template>
  <header class="p-4 lg:px-10 py-4 flex items-center justify-between bg-gray-800 text-gray-200">
    <div class="hidden lg:block">
      <router-link :to="{name: 'Home'}" class="block text-2xl font-semibold italic">
        Time Tracker
      </router-link>
      <button class="mt-1" @click="logOut">
        Log Out
      </button>
    </div>
    <div>
      <p class="text-xl lg:text-3xl font-bold">
        <span v-if="currentTime">{{ getHourMinuteFromISO(currentTime) }}</span>
      </p>
      <button class="lg:hidden mt-1 text-sm" @click="logOut">
        Log Out
      </button>
    </div>
    <div class="text-right text-sm text-white">
      <p>
        {{currentUser?.firstName}} {{currentUser?.lastName}}
      </p>
      <p class="mt-2">
        O h tracked
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

const router = useRouter()
const rootStore = useRootStore()
const userStore = useUserStore()
const timerStore = useTimerStore()

const currentUser = computed(() => userStore.currentUser)
const currentTime = computed(() => timerStore.currentTime)

const logOut = () => {
  rootStore.logOut()
  router.push({name: 'Welcome'})
}

</script>

<style scoped>

</style>