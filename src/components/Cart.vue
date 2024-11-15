 <template>
    <div class="w-full">
 <h1 class="text-lg font-semibold text-center py-2 border-b-2">Added Items</h1>
              <ul v-if="authStore.cart.items.length > 0">
                <li class="flex justify-between py-2 border-b"> 
                    <p>Product Name</p>
                    <p>Amount</p>
                </li>
                <li v-for="(item ,index) in authStore.cart.items" :key="item.id" class="py-2 border-b">
                 <div class="flex justify-between">
                    <p class="text-md gap-1 flex">
                        <p class="rounded-full px-2 bg-gray-300">{{ index+1 }}</p>
                         <button @click="authStore.addToCart(item.product)" class="px-2 py-1 h-6 flex items-center bg-green-500 text-white rounded-md me-1">+</button>
                        <button @click="authStore.removeFromCart(item.product)"  class="px-2 py-1 h-6 flex items-center bg-red-500 text-white rounded-md me-1">-</button>
                        {{ item.product.name }} 
                    </p> 
                    <div class="flex text-xs font-semibold">
                       
                       <p>
                        ${{ item.product.price }} x {{ item.quantity }}
                    </p>
                    <p>
                     =   ${{ item.product.price * item.quantity }}
                    </p>  
                    </div>
                   
                 </div>
                </li>
              </ul>
              <h1 v-else class="text-lg text-gray-500 text-center py-3">
                No Items Added
              </h1>
              <div class="flex items-center justify-between">
               <h2>Total </h2> <p> = ${{ authStore.cart.total }}</p>
              </div>
             
              <div class="flex items-center justify-between" v-if="!fromNav">
               <h2>Discount </h2> <p> = $
                <input type="number" @change="authStore.updateDiscount()" class="w-20 text-end border-2 border-gray-400 rounded-md" v-model="authStore.cart.discount">
                </p>
              </div>
              <div class="flex border-t-2 mt-2 py-2  items-center justify-between" v-if="!fromNav">
               <h2>Sub Total </h2> <p> = ${{ authStore.cart.sub_total }}</p>
              </div>
              <div class="flex border-t-2 py-2  items-center justify-center">
              <button v-if="!fromNav" @click="checkout()" :disabled="chekingOut" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 flex items-center gap-1 rounded">
           <svg v-if="chekingOut" class="animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"></path></svg>
            Checkout
        </button>
              </div>
              </div>
 </template>
 <script setup>

import Swal from 'sweetalert2';
import { ref } from 'vue';
import { useToast } from "vue-toast-notification";
import { useAuthStore } from '../stores/auth.js';
const {fromNav} = defineProps(['fromNav'])
const toast = useToast();
const chekingOut = ref(false)
const authStore = useAuthStore()
const checkout = async () => {
    chekingOut.value = true
    try {
        const response = await api().post('/checkout',authStore.cart)
        if (response) {
            authStore.cart = {
          items: [],
          total: 0.0,
          discount: 0.0,
          sub_total: 0.0,
        }
            Swal.fire({
                icon: "success",
                title: "Checkout Successfull",
                text: "Your Transaction is successfully completed.",
            });
        }
    }
    catch (error)
    {
        
    toast.error(
        "Something went wrong , checkout failed");
    chekingOut.value = false
    }
chekingOut.value = false
}
</script>