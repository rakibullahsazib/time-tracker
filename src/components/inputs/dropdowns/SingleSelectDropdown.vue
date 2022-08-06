<template>
  <div class="relative">
    <label
      v-if="label"
      :for="id"
      class="block transition-300"
      :class="[errorMessage ? 'text-red-600' : 'text-gray-500']"
    >
      {{ label }}
    </label>
    <!-- Click to toggle -->
    <div @click.stop="toggleCurrentDropdown(id)" class="flex px-4 py-2 items-center cursor-pointer border rounded" :class="[selectedOptionId ? 'text-grey-700' : 'text-gray-600', errorMessage ? 'border-warning-600' : 'border-gray-200 dark:border-gray-500', {'mt-1': label}]">
      <div class="flex-grow flex space-x-2 items-center">
        <img v-if="selectedOption?.icon" :src="`/assets/icons/${selectedOption.icon}`" class="flex-shrink-0 w-4 h-4">
        <p class="flex-grow truncate">
          {{ selectedOptionId ? selectedOption?.name : '' }}
        </p>
      </div>
      <img :class="isDropdownShown ? 'rotate-180' : ''" class="flex-shrink-0 w-6 h-6 transform transition-all duration-300" src="/assets/icons/chevron-down.svg" alt="Toggle Dropdown">
    </div>
    <transition name="toggle">
      <div
        v-show="isDropdownShown && options.length"
        class="absolute mt-1 w-full bg-white dark:bg-gray-900 rounded shadow border border-gray-200 dark:border-gray-500 overflow-y-auto custom-scrollbar z-30"
        :style="{'max-height': dropdownHeight ||'14rem'}"
        data-testid="single-select-dropdown"
      >
        <div
          @click.stop="onOptionClick(option.id)"
          v-for="option in options"
          :key="option.id"
          :data-testid="`option_${option.id}`"
          class="px-4 py-1.5 flex space-x-2 items-center cursor-pointer bg-opacity-40 hover:bg-opacity-40"
          :class="option.id === selectedOptionId ? 'bg-primary-100 dark:bg-gray-700 hover:bg-primary-100 font-medium' : 'bg-white dark:bg-gray-900 hover:bg-gray-200 hover:dark:bg-gray-800'"
          :title="option.name"
        >
          <img v-if="option.icon" :src="`/assets/icons/${option.icon}`" class="flex-shrink-0 w-4 h-4">
          <p class="truncate">
            {{ option.name }}
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRootStore } from '../../../store/rootStore';

interface Option {
  id: number,
  name: string,
  icon?: string,
}
const props = defineProps<{
  id: string,
  options: Option[],
  selectedOptionId?: number,
  dropdownHeight?: string,
  label?: string,
  errorMessage?: string
}>()
const emit = defineEmits(['toggle', 'optionClicked'])

const rootStore = useRootStore()

const selectedOption = computed(() => props.options.find(i => i.id === props.selectedOptionId))

const toggleCurrentDropdown = rootStore.toggleCurrentDropdown

const isDropdownShown = computed(() => rootStore.currentDropdown === props.id)

const onOptionClick = (optionId: number) => {
  toggleCurrentDropdown(props.id)
  emit('optionClicked', optionId)
}




</script>
