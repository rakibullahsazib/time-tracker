<template>
    <div @click.self="$emit('closeModal')" class="fixed inset-0  flex justify-center items-center bg-gray-900 bg-opacity-80">
      <div class="relative px-14 py-12 bg-white overflow-y-auto custom-scrollbar rounded" style="width: 30rem; max-width: 80%; max-height: 80vw;">
          <div>
            <img @click="$emit('closeModal')" class="absolute top-6 right-6 w-6 h-6 cursor-pointer" src="/assets/icons/cross-circle.svg" alt="Close" data-testid="modal-close-btn">

            <h6 class="text-center font-semibold text-lg" data-testid="title">
              Save Tracked Time
            </h6>
            <p v-if="errorMessage" class="w-64 mx-auto mt-8 text-sm text-center text-warning-700 font-medium" data-testid="modal-error-message">
              {{ errorMessage }}
            </p>
            <p v-else-if="successMessage" class="mx-auto mt-8 text-sm text-center font-medium" data-testid="modal-success-message">
              {{ successMessage }}
            </p>
            <!-- form -->
            <form v-else @submit.prevent="logTime" class="mt-8 text-sm font-medium" data-testid="modal-time-tracked-form">
              <div class="flex justify-between items-centers space-x-6 flex-wrap">
                <div>
                  <p>
                    Date: {{ getDateMonthYearFromISO(timeLogData.date) }}
                  </p>
                  <p class="mt-1">
                    Duration: {{ formatTimeDifference(getTimeDifferenceInMins(timeLogData.startTime, timeLogData.endTime)) }}
                  </p>
                </div>
                <div class="text-right">
                  <p>
                    Start Time: {{ getHourMinuteFromISO(timeLogData.startTime) }}
                  </p>
                  <p class="mt-1">
                    End Time: {{ getHourMinuteFromISO(timeLogData.endTime) }}
                  </p>
                </div>
              </div>
              <Textarea
                @inputChange="changeDescription"
                id="manual-time-log-description"
                label="Description"
                :required="false"
                inputHeight="7rem"
                :charLimit="255"
                :showCharCount="true"
                class="mt-6 w-full"
              />
              <Button
                type="submit"
                title="Save Time Log"
                class="mt-6 mx-auto"
              />
            </form>
          </div>
      </div>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { TimeLogRequest } from '../../../types/interfaces/timelog.interface';
import { getTimeDifferenceInMins, formatTimeDifference, getDateMonthYearFromISO, getHourMinuteFromISO } from '../../../helpers/dateFormatter';
import Textarea from '../../inputs/text-inputs/Textarea.vue';
import Button from '../../buttons/Button.vue';
import { useTimeLogStore } from '../../../store/timeLogStore';


const props = defineProps<{
  timeLogData: TimeLogRequest
}>()

const timeLogStore = useTimeLogStore()

const description = ref('')
const changeDescription = (value: string) => {
  description.value = value.trim()
}

const successMessage = ref('')
const errorMessage = ref('')

const logTime = () => {
  const res: any = timeLogStore.createTimeLog({
    ...props.timeLogData,
    description: description.value,
  })
  
  if (res.response === 'Success') {
    successMessage.value = res.message
  } else {
    errorMessage.value = res.message
  }
}

</script>

<style scoped>

</style>