import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    isLoading: true
  }),

  actions: {
    setLoading(status: boolean) {
      this.isLoading = status
    },

    startLoading() {
      this.isLoading = true
    },

    stopLoading() {
      this.isLoading = false
    }
  }
})
