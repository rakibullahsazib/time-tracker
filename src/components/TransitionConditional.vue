<template>
  <!-- Used as a wayaround for cypress testing -->
  <slot v-if="testEnv"></slot>
  <transition v-else :name="name" :mode="mode || 'default'">
    <slot></slot>
  </transition>
</template>

<script setup lang="ts">
defineProps<{
  name?: string,
  mode?: "default" | "in-out" | "out-in" | undefined
}>()
const testEnv = import.meta.env.MODE === 'test'
console.log(testEnv)
</script>

<style scoped>

</style>