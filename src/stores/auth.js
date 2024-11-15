import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    isAuthenticated: false,
    user: {},
    token: '',
    cart: {
      items: [],
      total: 0.0,
      discount: 0.0,
      sub_total: 0.0
    }
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'authStoreLocal',
        storage: localStorage,
        paths: [
          'isAuthenticated',
          'user',
          'token',
          'cart'
        ],
      },
    ],
  },
  actions: {
    addToCart(product) {
      let item = this.cart.items.find(e => e.product.sku == product.sku)
      if (item) {
        item.quantity++
        this.cart.total = (parseFloat(this.cart.total) + parseFloat(product.price)).toFixed(2)
        this.cart.sub_total = (parseFloat(this.cart.total) - parseFloat(this.cart.discount)).toFixed(2)
      } else {
        item = {
          product: product,
          quantity: 1,
        }
        this.cart.total = (
          parseFloat(this.cart.total) + parseFloat(product.price)
        ).toFixed(2)
        this.cart.sub_total = (
          parseFloat(this.cart.total) - parseFloat(this.cart.discount)
        ).toFixed(2)
        this.cart.items.push(item)
      }
    },
    removeFromCart(product) {
      let itemIndex = this.cart.items.findIndex(e => e.product.sku == product.sku)
      if (itemIndex !== -1) {
        let item = this.cart.items[itemIndex];
        if (item.quantity > 1) {
          item.quantity--;
           this.cart.total = (
             parseFloat(this.cart.total) - parseFloat(product.price)
           ).toFixed(2)
           this.cart.sub_total = (
             parseFloat(this.cart.total) - parseFloat(this.cart.discount)
           ).toFixed(2)
        } else {
          this.cart.items.splice(itemIndex, 1);
            this.cart.total = (
              parseFloat(this.cart.total) - parseFloat(product.price)
            ).toFixed(2)
            this.cart.sub_total = (
              parseFloat(this.cart.total) - parseFloat(this.cart.discount)
            ).toFixed(2)
        }
      }
      },
      updateDiscount() {
        this.cart.sub_total = (
          parseFloat(this.cart.total) - parseFloat(this.cart.discount)
        ).toFixed(2)
    },
    logout(router) {
      this.isAuthenticated = false
      this.user = ''
        this.token = ''
        this.cart = {
          items: [],
          total: 0.0,
          discount: 0.0,
          sub_total: 0.0,
        }
      localStorage.removeItem('authStoreLocal')
      router.push("/login")
    },
  },
 
})
