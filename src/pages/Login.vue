<template>
  <div class="py-5 px-[5%] mt-20 min-h-[calc(90vh-80px)]">
    <div
      class="lg:px-72 md:px-18 sm:px-8 pb-6 flex flex-col items-center justify-end border-b-2 mb-5"
    >
      <p class="font-bold text-3xl lg:text-5xl text-[#797979]">
        {{ route.name }}
      </p>
    </div>
    <div class="px-8 py-5 max-w-3xl mx-auto bg-teal-500 shadow-md rounded-lg">
      <form class="flex flex-col" @submit.prevent="submitLogin">
        <div
          v-if="errorData?.message"
          class="text-red-500 bg-red-100 rounded-lg p-2 text-center flex justify-center"
        >
          {{ errorData.message }} !!
        </div>
        <div class="flex flex-col gap-2 mb-3">
          <p class="font-semibold text-xl text-white">Email :</p>
          <div
            v-if="errorData?.email"
            class="text-red-500 bg-red-100 rounded-lg p-2 text-center flex justify-center"
          >
            {{ errorData.email[0] }}
          </div>
          <input
            @change="errorData = null"
            v-model="loginFormData.email"
            type="email"
            ref="inputRef"
            placeholder="Your email"
            class="w-full py-1.5 px-2 outline-none"
          />
        </div>
        <div class="flex flex-col gap-2 mb-3 relative">
          <p class="font-semibold text-xl text-white">Password :</p>
          <input
            @change="errorData = null"
            v-model="loginFormData.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="8 digit password"
            class="w-full py-1.5 px-2 outline-none"
          />
          <button
            type="button"
            @click="togglePasswordVisibility"
            class="absolute right-2 top-10"
          >
            <span v-if="showPassword">Hide</span>
            <span v-else>Show</span>
          </button>
        </div>

        <button
          type="submit"
          class="py-1.5 mt-4 px-5 rounded-md text-white text-lg bg-blue-600 hover:bg-blue-700 w-full flex justify-center items-center gap-2"
          :disabled="loginload"
        >
          <svg
            v-if="loginload"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-6 h-6 animate-spin"
            fill="currentColor"
          >
            <path
              d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"
            ></path>
          </svg>
          Submit
        </button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { useAuthStore } from '/src/stores/auth'

const toast = useToast()
const showPassword = ref(false)
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
const inputRef = ref(null)
const errorData = ref()
const AuthStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const loginload = ref(false)
const loginFormData = ref({
  email: '',
  password: '',
})
const submitLogin = async () => {
  loginload.value = true
 

  try {
    const response = await api().post('/login', loginFormData.value)
    console.log(response)
    if (response?.status == 200) {
      AuthStore.isAuthenticated = true
      AuthStore.user = response.data.user
      AuthStore.token = response.data.access_token
      
      router.push('/')
    }
    else {
      toast.error('Something Went Wrong',response.data.message)
    }
  } catch (error) {
    loginload.value = false
    toast.error(error.response.data.message)
  }
  loginload.value = false
}
</script>
