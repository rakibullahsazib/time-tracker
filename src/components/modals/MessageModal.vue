<template>
    <div @click.self.stop="$emit('closeModal')" class="fixed inset-0  flex justify-center items-center bg-gray-900 bg-opacity-80">
        <div @click.stop class="relative px-14 py-12 bg-white overflow-y-auto custom-scrollbar rounded" style="maxHeight: 80vh"  :style="{minWidth: minWidth, maxWidth: maxWidth}">
            <img @click="$emit('closeModal')" class="absolute top-6 right-6 w-6 h-6 cursor-pointer" src="/assets/icons/cross-circle.svg" alt="Close" data-testid="cross-img">

            <h6 class="text-center font-semibold text-lg" data-testid="title">
              {{ title }}
            </h6>
            <p v-if="message" class="mt-8 text-sm text-center font-medium " data-testid="message">
              {{ message }}
            </p>
        </div>
    </div>
</template>


<script setup lang="ts">
defineProps<{
  title?: string,
  message?: string,
  minWidth?: string,
  maxWidth?: string
}>()
</script>

<style scoped>
</style>