// store.js
import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useUserStore = defineStore('user', () => {
    const isAuthenticated = ref(false);
    const account = ref('')
    const password = ref('')
    const remember = ref(false)

    function setAuthentication(status) {
        isAuthenticated.value = status;
    }

    function setAccount(account) {
        this.account = account
    }

    function setPassword(password) {
        this.password = password;
    }

    function setRemember() {
        this.remember = !this.remember;
    }

    return {
        isAuthenticated,
        account,
        password,
        remember,
        setAuthentication,
        setAccount,
        setPassword,
        setRemember,
    };
}, {
    persist: true
});