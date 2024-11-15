<template>
  <div class="w-full">
    <h1 class="text-2xl font-semibold text-center border-b-2 py-3">
      Products List
    </h1>
    <div class="flex max-h-[100vh]">
      <div
        class="grid px-5 grid-cols-4 max-h-[90vh] justify-center overflow-y-scroll gap-2"
      >
        <div
          v-for="product in products"
          :key="product.id"
          class="max-w-[200px] flex flex-col items-center rounded shadow-lg bg-gray-200"
        >
          <img
            class="w-32 h-28 p-2 object-cover"
            :src="product.image"
            alt="Product Image"
          />
          <div class="px-2 py-1">
            <div class="font-bold flex justify-between items-start">
              {{ product.name }}({{ product.stock }})
              <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                >${{ product.price }}</span
              >
            </div>
            <p class="text-gray-700 text-sm max-h-[70px] overflow-hidden">
              {{ product.description.substring(0, 50) }}...
            </p>
          </div>
          <div class="px-3 py-2 flex items-center justify-center">
            <button
              :disabled="product.stock < 1"
              @click="
                store.addToCart(product),
                  toast.success('Added To Cart'),
                  product.stock--
              "
              class="inline-block rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
              :class="product.stock > 0 ? 'bg-blue-500' : 'bg-blue-300'"
            >
              {{ product.stock > 0 ? 'Add to Cart' : 'Low Stock' }}
            </button>
          </div>
        </div>
      </div>
      <div
        class="w-1/3 px-3 py-5 border rounded-lg max-h-[90vh] overflow-y-scroll"
      >
        <h1 class="text-lg text-white text-center py-1 bg-slate-700">Cart</h1>
        <Cart :fromNav="false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Cart from '@/components/Cart.vue'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import { useAuthStore } from '../stores/auth.js'

const toast = useToast()
const store = useAuthStore()
const products = ref([])
const getProducts = async () => {
  try {
    const { data } = await api().get('/products')
    if (data) {
      products.value = data.data
    }
  } catch (error) {}
}
onMounted(() => {
  getProducts()
})
</script>

<style lang="scss" scoped></style>
