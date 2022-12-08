import { defineStore } from 'pinia'
import localCache from '@/utils/cache'

export const useRegister = defineStore("register", {
  state: () => {
    return {
      username: "",
      password: "",
      permission: localCache.getCache("permission") || [],
    };
  },
  getters:{},
  actions:{}
})