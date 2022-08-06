<template>
  <div
    class="transition-300 border rounded"
    :class="[errorMessage ? 'border-warning-600 dark:border-warning-800' : 'border-gray-200 dark:border-gray-600']"
  >
    <!-- Click to toggle -->
    <div @click.stop="toggleCurrentDropdown" class="flex space-x-2 px-4 py-1.5 items-center cursor-pointer">
      <div class="flex-grow flex items-center truncate">
        <span :title="label">{{ label }}</span>
      </div>
      <img :class="isDropdownShown ? 'rotate-180' : ''" class="flex-shrink-0 w-6 h-6 transform transition-all duration-300" src="/assets/icons/chevron-down.svg" alt="Toggle Dropdown">
    </div>
    <transition name="toggle">
      <div
        @click.stop
        v-show="isDropdownShown && options.length"
        class="absolute mt-1 min-w-full right-0 pb-4 flex flex-wrap bg-white dark:bg-gray-900 dark:text-gray-300 rounded shadow border border-gray-300 dark:border-gray-500 overflow-y-auto custom-scrollbar z-30"
        :style="{'max-height': dropdownHeight}"
        data-testid="single-select-dropdown"
      >
          <NestedCheckbox
            v-for="option in options"
            :key="option.id"
            @toggle="onOptionClick"
            :option="option"
            class="mr-4 mt-4"
            :selectedOptionIds="selectedOptionIds"
            :data-testid="`option_${option.id}`"
          />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRootStore } from '../../../store/rootStore';
import NestedCheckbox from '../checkboxes/NestedCheckbox.vue';

interface Option {
  id: number,
  name: string,
  icon?: string,
  branches: Option[]
}
const props = defineProps<{
  dropdownId: string,
  options: Option[],
  selectedOptionIds: number[],
  dropdownHeight?: string,
  label?: string,
  errorMessage?: string
}>()
const emit = defineEmits(['toggle', 'optionClicked'])

const rootStore = useRootStore()
const isDropdownShown = computed(() => rootStore.currentDropdown === props.dropdownId)
const toggleCurrentDropdown = () => rootStore.toggleCurrentDropdown(props.dropdownId)

// const getOption = (optionId: number) => {
//   props.options.find(i => i.id === optionId)
// }

const onOptionClick = (optionId: number) => {
  emit('optionClicked', optionId)
}

</script>

<style scoped>
</style>