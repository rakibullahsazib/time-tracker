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
import { getDateMonthYearFromISO } from '../../../helpers/dateFormatter'
import { useRootStore } from '../../../store/rootStore';

const props = defineProps<{
  id: string,
  required?: boolean,
  disabled?: boolean,
  date?: string, // ISO
  label?: string,
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

<style>
.time-picker-spa-time-selector .vc-time-date {
  display: none !important;
}
.time-picker-spa-time-selector {
  border: none
}
</style>