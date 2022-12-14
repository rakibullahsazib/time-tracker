<template>
  <form @submit.prevent="logTime" class="relative xl:grid grid-cols-2 gap-6" data-testid="manual-time-log-form">
    <div class="w-60 font-medium">
      <DatePicker
        @update="changeSelectedDate"
        @toggle="toggleCurrentDropdown('manual-time-log-date-picker')"
        :isDropdownShown="currentDropdown === 'manual-time-log-date-picker'"
        label="Select Date"
        :date="selectedDate"
        :maxDate="today.toISOString()"
        :required="true"
        class="w-full"
        data-testid="manual-time-log-date-picker"
      />
      <TimePicker
        @update="changeSelectedStartTime"
        label="Select Start Time"
        :date="selectedStartTime"
        :required="true"
        class="mt-4 w-full"
        data-testid="manual-time-log-start-time-picker"
      />
      <TimePicker
        @update="changeSelectedEndTime"
        label="Select End Time"
        :date="selectedEndTime"
        :required="true"
        class="mt-4 w-full"
        data-testid="manual-time-log-end-time-picker"
      />
    </div>
    <div class="mt-4 xl:mt-0 w-60 font-medium">
      <Textarea
        @inputChange="changeDescription"
        id="manual-time-log-description"
        label="Description"
        :initialValue="description"
        :required="false"
        inputHeight="7.625rem"
        :charLimit="255"
        :showCharCount="true"
        data-testid="manual-time-log-description"
      />
      <Button
        type="submit"
        :btnType="timeDifferenceInMins === 0 || errorMessage ? 'disabled': 'primary'"
        :title="`Log ${formattedTimeDifference}`"
        class="mt-6 w-full"
        data-testid="manual-time-log-submit-btn"
      />
    </div>
    <TransitionConditional name="fade">
      <p v-if="errorMessage" class="absolute top-full w-full text-center mt-4 text-sm text-warning-700" data-testid="manual-time-log-error-message">
        {{errorMessage}}
      </p>
      <p v-else-if="successMessage" class="absolute top-full w-full text-center mt-4 text-sm text-primary-600 font-medium" data-testid="manual-time-log-success-message">
        {{successMessage}}
      </p>
    </TransitionConditional>
  </form>
</template>

<script setup lang="ts">
import DatePicker from '../../inputs/date-time/DatePicker.vue';
import TimePicker from '../../inputs/date-time/TimePicker.vue';
import Textarea from '../../inputs/text-inputs/Textarea.vue';
import Button from '../../buttons/Button.vue';
import { ref, computed } from 'vue';
import { getTimeDifferenceInMins, formatTimeDifference } from '../../../helpers/dateFormatter'
import { useTimeLogStore } from '../../../store/timeLogStore';
import { useUserStore } from '../../../store/userStore';
import { useTimerStore } from '../../../store/timerStore';
import dayjs from 'dayjs'
import { useRootStore } from '../../../store/rootStore';
import TransitionConditional from '../../TransitionConditional.vue';

const timerStore = useTimerStore()
const rootStore = useRootStore()
const userStore = useUserStore()
const timeLogStore = useTimeLogStore()

const currentTime = computed(() => timerStore.currentTime)
const today = new Date()
const selectedDate = ref(today.toISOString())
const changeSelectedDate = (iso: string) => {
  errorMessage.value = ''
  successMessage.value = ''
  selectedDate.value = iso

  // update date for selected start time and endtime so that they don't give any unwanted errors
  const date = dayjs(selectedDate.value).date()
  const month = dayjs(selectedDate.value).month()
  const year = dayjs(selectedDate.value).year()
  selectedStartTime.value = dayjs(selectedStartTime.value)
    .set('date', date)
    .set('month', month)
    .set('year', year)
    .toISOString()
  selectedEndTime.value = dayjs(selectedEndTime.value)
    .set('date', date)
    .set('month', month)
    .set('year', year)
    .toISOString()

  checkForErrors()
}
const selectedStartTime = ref(today.toISOString())
const changeSelectedStartTime = (iso: string) => {
  errorMessage.value = ''
  successMessage.value = ''
  selectedStartTime.value = iso

  checkForErrors()
}
const selectedEndTime = ref(today.toISOString())
const changeSelectedEndTime = (iso: string) => {
  errorMessage.value = ''
  successMessage.value = ''
  selectedEndTime.value = iso

  checkForErrors()
}

const checkForErrors = () => {
  // check selected start time or end time does not pass the current time
  if (
    dayjs(selectedStartTime.value).isAfter(currentTime.value) || 
    dayjs(selectedEndTime.value).isAfter(currentTime.value)
  ) {
    errorMessage.value = 'Sorry, Time cannot be logged for a future time'
    return
  }

  // check selected start time or end time does pass the time tracker start time when time tracker is on
  if (timerStore.timerStartTime && 
    (
      dayjs(selectedStartTime.value).isAfter(timerStore.timerStartTime) || 
      dayjs(selectedEndTime.value).isAfter(timerStore.timerStartTime)
    )
  ) {
    errorMessage.value = 'Sorry, This time slot coincides with the current time being tracked on. Please, stop the time tracker to log time manually'
    return
  }

  // if selected end time is before start time update start time
  if (dayjs(selectedStartTime.value).isAfter(selectedEndTime.value)) {
     errorMessage.value = 'Sorry, end time can not be before or same as start time'
     return
  }
}

const errorMessage = ref('')
const successMessage = ref('')

const timeDifferenceInMins = computed(() => getTimeDifferenceInMins(selectedStartTime.value, selectedEndTime.value))

const formattedTimeDifference = computed(() => formatTimeDifference(timeDifferenceInMins.value))

const description = ref('')
const changeDescription = (value: string) => {
  description.value = value.trim()
}

const logTime = () => {
  if (!userStore.currentUser) return
  checkForErrors()
  if (errorMessage.value) return

  const res: any = timeLogStore.createTimeLog({
    date: selectedDate.value,
    startTime: selectedStartTime.value,
    endTime: selectedEndTime.value,
    description: description.value,
    userId: userStore.currentUser.id
  })
  
  if (res.response === 'Success') {
    selectedEndTime.value = dayjs(selectedEndTime.value).add(1, 'millisecond').toISOString()
    selectedStartTime.value = dayjs(selectedEndTime.value).subtract(1, 'millisecond').toISOString()
    description.value = ''
    successMessage.value = res.message
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)
  } else {
    errorMessage.value = res.message
  }
}
const toggleCurrentDropdown = (drpodown: string) => {
  rootStore.toggleCurrentDropdown(drpodown)
}
const currentDropdown = computed(() => rootStore.currentDropdown)
</script>

<style scoped>

</style>