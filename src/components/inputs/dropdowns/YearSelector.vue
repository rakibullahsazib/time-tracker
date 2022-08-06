<template>
  <div class="relative">
    <div @click.stop="toggleCurrentDropdown(id)" class="flex mt-1 px-4 py-2 items-center border border-gray-200 dark:border-gray-500 rounded" :class="disabled ? 'opacity-60': 'cursor-pointer'">
      <p class="flex-grow flex space-x-2 items-center">
        {{ label }}
      </p>
      <img :class="isDropdownShown ? 'rotate-180' : ''" class="flex-shrink-0 w-6 h-6 transform transition-all duration-300" src="/assets/icons/chevron-down.svg" alt="Toggle Dropdown">
    </div>
    <transition name="toggle">
      <div
        v-show="isDropdownShown"
        @click.stop
        class="absolute mt-1 pb-2 w-full flex flex-wrap bg-white dark:bg-gray-900  rounded shadow border border-gray-200 dark:border-gray-500 overflow-y-auto custom-scrollbar z-30"
        :style="{'max-height': dropdownHeight ||'14rem'}"
        data-testid="single-select-dropdown"
      >
        <!-- Change Range -->
        <div class="w-full px-4 py-2 flex-center space-x-2 font-medium">
          <div class="w-5 h-5">
            <img v-if="!minYear || minYear < startYear" @click="changeYearRange('previous')" class="w-5 h-5 transform rotate-90 cursor-pointer" src="/assets/icons/chevron-down.svg" alt="">
          </div>
          <p>
            {{ startYear }} - {{ endYear }}
          </p>
          <div class="w-5 h-5">
            <img v-if="!maxYear || maxYear > endYear" @click="changeYearRange('next')" class="w-5 h-5 transform -rotate-90 cursor-pointer" src="/assets/icons/chevron-down.svg" alt="">
          </div>
        </div>
        <!-- Years -->
        <div class="w-full flex-center flex-wrap">
          <template
            v-for="i in yearsPerPage"
            :key="i"
          >
            <p
              v-if="(startYear + i - 1) >= (minYear || 0) && (startYear + i - 1) <= (maxYear || 9999)"
              @click.stop="onOptionClick(startYear + i - 1)"
              :data-testid="`option_${i}`"
              class="px-2 py-1 flex-center cursor-pointer"
              :class="[selectedYears.includes(startYear + i - 1) ? 'bg-primary-100 dark:bg-gray-700 hover:bg-primary-100 font-medium' : 'bg-white dark:bg-gray-900 hover:bg-gray-100 hover:dark:bg-gray-800']"
            >
              {{ startYear + i - 1 }}
            </p>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRootStore } from '../../../store/rootStore';

const props = defineProps<{
  id: string,
  label: string,
  yearsPerPage: number,
  disabled?: boolean,
  selectedYears: number[],
  minYear?: number,
  maxYear?: number,
  dropdownHeight?: string,
}>()
const emit = defineEmits(['toggle', 'optionClicked'])

const rootStore = useRootStore()

const startYear = ref(new Date().getFullYear() - Math.round(props.yearsPerPage / 2) )
const endYear = ref(startYear.value + props.yearsPerPage)

const changeYearRange = (direction: 'previous' | 'next') => {
  if (direction === 'previous') {
    startYear.value -= props.yearsPerPage
    endYear.value -= props.yearsPerPage
  } else {
    startYear.value += props.yearsPerPage 
    endYear.value += props.yearsPerPage
  }
}

const toggleCurrentDropdown = (id: string) => {
  if (props.disabled) return
  rootStore.toggleCurrentDropdown(id)
}

const isDropdownShown = computed(() => rootStore.currentDropdown === props.id && !props.disabled)

const onOptionClick = (year: number) => {
  if (props.disabled) {
    toggleCurrentDropdown(props.id)
    return
  }
  // toggleCurrentDropdown(props.id)
  emit('optionClicked', year)
}
</script>

<style scoped>

</style>