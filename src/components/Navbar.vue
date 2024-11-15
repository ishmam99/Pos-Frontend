<template>
  <div class="w-full">
    <nav class="bg-gray-800 py-4 px-10">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-lg text-white font-bold">Simple POS</div>
        <div class="flex items-center gap-2" v-if="authStore.isAuthenticated">
          <div class="text-white mr-4">
            Logged in as: {{ authStore.user.name }}
          </div>
          <div class="relative">
            <button
              @click="showCart = !showCart"
              class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            >
              Cart ({{ authStore.cart.items.length }})
            </button>
            <div
              v-if="showCart"
              class="absolute rounded-md top-full right-0 bg-white shadow-md p-4 w-80"
            >
              <Cart :fromNav="true" />
            </div>
          </div>
          <button
            @click="logout()"
            :disabled="loggingOut"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 flex items-center gap-1 rounded"
          >
            <svg
              v-if="loggingOut"
              class="animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
            >
              <path
                d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"
              ></path>
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import Cart from './Cart.vue'

const router = useRouter()
const showCart = ref(false)
const loggingOut = ref(false)

const authStore = useAuthStore()
const logout = async () => {
  loggingOut.value = true
  const response = await api().post('/logout')
  if (response) {
    authStore.logout(router)
  }
  loggingOut.value = false
}
</script>

<style lang="scss" scoped></style>
