<!-- This is a recursive component -->
<template>
  <div
    v-if="option"
    class="py-0.5 px-4 cursor-pointer"
    
    :title="option.name"
  >
    <div @click.stop="toggleCheckbox(option.id)" class="flex items-center space-x-2 cursor-pointer">
      <!-- Checkbox -->
      <div class="flex-shrink-0 w-4 h-4 flex-center bg-transparent border border-gray-300 dark:border-gray-500 rounded">
        <img v-if="selectedOptionIds.includes(option.id)" class="w-3 h-3" src="/assets/icons/tick.svg" alt="Checked">
      </div>
      <p class="truncate" :class="{'font-bold': selectedOptionIds.includes(option.id)}" :title="option.name">
        {{ option.name }}
      </p>
    </div>
    <ul
      v-if="option.branches.length > 0"
      class="ml-4 mt-1"
    >
      <NestedCheckbox
        v-for="child in option.branches"
        @toggle="toggleCheckbox"
        :key="child.id"
        :option="child"
        :selectedOptionIds="selectedOptionIds"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">

interface Option {
  id: number,
  name: string,
  branches: Option[]
}
defineProps<{
  option: Option,
  selectedOptionIds: number[]
}>()
const emit = defineEmits(['toggle'])
const toggleCheckbox = (optionId: number) => {
  emit('toggle', optionId)
}
</script>

<style scoped>

</style>