<template>
  <div
    class="relative transition-300 border rounded"
    :class="[errorMessage ? 'border-red-500' : 'border-gray-300 dark:border-gray-500']"
  >
    <!-- Click to toggle -->
    <div @click.stop="$emit('toggle')" class="flex px-4 py-0.5 items-center cursor-pointer">
      <div class="flex-grow flex space-x-2 items-center">
        <p>
          <span>{{ label }}</span>
          <span v-if="selectedOptionIds.length"> ({{ selectedOptionIds.length }})</span>
        </p>
      </div>
      <img :class="isDropdownShown ? 'rotate-180' : ''" class="flex-shrink-0 w-6 h-6 transform transition-all duration-300" src="/assets/icons/chevron-down.svg" alt="Toggle Dropdown">
    </div>
    <transition name="toggle">
      <div
        v-show="isDropdownShown && options.length"
        class="absolute mt-1 w-full bg-white dark:bg-gray-900 dark:text-gray-300 rounded shadow border border-gray-300 dark:border-gray-500 overflow-y-auto custom-scrollbar z-30"
        :style="{'max-height': dropdownHeight}"
        data-testid="single-select-dropdown"
      >
          <CheckboxSingle
            v-for="option in options"
            :key="option.id"
            @toggle="onOptionClick(option.id)"
            :name="option.name"
            :checked="selectedOptionIds.includes(option.id)"
            :data-testid="`option_${option.id}`"
            class="px-4 py-0.5 flex space-x-2 items-center cursor-pointer"
            :class="{'bg-primary-100 dark:bg-gray-800': selectedOptionIds.includes(option.id)}"
            :title="option.name"
          />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import CheckboxSingle from '../checkboxes/CheckboxSingle.vue';

interface Option {
  id: number,
  name: string,
  icon?: string,
}
const props = defineProps<{
  id?: string,
  options: Option[],
  selectedOptionIds: number[],
  dropdownHeight?: string,
  isDropdownShown: boolean
  label?: string,
  errorMessage?: string
}>()
const emit = defineEmits(['toggle', 'optionClicked'])

// const getOption = (optionId: number) => {
//   props.options.find(i => i.id === optionId)
// }

const onOptionClick = (optionId: number) => {
  emit('optionClicked', optionId)
}

</script>

<style scoped>
</style>