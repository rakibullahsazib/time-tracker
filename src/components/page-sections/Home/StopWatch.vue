<template>
  <div class="flex-center flex-col">
    <div class="px-10 py-5 flex-center flex-col bg-gray-300 rounded-lg">
      <img class="w-20 h-20" src="/assets/icons/clock.svg" alt="">
      <p class="mt-4 text-3xl font-bold">
        {{ '20:20:20' }}
      </p>
    </div>
    <Button
      title="Start Timer"
      class="mt-4 w-full"
    />
  </div>
</template>

<script setup lang="ts">
import Button from '../../buttons/Button.vue';

</script>

<style scoped>

</style>