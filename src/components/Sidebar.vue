<template>
  <div class="w-1/4 h-screen bg-slate-700">
    <div class="flex flex-col px-2 py-4 w-full space-y-2">
      <router-link
        to="/"
        class="text-white py-2 router-active rounded-md bg-gray-500 px-4 hover:bg-sky-700"
      >
        Home
      </router-link>

      <router-link
        to="/date-sales-report"
        class="text-white rounded-md py-2 bg-gray-500 px-4 hover:bg-sky-700"
      >
        Date Wise Sales Reports
      </router-link>
      <router-link
        to="/product-sales-report"
        class="text-white rounded-md py-2 bg-gray-500 px-4 hover:bg-sky-700"
      >
        Product-Wise Sales Reports
      </router-link>
      <router-link
        to="/product-stock-report"
        class="text-white rounded-md py-2 bg-gray-500 px-4 hover:bg-sky-700"
      >
        Product-Wise Stock Reports
      </router-link>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.router-link-active {
  background-color: rgb(5, 119, 119);
}
</style>
