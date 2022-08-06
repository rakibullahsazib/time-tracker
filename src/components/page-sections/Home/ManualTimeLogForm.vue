<template>
  <div class="flex items-stretch space-x-6">
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
        :limit="500"
      />
      <Button
        @click="logTime"
        :title="`Log ${formattedTimeDifference}`"
        class="mt-6 w-full"
      />
    </div>
  </div>
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

// const timerStore = useTimerStore()
// const currentTime = computed(() => timerStore.currentTime)
const userStore = useUserStore()
const timeLogStore = useTimeLogStore()

const today = new Date()
const selectedDate = ref(today.toISOString())
const changeSelectedDate = (iso: string) => {
  selectedDate.value = iso
}
const selectedStartTime = ref(today.toISOString())
const changeSelectedStartTime = (iso: string) => {
  selectedStartTime.value = iso
}
const selectedEndTime = ref(today.toISOString())
const changeSelectedEndTime = (iso: string) => {
  selectedEndTime.value = iso
}

const timeDifferenceInMins = computed(() => getTimeDifferenceInMins(selectedStartTime.value, selectedEndTime.value))

const formattedTimeDifference = computed(() => formatTimeDifference(timeDifferenceInMins.value))

const description = ref('')
const changeDescription = (value: string) => {
  description.value = value
}

const logTime = () => {
  if (!userStore.currentUser) return
  timeLogStore.createTimeLog({
    date: selectedDate.value,
    startTime: selectedStartTime.value,
    endTime: selectedEndTime.value,
    description: description.value,
    userId: userStore.currentUser.id
  })
}
</script>

<style scoped>

</style>