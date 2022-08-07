<template>
  <div class="relative transition-300">
    <label
      v-if="label"
      :for="id"
      class="block transition-300"
      :class="[errorMessage ? 'text-warning-600' : 'text-gray-500']"
    >
      {{ label }} <span v-if="required">*</span>
    </label>
    <input
      :type="type || 'text'"
      :id="id"
      :placeholder="placeholder"
      class="mt-1 px-4 py-3 relative block w-full bg-white bg-opacity-0 text-sm border transition-colors duration-300 focus:outline-none rounded"
      :class="errorMessage ? 'text-warning-600 border-warning-600' : 'text-gray-600 border-gray-400'"
      :value="input"
      @input="changeInput"
    >
    
    <transition name="fade">
      <p v-if="errorMessage" class="absolute w-full top-full mt-1 text-xs text-center text-red truncate pr-6 text-warning-700" :title="errorMessage">
        {{ errorMessage }}
      </p>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { checkStringLimit } from '../../../helpers/stringMethods';
const props = defineProps<{
  id?: string,
  type?: string,
  label?: string,
  placeholder?: string,
  errorMessage?: string,
  initialValue?: string
  charLimit: number,
  required?: boolean
}>()
const emit = defineEmits(['inputChange'])

const input = ref(props.initialValue || '')
const changeInput = (event: Event) => {
  console.log('input changed')
  const target = event.target as HTMLInputElement
  input.value = checkStringLimit(target.value, props.charLimit)
  target.value = input.value
  emit('inputChange', input.value.trimEnd())
}
</script>

<style scoped>
</style>