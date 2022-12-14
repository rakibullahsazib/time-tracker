<template>
  <div class="p-4 w-full h-screen flex-center flex-col ">
    <h2 class="text-lg lg:text-2xl font-semibold">
      Welcome to
    </h2>
    <h1 class="mt-4 text-3xl lg:text-6xl font-bold text-center">
      Time Tracker
    </h1>
    <form @submit.prevent="signIn" class="mt-6 lg:mt-12 w-80 sm:w-96 p-4 sm:p-0">
      <TextInput
        @inputChange="changeFirstName"
        @inputBlur="checkForFirstNameError"
        id="firstName"
        label="First Name"
        :charLimit="127"
        :required="true"
        :errorMessage="firstNameErrorMsg"
        class="w-full font-medium text-sm"
      />
      <TextInput
        @inputChange="changeLastName"
        @inputBlur="checkForLastNameError"
        id="lastName"
        label="Last Name"
        :charLimit="127"
        :required="true"
        :errorMessage="lastNameErrorMsg"
        class="mt-6 w-full font-medium text-sm"
      />
      <TextInput
        @inputChange="changeEmail"
        @inputBlur="checkForEmailError"
        id="email"
        label="Email Address"
        :errorMessage="emailErrorMsg"
        :charLimit="255"
        :required="true"
        class="mt-6 w-full font-medium text-sm"
      />
      <div class="relative">
        <Button
          type="submit"
          title="Sign In"
          class="mt-10 lg:mt-12 w-full"
        />
        <TransitionConditional name="fade">
          <p v-if="signInErrorMsg" class="absolute w-full top-full mt-2 text-xs text-center font-medium text-red truncate pr-6 text-warning-700" :title="signInErrorMsg" data-testid="signInErrorMsg">
            {{ signInErrorMsg }}
          </p>
        </TransitionConditional>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TextInput from '../components/inputs/text-inputs/TextInput.vue';
import Button from '../components/buttons/Button.vue';
import { debounce } from '../helpers/debounce';
import { validateEmailAddress } from '../helpers/inputValidators';
import { useUserStore } from '../store/userStore';
import { useRouter } from 'vue-router';
import TransitionConditional from '../components/TransitionConditional.vue';

const router = useRouter()
const userStore = useUserStore()

const firstName = ref('')
const firstNameErrorMsg = ref('')
const checkForFirstNameError = () => {
  if (!firstName.value) {
    firstNameErrorMsg.value = 'This field can not be empty'
  }
}
const changeFirstName = (value: string) => {
  signInErrorMsg.value = ''
  firstNameErrorMsg.value = ''
  firstName.value = value
}

const lastName = ref('')
const lastNameErrorMsg = ref('')
const checkForLastNameError = () => {
  if (!lastName.value) {
    lastNameErrorMsg.value = 'This field can not be empty'
  }
}
const changeLastName = (value: string) => {
  signInErrorMsg.value = ''
  lastNameErrorMsg.value = ''
  lastName.value = value
}

const email = ref('')
const emailErrorMsg = ref('')
const checkForEmailError = () => {
  if (!validateEmailAddress(email.value)) {
    emailErrorMsg.value = 'Please provide a valid email address'
    return
  }
}
const changeEmail = (value: string) => {
  signInErrorMsg.value = ''
  emailErrorMsg.value = ''
  email.value = value

}

const signInErrorMsg = ref('')

const signIn = () => {
  // check for errors first
  checkForFirstNameError()
  checkForLastNameError()
  checkForEmailError()

  if (!firstNameErrorMsg.value && !lastNameErrorMsg.value && !emailErrorMsg.value) {
    // console.log('sign in')
    signInErrorMsg.value = userStore.createUser({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value
    })
    if (userStore.currentUser?.id) {
      router.push({name: 'Home'})
    }
  }
}

</script>

<style scoped>

</style>