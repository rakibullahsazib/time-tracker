<template>
  <div class="flex items-center space-x-2">
    <input
      v-model="inputText"
      type="text"
      :id="id"
      :placeholder="placeholder"
      class=" flex-grow w-full focus:outline-none bg-transparent"
      data-testid="search-input"
    >
    <transition name="fade" mode="out-in">
      <label v-if="!inputText" :for="id" class="block flex-shrink-0">
        <img class="w-5 h-5" src="/assets/icons/search.svg" alt="">
      </label>
      <img v-else @click="clearInput" class="w-4 h-4" src="/assets/icons/cross.svg" alt="">
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  id: string,
  placeholder?: string
  value?: string
}>()

const emit = defineEmits(['inputChange'])

const inputText = ref(props.value || '')
const clearInput = () => {
  inputText.value = ''
}
watch(() => inputText, () => {
  emit('inputChange', inputText)
})
</script>

<style scoped>

</style>