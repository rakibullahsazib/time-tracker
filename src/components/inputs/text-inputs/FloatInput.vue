<template>
  <div class="relative transition-300">
    <label
      v-if="label"
      :for="id"
      class="block transition-300 bg-white"
      :class="[errorMessage ? 'text-red-600' : 'text-gray-500']"
    >
      {{ label }}
    </label>    
    <input
      type="text"
      :id="id"
      :placeholder="placeholder"
      class="mt-1 px-4 py-2 relative block w-full bg-white bg-opacity-0 text-sm border transition-colors duration-300 focus:outline-none rounded"
      :class="errorMessage ? 'text-red-600 border-red-600' : 'text-gray-600 border-gray-200'"
      :value="input"
      @input="changeInput"
    >
    
    <transition name="fade">
      <p v-if="errorMessage" class="absolute w-full top-full mt-0.5 text-xs text-center text-red truncate pr-6" :title="errorMessage">
        {{ errorMessage }}
      </p>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
  id?: string,
  type?: string,
  label?: string,
  placeholder?: string,
  errorMessage?: string,
  initialValue?: number,
  min: number,
  max?:number,
}>()
const emit = defineEmits(['inputChange'])

const input = ref(props.initialValue || '')
const changeInput = (event: Event) => {
  console.log('input changed')
  const target = event.target as HTMLInputElement
  let value = parseFloat(target.value)
  console.log(value)
  if (isNaN(value) || value < props.min) {
    value = props.min
  } else if (props.max && value > props.max) {
    value = props.max
  }
  input.value = value.toFixed(2)
  console.log(input.value)
  target.value = input.value.toString()
  emit('inputChange', input.value)
}
</script>

<style scoped>
</style>