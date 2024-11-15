<template>
  <div class="w-full">
    <h1 class="text-2xl font-semibold text-center border-b-2 py-3">
      Product Stock Report
    </h1>
    <div class="flex space-y-2 flex-col">
      <div class="overflow-y-scroll max-h-screen px-4">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Product Name
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Available Stock
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="report_list.length > 0"
              v-for="report in report_list"
              :key="report.date"
            >
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {{ report.name }}
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {{ report.stock }}
              </td>
            </tr>
            <tr v-else-if="loading">
              <td colspan="6" class="text-center text-gray-500 text-lg">
                Wait a few moment , Data loading
              </td>
            </tr>
            <tr v-else>
              <td colspan="6" class="text-center text-gray-500 text-lg">
                No Data found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const report_list = ref([])
const loading = ref(true)
const getDateSalesReport = async () => {
  try {
    {
      const response = await api().get(`/product-stock-report`)
      if (response.data) {
        report_list.value = response.data.data
        console.log(report_list.value)
      }
      loading.value = false
    }
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  getDateSalesReport()
})
</script>

<style lang="scss" scoped></style>
