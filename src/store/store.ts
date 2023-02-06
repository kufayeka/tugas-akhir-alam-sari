import { defineStore } from "pinia";

export const storeDataGlobal = defineStore({
  id: "store.data.global",
  state: () => {
    return {
      data_value: "im a cunt",
    };
  },
  getters: {},
  actions: {},
});
