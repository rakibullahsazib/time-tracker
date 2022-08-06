<template>
    <div class="relative">
        <transition-group name="listFade" mode="out-in">
        <label key="label" class="block text-gray-500" :for="label">
          {{label}}
          <span v-if="required" class="text-primary-500">*</span>
        </label>

        <p key="alert-name" v-if="duplicateAlert == true" class="block para-12-semibold name-state-alert">
          Duplicate was Found
        </p>

        <div key="tags" class="block w-full mt-0.5  text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded"
        :class="{'border-state-alert': duplicateAlert, 'opacity-70': disabled }"
        >
            <div class="p-4 py-2 pb-0 flex flex-wrap rounded">
                <TextPill
                    v-for="tag in tags"
                    :key="tag.name"
                    @delete="deleteItem(tag.name)"
                    :text="tag.name"
                    icon='cross.svg'
                    class="mb-2 mr-2 w-auto h-8 border dark:text-gray-300 border-gray-300 dark:border-gray-600"
                />
                <!-- Input with suggestion -->
                <input 
                    v-if="isInputShown"
                    v-model="inputText" 
                    @keyup.enter="addItem"
                    @keydown.down.prevent="highlightSuggestion(1)"
                    @keydown.up.prevent="highlightSuggestion(-1)"
                    @focus="isDropdownShown = true"
                    @blur="onBlur"
                    :disabled="disabled === true"
                    class="-mt-1 block flex-grow w-10 h-10 bg-transparent para-16 rounded dark:text-gray-300 outline-none focus-within:outline-none"
                    style="min-width: 100px"
                    type="name" :name="label"  :placeholder="placeholder"
                >
                
                <!-- Dropdown -->
                <transition name="toggle">
                    <div v-if="suggestions && isDropdownShown && inputText && filteredSuggestions.length" class="absolute w-full top-full left-0 mt-2 px-4 pt-2 max-h-24 overflow-y-auto custom-scrollbar flex flex-wrap rounded border border-dark-300 bg-white z-10">
                        <transition-group name="group">
                            <div
                                v-for="(suggestion, suggestionIndex) in filteredSuggestions"
                                :key="suggestion.id"
                                @click="addSuggestion(suggestion.name)"
                                class="mr-2 mb-2 px-3 py-1 para-12 cursor-pointer rounded-full border border-gray-300"
                                :class="{'bg-primary-50 border-primary-600': suggestionIndex === currentHighlightedSuggestionIndex}"
                            >
                                {{ suggestion.name }}
                            </div>
                        </transition-group>
                    </div>
                </transition>
            </div>
        </div>
        </transition-group>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { debounce } from '../../../helpers/debounce';
import TextPill from '../../textboxes/TextPill.vue';
interface Tag {
    id?: number
    name: string
}
interface Suggestion {
    id: number
    name: string
}

const props = defineProps<{
    label:string,
    required?: boolean,
    tags?: Tag[],
    suggestions?: Suggestion[],
    placeholder?: string,
    duplicateAlert: boolean,
    maxTags?: number,
    charLimit: number,
    disabled?: boolean
}>()
const emit = defineEmits(['addTag', 'deleteTag'])

const isInputShown = computed(() => {
    if (!props.maxTags) return true
    if (props.maxTags) {
        if (!props.tags) return true
        else if (props.tags.length < props.maxTags) return true
    }
    return false
})

const isDropdownShown = ref(false)

const inputText = ref('')

const currentHighlightedSuggestionIndex = ref(-1)

const highlightSuggestion = (direction: number) => {
    if (filteredSuggestions.value.length) {
        if (direction === 0) {
            currentHighlightedSuggestionIndex.value = filteredSuggestions.value[0].id
        } else if (direction === -1 && currentHighlightedSuggestionIndex.value > -1) {
            currentHighlightedSuggestionIndex.value -= 1
        } else if (direction === 1 && currentHighlightedSuggestionIndex.value < filteredSuggestions.value.length - 1) {
            currentHighlightedSuggestionIndex.value += 1
        }
    }
}

const addItem = () => {
    if (props.disabled) return
    console.log("User Entered Text", inputText.value)
    if (currentHighlightedSuggestionIndex.value > -1) {
    addSuggestion(filteredSuggestions.value[currentHighlightedSuggestionIndex.value].name)
    currentHighlightedSuggestionIndex.value = -1
    } else {
        if (!inputText.value) return
        emit('addTag', inputText.value)
    }
    inputText.value = '';
}
const deleteItem = (name: string) => {
    if (props.disabled) return
    console.log("deleteItem -- ", name)
    emit('deleteTag', name)
    filterSuggestion()
}
watch(() => inputText.value, (to) => {
    if (to) filterSuggestion()
    currentHighlightedSuggestionIndex.value = -1
})
const filteredSuggestions = ref<Suggestion[]>([])

const filterSuggestion = debounce(() => {
    console.log('filtering')
    if (!props.suggestions) return
    filteredSuggestions.value = []

    suggestionLoop:
    for (const suggestion of props.suggestions) {
        if (props.tags && props.tags.length) {
            for(const tag of props.tags) {
                if(tag.id === suggestion.id || tag.name.toLowerCase() === suggestion.name.toLowerCase()) {
                    continue suggestionLoop
                }
            }
        }
        
        // if already in tags dont show that
        if (suggestion.name.toLowerCase().indexOf(inputText.value.toLowerCase()) > -1) {
            filteredSuggestions.value.push(suggestion)
        }
    }
}, 500)

const addSuggestion = (suggestionName: string) => {
    emit('addTag', suggestionName)
    inputText.value = '';
    filteredSuggestions.value = []
}
const onBlur = () => {
    isDropdownShown.value = false
    inputText.value = ''
}
</script>