<template>
  <div class="flex-center flex-col">
    <div class="px-10 py-5 flex-center flex-col rounded-lg bg-gray-200"  :class="{'flash': timerStartTime}">
      <img class="w-20 h-20" src="/assets/icons/clock.svg" alt="">
      <p class="mt-4 text-3xl font-bold">
        {{ timerCountdown }}
      </p>
    </div>
    <Button
      @click="startOrStopTimer"
      :title="`${timerStartTime ? 'Stop' : 'Start'} Timer`"
      :btnType="timerStartTime ? 'danger' : 'primary'"
      class="mt-4 w-full"
    />
  </div>
</template>

<script setup lang="ts">
import Button from '../../buttons/Button.vue';
import { useTimerStore } from '../../../store/timerStore';
import { computed } from '@vue/reactivity';

const emit = defineEmits(['saveTrackedTime'])

const timerStore = useTimerStore()
const timerCountdown = computed(() => timerStore.timerCountdown)
const timerStartTime = computed(() => timerStore.timerStartTime)

const startOrStopTimer = () => {
  if (!timerStartTime.value) {
    timerStore.setTimerStartTime(new Date().toISOString())
  } else {
    emit('saveTrackedTime', {
      date: timerStartTime.value,
      startTime: timerStartTime.value,
      endTime: timerStore.currentTime,
      description: ''
    })
    timerStore.setTimerStartTime(undefined)
  }
}
</script>

<style scoped>

</style>