<template>
  <div class="w-full">
    <h1 class="text-2xl font-semibold text-center border-b-2 py-3">
      Sales Report
    </h1>
    <div class="flex space-y-2 flex-col">
      <div class="flex justify-end gap-4 items-center my-4 px-5">
        <label for="From date"> From Date</label>
        <input
          v-model="start_date"
          class="bg-gray-100 px-3 py-2 rounded-md border border-gray-700"
          placeholder="From Date"
          type="date"
        />
        <label for="From date"> To Date</label>
        <input
          v-model="end_date"
          class="bg-gray-100 px-3 py-2 rounded-md border border-gray-700"
          placeholder="To Date"
          type="date"
        />

        <button
          @click="getDateSalesReport"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Filter by Date Range
        </button>
      </div>
      <div class="overflow-y-scroll px-4">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Sold By
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Total Items
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Total Sales
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Discount
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Sub Total
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
                {{ moment(report.date).format('YYYY-MM-DD') }}
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {{ report.done_by }}
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {{ report.product_qty }}
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {{ report.total }}
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {{ report.discount }}
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {{ report.sub_total }}
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
import moment from 'moment'
import { onMounted, ref } from 'vue'

const start_date = ref()
const end_date = ref()
const report_list = ref([])
const loading = ref(true)
const getDateSalesReport = async () => {
  try {
    let response = null
    if (start_date.value && end_date.value) {
      response = await api().get(
        `/date-wise-sales-report?start_date=${start_date.value}&end_date=${end_date.value}`
      )
    } else {
      response = await api().get(`/date-wise-sales-report`)
    }
    if (response.data) {
      report_list.value = response.data.data
      console.log(report_list.value)
    }
    loading.value = false
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  getDateSalesReport()
})
</script>

<style lang="scss" scoped></style>
