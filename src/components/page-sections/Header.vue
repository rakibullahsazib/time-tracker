<template>
  <div class="px-10 py-4 flex items-center justify-between bg-gray-800 text-gray-200">
    <router-link :to="{name: 'Home'}" class=" text-2xl font-semibold italic">
      Time Tracker
    </router-link>
    <p class="text-">
      O h tracked
    </p>
    <div>
      <p>
        {{currentUser?.firstName}} {{currentUser?.lastName}}
      </p>
      <p>
        O h tracked
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '../../store/userStore.js';

const userStore = useUserStore()
const currentUser = computed(() => userStore.currentUser)

</script>

<style scoped>

</style>