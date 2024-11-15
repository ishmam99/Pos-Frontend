<template>
  <div class="min-h-[100vh]">
      <Navbar/>
      <div class="flex w-full" :class="route.name == 'Login' ? 'justify-center items-center':'justify-between'">
        <Sidebar v-if="route.name != 'Login'" />
         <router-view/> 
      </div>
     
      <Foot/> 
  </div>
  
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import Foot from '../components/Footer.vue';
import Sidebar from '../components/Sidebar.vue';
import {useRoute} from 'vue-router'
const route = useRoute();
</script>

