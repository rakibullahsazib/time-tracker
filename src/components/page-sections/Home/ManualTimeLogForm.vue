<template>
  <div class="flex items-stretch space-x-6">
    <div class="w-60 font-medium">
      <DatePicker
        id="manual-time-log-date"
        label="Select Date"
        :date="selectedDate"
        :required="true"
        class="w-full"
      />
      <TimePicker
        id="manula-time-log-start-time"
        label="Select Start Time"
        :date="selectedStartTime"
        :required="true"
        class="mt-4 w-full"
      />
      <TimePicker
        id="manula-time-log-start-time"
        label="Select End Time"
        :date="selectedEndTime"
        :required="true"
        class="mt-4 w-full"
      />
    </div>
    <div class="w-60 font-medium">
      <Textarea
        id="manual-time-log-description"
        label="Description"
        :required="true"
        inputHeight="7.625rem"
        :limit="500"
      />
      <Button
        title="Save Timelog"
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


const today = new Date()
const selectedDate = today.toISOString()
const selectedStartTime = today.toISOString()
const selectedEndTime = today.toISOString()
</script>

<style scoped>

</style>