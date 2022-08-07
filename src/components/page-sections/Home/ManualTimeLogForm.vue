<template>
  <div class="relative flex items-stretch space-x-6">
    <div class="w-60 font-medium">
      <DatePicker
        @update="changeSelectedDate"
        id="manual-time-log-date"
        label="Select Date"
        :date="selectedDate"
        :maxDate="today.toISOString()"
        :required="true"
        class="w-full"
      />
      <TimePicker
        @update="changeSelectedStartTime"
        id="manula-time-log-start-time"
        label="Select Start Time"
        :date="selectedStartTime"
        :required="true"
        class="mt-4 w-full"
      />
      <TimePicker
        @update="changeSelectedEndTime"
        id="manula-time-log-start-time"
        label="Select End Time"
        :date="selectedEndTime"
        :required="true"
        class="mt-4 w-full"
      />
    </div>
    <div class="w-60 font-medium">
      <Textarea
        @inputChange="changeDescription"
        id="manual-time-log-description"
        label="Description"
        :required="false"
        inputHeight="7.625rem"
        :limit="255"
      />
      <Button
        @click="logTime"
        :type="timeDifferenceInMins === 0 || errorMessage ? 'disabled': 'primary'"
        :title="`Log ${formattedTimeDifference}`"
        class="mt-6 w-full"
      />
    </div>
    <transition name="fade">
      <p v-if="errorMessage" class="absolute top-full w-full text-center mt-4 text-sm text-warning-700">
        {{errorMessage}}
      </p>
      <p v-else-if="successMessage" class="absolute top-full w-full text-center mt-4 text-sm text-primary-600 font-medium">
        {{successMessage}}
      </p>
    </transition>
  </div>
</template>

<script setup lang="ts">
import DatePicker from '../../inputs/date-time/DatePicker.vue';
import TimePicker from '../../inputs/date-time/TimePicker.vue';
import Textarea from '../../inputs/text-inputs/Textarea.vue';
import Button from '../../buttons/Button.vue';
import { ref, computed } from 'vue';
import { getTimeDifferenceInMins, formatTimeDifference, compareISODates } from '../../../helpers/dateFormatter'
import { useTimeLogStore } from '../../../store/timeLogStore';
import { useUserStore } from '../../../store/userStore';
import { useTimerStore } from '../../../store/timerStore';
import dayjs from 'dayjs'

const timerStore = useTimerStore()
const currentTime = computed(() => timerStore.currentTime)
const userStore = useUserStore()
const timeLogStore = useTimeLogStore()

const today = new Date()
const selectedDate = ref(today.toISOString())
const changeSelectedDate = (iso: string) => {
  errorMessage.value = ''
  successMessage.value = ''
  selectedDate.value = iso

  // update date for selected start time and endtime so that they don't give any unwanted errors
  selectedStartTime.value = dayjs(selectedStartTime.value)
    .set('date', dayjs(selectedDate.value).date())
    .set('month', dayjs(selectedDate.value).month())
    .set('year', dayjs(selectedDate.value).year())
    .toISOString()
  selectedEndTime.value = dayjs(selectedEndTime.value)
    .set('date', dayjs(selectedDate.value).date())
    .set('month', dayjs(selectedDate.value).month())
    .set('year', dayjs(selectedDate.value).year())
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
  if (!compareISODates(selectedStartTime.value, currentTime.value) || !compareISODates(selectedEndTime.value, currentTime.value)) {
    errorMessage.value = 'Sorry, Time cannot be logged for a future time'
    return
  }

  // if selected end time is before start time update start time
  if (!compareISODates(selectedStartTime.value, selectedEndTime.value)) {
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
  description.value = value
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
    successMessage.value = res.message
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)
  } else {
    errorMessage.value = res.message
  }
}
</script>

<style scoped>

</style>