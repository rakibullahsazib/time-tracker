<template>
  <div class="flex-center flex-col">
    <div class="px-10 py-5 flex-center flex-col rounded-lg bg-gray-200"  :class="{'flash': timerStartTime}">
      <img class="w-20 h-20" src="/assets/icons/clock.svg" alt="">
      <p class="mt-4 text-3xl font-bold" data-testid="stopwatch-countdown">
        {{ timerCountdown }}
      </p>
    </div>
    <Button
      @click="startOrStopTimer"
      :title="`${timerStartTime ? 'Stop' : 'Start'} Timer`"
      :btnType="timerStartTime ? 'danger' : 'primary'"
      class="mt-4 w-full"
      data-testid="stopwatch-button"
    />
  </div>
</template>

<script setup lang="ts">
import Button from '../../buttons/Button.vue';
import { useTimerStore } from '../../../store/timerStore';
import { computed } from '@vue/reactivity';
import { useUserStore } from '../../../store/userStore';
import { watch } from 'vue';
import dayjs from 'dayjs';

const emit = defineEmits(['saveTrackedTime'])

const userStore = useUserStore()
const timerStore = useTimerStore()
const timerCountdown = computed(() => timerStore.timerCountdown)
const timerStartTime = computed(() => timerStore.timerStartTime)

watch(() => timerCountdown.value, () => {
  // if time tracker passes to another day stop the timer
  if (!dayjs(timerStore.currentTime).isSame(timerStartTime.value, 'day')) {
    startOrStopTimer()
  }
})
const startOrStopTimer = () => {
  if (!timerStartTime.value) {
    timerStore.setTimerStartTime(new Date().toISOString())
  } else {
    let endTime = timerStore.currentTime
    // if timer has passed the current day change end time to the end of timer start date
    if (!dayjs(endTime).isSame(timerStartTime.value, 'day')) {
      endTime = dayjs(timerStartTime.value).endOf('day').toISOString()
    }
    if (userStore.currentUser) {
      emit('saveTrackedTime', {
        date: timerStartTime.value,
        startTime: timerStartTime.value,
        endTime: endTime,
        description: '',
        userId: userStore.currentUser.id
      })
    }
    timerStore.setTimerStartTime(undefined)
  }
}
</script>

<style scoped>

</style>