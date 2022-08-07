<template>
  <table class="flex-grow flex flex-col w-full border-collapse" style="min-width: 1000px">
      <thead class="flex-shrink-0 block mr-4 py-1  bg-gray-200">
        <tr class="grid grid-cols-7">
          <th class="px-4 th col-span-1 text-left">
            Date
          </th>
          <th class="th col-span-1 text-right px-4">
            Duration
          </th>
          <th class="th col-span-1 text-center">
            Start Time
          </th>
          <th class="th col-span-1 text-center">
            End Time
          </th>
          <th class="th col-span-3 text-center">
            Description
          </th>
        </tr>
      </thead>
      <div class="flex-grow mr-2 pr-2 overflow-y-auto custom-scrollbar">
        <tbody class="block text-sm text-gray-600 ">
          <tr
            v-for="log in timeLogs"
            class="grid grid-cols-7 bg-white border border-gray-100 border-collapse hover:bg-gray-100 transition-colors duration-300"
          >
            <td class="col-span-1 py-2 px-4 flex items-center space-x-2.5">
              {{ getDateMonthYearFromISO(log.date) }}
            </td>
            <!-- Categories -->
            <td class="col-span-1 py-2 px-4 text-right text-sm truncate">
              {{ formatTimeDifference(getTimeDifferenceInMins(log.startTime, log.endTime)) }}
            </td>
            <td class="col-span-1 py-2 px-4 text-center whitespace-nowrap">
              {{ getHourMinuteFromISO(log.startTime) }}
            </td>
            <td class="col-span-1 py-2 px-4 text-center whitespace-nowrap">
              {{ getHourMinuteFromISO(log.endTime) }}
            </td>
            <td class="col-span-3 py-2 px-4">
              {{ getExcerpt(log.description, 120) }}
            </td>
          </tr>
        </tbody>
      </div>
    </table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTimeLogStore } from '../../../store/timeLogStore.js';
import { getDateMonthYearFromISO, getHourMinuteFromISO, getTimeDifferenceInMins, formatTimeDifference } from '../../../helpers/dateFormatter.js';
import { getExcerpt } from '../../../helpers/stringMethods.js';

const timeLogStore = useTimeLogStore()
const timeLogs = computed(() => timeLogStore.sortedUserTimeLogs)
</script>

<style scoped>

</style>