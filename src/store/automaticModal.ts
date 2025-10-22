import { defineStore } from "pinia";

export const useAutomaticModalStore = defineStore('automaticModal', {
  state: () => ({
    isModalOpen: false,
  }),
  actions: {
    open() {
      this.isModalOpen = true;
    },
    close() {
      this.isModalOpen = false;
    },
  },
});
