<template>
  <div>
    <div> 
      <label
        v-if="label"
        :for="id"
        class="text-sm block transition-300"
        :class="[errorMessage ? 'text-warning-600' : 'text-gray-600']"
      >
        {{ label }} <span v-if="required">*</span>
      </label>   
      <textarea
        :id="id"
        class="mt-1 relative px-4 py-2 block w-full min-w-full bg-white bg-opacity-0 text-sm border focus:outline-none custom-scrollbar rounded"
        :class="[errorMessage ? 'text-warning-600 border-warning-600' : 'text-gray-600 border-gray-500', {'resize-none': !resize}]"
        :value="input"
        @input="changeInput"
        :style="{height: inputHeight}"
      >
      </textarea>   
    </div>
    <p v-if="showCharCount" data-testid="charCount" class="mt-0.5 text-gray-500 text-xs">
      {{ input.length }} / {{ charLimit }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { checkStringLimit } from '../../../helpers/stringMethods';
const props = defineProps<{
  id?: string,
  label?: string,
  inputHeight?: string,
  required?: boolean,
  errorMessage?: boolean,
  resize?: boolean
  initialValue?: string,
  charLimit: number,
  showCharCount?: boolean,
}>()
const emit = defineEmits(['inputChange'])

const input = ref(props.initialValue || '')
const changeInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  input.value = checkStringLimit(target.value, props.charLimit)
  target.value = input.value
  emit('inputChange', input.value.trimEnd())
}

watch(() => props.initialValue, () => {
  console.log('update from props')
  input.value = props.initialValue || ''
})
</script>

<style scoped>
</style>