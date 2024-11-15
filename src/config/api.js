import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import { useAuthStore } from '/src/stores/auth.js'

export default () => {
  const authStore = useAuthStore()
  const router = useRouter()
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: `Bearer ${authStore.token}`,
    }, 
  })

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        authStore.logout(router) 
        router.push('/login') 
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your session has expired. Please log in again.",
        });
      }
      return Promise.reject(error)
    }
  )

  return instance
}
