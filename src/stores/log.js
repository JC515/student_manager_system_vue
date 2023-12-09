import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useLogStore = defineStore('log', () => {
    const logs = ref([]);

    function addLog(log) {
        logs.value.push(log);
    }

    function clearLogs() {
        logs.value = [];
    }

    function deleteLog(index) {
        logs.value.splice(index, 1);
    }

    return {
        logs,
        addLog,
        clearLogs,
        deleteLog
    };
}, {
    persist: true
});