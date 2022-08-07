<template>
  <div class="relative">
    <!-- Label -->
    <div v-if="label" class="para-12-semibold text-gray-600 text-sm">
      {{label}} <span v-if="required">*</span>
    </div>
    <div
      @click.stop="toggle"
      class="relative flex justify-between items-center p-4 py-2 cursor-pointer rounded border border-gray-400 mt-0.5 bg-white"
      :class="{'opacity-70': disabled}"
    >
      <p class="para-16">
        {{ stringifiedDate }}
      </p>
      <img class="w-6 h-6" src="/assets/icons/calendar.svg">
    </div>
    <!-- Dropdown -->
    <transition name="toggle">
      <div
        @click.stop
        v-if="currentDropdown === id"
        class="absolute top-full right-0 mt-1 transform origin-top-right custom-scrollbar bg-white shadow-c rounded z-10"
      >
        <VDatePicker
          v-model="calendarDate"
          is-expanded
          :min-date="minDate ? new Date(minDate): undefined"
          :max-date="maxDate ? new Date(maxDate): undefined"
        />      
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { DatePicker as VDatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css';
import { getDateMonthYearFromISO } from '../../../helpers/dateFormatter'
import { useRootStore } from '../../../store/rootStore';

const props = defineProps<{
  id: string,
  required?: boolean,
  disabled?: boolean,
  date?: string, // ISO
  label?: string,
  minDate?: string, // ISO to restrict start date
  maxDate?: string, // ISO to restrict start date
}>()
const emit = defineEmits(['update'])

const rootStore = useRootStore()

const calendarDate = ref(props.date ? new Date(props.date) : new Date())

const stringifiedDate = computed(() => props.date ? getDateMonthYearFromISO(props.date) : '')

watch(() => calendarDate.value, () => {
  if (!calendarDate.value || props.disabled) return
  emit('update', calendarDate.value.toISOString())
})

const toggle = () => {
  if (props.disabled) return
  rootStore.toggleCurrentDropdown(props.id)
}
const currentDropdown = computed(() => rootStore.currentDropdown)

</script>

<style scoped>
</style>