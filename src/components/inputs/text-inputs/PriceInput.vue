<template>
  <div class="relative transition-300">
    <label
      v-if="label"
      :for="id"
      class="block transition-300"
      :class="[errorMessage ? 'text-warning-600 dark:text-warning-700' : 'text-gray-500 dark:text-gray-400']"
    >
      {{ label }}
    </label>
    <div class="mt-1 flex items-center justify-start border rounded" :class="errorMessage ? 'text-warning-600 border-warning-600 dark:text-warning-700 dark:border-warning-800' : 'text-gray-600 border-gray-200 dark:text-gray-300 dark:border-gray-600'">
      <p class="self-stretch font-bold text-gray-600 flex-shrink-0 flex-center px-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
        {{ currency }}
      </p>
      <input
        type="text"
        :id="id"
        :placeholder="placeholder"
        class="px-2 py-1.5 relative block w-32 flex-shrink bg-transparent text-sm transition-colors duration-300 focus:outline-none rounded"
        :value="intInput"
        @input="update"
      >
    </div>  
    
    <transition name="fade">
      <p v-if="errorMessage" class="absolute w-full top-full mt-0.5 text-xs text-center text-red truncate pr-6" :title="errorMessage">
        {{ errorMessage }}
      </p>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { parseFloatFixed } from '../../../helpers/numberFormatter';
const props = defineProps<{
  id?: string,
  label?: string,
  currency: string,
  placeholder?: string,
  errorMessage?: string,
  initialValue?: number,
  min: number,
  max: number,
}>()
const emit = defineEmits(['inputChange'])

const intInput = ref(parseInt(props.initialValue?.toString().split('.')[0] || '0'))
const floatInput = ref(parseInt(props.initialValue?.toString().split('.')[1] || '0'))

const previous = ref(props.initialValue?.toString() ? props.initialValue?.toString() : '0')

const update = (event: Event) => {
  const target = event.target as HTMLInputElement
  const str = target.value
  let f = parseFloatFixed(str, 2)
  if (!f) {
    target.value = previous.value
  } else {
    if (props.min && parseFloat(f) < props.min) {
      f = props.min.toString()
    } else if (props.max && parseFloat(f) > props.max) {
      f = props.max.toString()
    }
    target.value = f
    previous.value = f
  }
  emit('inputChange', target.value)
}
// const changeInt = (event: Event) => {
//   console.log('input changed')
//   const target = event.target as HTMLInputElement
//   const value = parseInt(target.value)
//   if (isNaN(value) || value < props.min) {
//     intInput.value = props.min
//   } else if (props.max && value >= props.max) {
//     intInput.value = props.max
//     floatInput.value = 0
//   } else {
//     intInput.value = value
//   }
//   target.value = intInput.value.toString()
//   emit('inputChange', intInput.value + floatInput.value)
// }

// const changeFloat = (event: Event) => {
//   console.log('input changed')
//   const target = event.target as HTMLInputElement
//   const value = parseInt(target.value)
//   if (isNaN(value) || value < 0 || intInput.value >= props.max) {
//     floatInput.value = 0
//   } else if (value > 99) {
//     floatInput.value = 99
//   } else {
//     floatInput.value = value
//   }
//   target.value = floatInput.value.toString()
//   emit('inputChange', intInput.value + floatInput.value)

// }
</script>

<style scoped>
</style>