<template>
  <div
    class="relative p-2 py-8 w-full flex flex-col items-center border-2 border-dashed rounded transition duration-300"
    :class="[isInputHighlighted ? 'border-primary-300 dark:border-primary-500 bg-primary-50 dark:bg-gray-900' : 'border-gray-300 dark:border-gray-600', {'opacity-50': disabled}]"
  >
    <img
      class="w-20 h-20 transform transition duration-300"
      :class="isInputHighlighted ? 'opacity-100 scale-110' : 'opacity-80'"
      src="/assets/icons/upload.svg"
      alt=""
    >
    <p class="mt-4 text-center">
      <img class="inline-block w-6 h-6" src="/assets/icons/upload.svg" alt="">
      Drop your files here. or
      <span
        @click="clickInput"
        class="text-primary-500 font-semibold cursor-pointer"
      >
        Browse
      </span>
    </p>
    <input
      @change="onFileChange"
      @dragenter="isInputHighlighted = true"
      @dragleave="isInputHighlighted = false"
      @mouseleave="isInputHighlighted = false"
      :name="name"
      :disabled="disabled === true"
      class="absolute inset-0 opacity-0 cursor-pointer"
      type="file"
      multiple accept="image/png, image/jpeg"
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  name: string,
  disabled?: boolean,
}>()
const emit = defineEmits(['fileChange'])

const clickInput = () => {
  const inputEl = document.querySelector(`input[name=${props.name}]`) as HTMLElement
  inputEl.click()
}

const fileUrls = ref<string[]>([])
const onFileChange = (event: Event) => {
  isInputHighlighted.value = false
  const target = event.target as HTMLInputElement
  const files = target.files!
  console.log(files)
  for(const file of files) {
    fileUrls.value.push(URL.createObjectURL(file))
  }
  // TODO: check file size
  console.log(fileUrls.value)
  emit('fileChange', fileUrls.value)
}

const isInputHighlighted = ref(false) 
</script>

<style scoped>

</style>