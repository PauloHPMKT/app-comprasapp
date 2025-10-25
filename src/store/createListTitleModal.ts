import { defineStore } from "pinia";

export const useCreateListTitleModalStore = defineStore('createListTitleModal', {
  state: () => ({
    isModalOpen: false,
    listTitle: '',
    hasError: false,
    errorMessage: '',
  }),
  actions: {
    openListTitleModal() {
      this.isModalOpen = true;
    },
    closeListTitleModal() {
      this.isModalOpen = false;
    },
    setListTitle(title: string) {
      this.listTitle = title;
      if (this.hasError) {
        this.hasError = false;
        this.errorMessage = '';
      }
    },
    setError(message: string) {
      this.hasError = true;
      this.errorMessage = message;
    },
    clearError() {
      this.hasError = false;
      this.errorMessage = '';
    },
    resetModal() {
      this.listTitle = '';
      this.hasError = false;
      this.errorMessage = '';
      this.closeListTitleModal();
    },
  },
});
