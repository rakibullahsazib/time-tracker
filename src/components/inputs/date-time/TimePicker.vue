<template>
  <div class="relative">
    <!-- Label -->
    <div v-if="label" class="para-12-semibold text-gray-600 text-sm">
      {{label}} <span v-if="required">*</span>
    </div>
    <div class="border border-gray-500 rounded">
      <VDatePicker
        mode="time"
        v-model="calendarDate"
        is-expanded
        class="time-picker-spa-time-selector w-full max-w-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { DatePicker as VDatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css';

const props = defineProps<{
  id: string,
  required?: boolean,
  disabled?: boolean,
  date: string, // ISO
  label?: string,
}>()
const emit = defineEmits(['update'])

const calendarDate = ref(props.date ? new Date(props.date) : new Date())

watch(() => [calendarDate.value, props.date], ([newCalendarDate, newPropsDate], [oldCalendarDate, oldPropsDate]) => {
  if (!calendarDate.value || props.disabled) return
  if (newCalendarDate !== oldCalendarDate && newPropsDate === oldPropsDate) {
    emit('update', calendarDate.value.toISOString())
    return
  }
  if (newPropsDate !== oldPropsDate && newCalendarDate === oldCalendarDate) {
    calendarDate.value = new Date(newPropsDate)
  }
})

</script>

<style>
.time-picker-spa-time-selector .vc-time-date {
  display: none !important;
}
.time-picker-spa-time-selector {
  border: none
}
</style>