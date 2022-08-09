<template>
  <div class="relative">
    <!-- Label -->
    <label v-if="label" class="block para-12-semibold text-gray-600 text-sm">
      {{label}} <span v-if="required">*</span>
    </label>
    <div
      @click.stop="toggle"
      class="relative flex justify-between items-center p-4 py-2 cursor-pointer rounded border border-gray-400 mt-0.5 bg-white"
      :class="{'opacity-70': disabled}"
      data-testid="selected-date"
    >
      <p class="para-16">
        {{ stringifiedDate }}
      </p>
      <img class="w-6 h-6" src="/assets/icons/calendar.svg">
    </div>
    <!-- Dropdown -->
    <TransitionConditional name="toggle">
      <div
        @click.stop
        v-if="isDropdownShown"
        class="absolute top-full right-0 mt-1 transform origin-top-right custom-scrollbar bg-white shadow-c rounded z-10"
        data-testid="date-picker-dropdown"
      >
        <VDatePicker
          v-model="calendarDate"
          is-expanded
          :min-date="minDate ? new Date(minDate): undefined"
          :max-date="maxDate ? new Date(maxDate): undefined"
        />      
      </div>
    </TransitionConditional>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { DatePicker as VDatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css';
import { getDateMonthYearFromISO } from '../../../helpers/dateFormatter'
import TransitionConditional from '../../TransitionConditional.vue';

const props = defineProps<{
  isDropdownShown: boolean,
  required?: boolean,
  disabled?: boolean,
  date: string, // ISO
  label?: string,
  minDate?: string, // ISO to restrict start date
  maxDate?: string, // ISO to restrict start date
}>()
const emit = defineEmits(['update', 'toggle'])

const calendarDate = ref(props.date ? new Date(props.date) : new Date())

const stringifiedDate = computed(() => props.date ? getDateMonthYearFromISO(props.date) : '')

watch(() => [calendarDate.value, props.date], ([newCalendarDate, newPropsDate], [oldCalendarDate, oldPropsDate]) => {
  if (!calendarDate.value || props.disabled) return
  // emit update on calendar date change
  // emit update on calendar date change
  if (newPropsDate === oldPropsDate &&newCalendarDate !== oldCalendarDate &&  calendarDate.value.toISOString() !== props.date) {
    emit('update', calendarDate.value.toISOString())
    return
  }
  // change calendar date on props date change
  if (newCalendarDate === oldCalendarDate && newPropsDate !== oldPropsDate && calendarDate.value.toISOString() !== props.date) {
    calendarDate.value = new Date(newPropsDate)
  }
})

const toggle = () => {
  if (props.disabled) return
  emit('toggle')
}

</script>

<style scoped>
</style>