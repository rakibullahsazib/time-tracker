<template>
  <div>
    <div> 
      <label
        v-if="label"
        :for="id"
        class="text-sm block transition-300"
        :class="[errorMessage ? 'text-warning-600 dark:text-warning-700' : 'text-gray-600 dark:text-gray-400']"
      >
        {{ label }} <span v-if="required">*</span>
      </label>   
      <textarea
        :id="id"
        class="mt-1 relative px-4 py-2 block w-full min-w-full bg-white bg-opacity-0 text-sm border focus:outline-none custom-scrollbar rounded"
        :class="[errorMessage ? 'text-warning-600 border-warning-600 dark:text-warning-700 dark:border-warning-800' : 'text-gray-600 border-gray-500 dark:text-gray-300 dark:border-gray-600', {'resize-none': !resize}]"
        :value="input"
        @input="changeInput"
        :style="{height: inputHeight}"
      >
      </textarea>   
    </div>
    <p v-if="limit" class="mt-0.5 text-gray-500 text-xs">
      {{ input.length }} / {{ limit }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { checkStringLimit } from '../../../helpers/stringMethods';
const props = defineProps<{
  id?: string,
  label?: string,
  inputHeight?: string,
  required?: boolean,
  errorMessage?: boolean,
  resize?: boolean
  initialValue?: string,
  limit: number
}>()
const emit = defineEmits(['inputChange'])

const input = ref(props.initialValue || '')
const changeInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  input.value = checkStringLimit(target.value, props.limit)
  target.value = input.value
  emit('inputChange', input.value.trimEnd())
}
</script>

<style scoped>
</style>