import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useToDoStore = defineStore('todo', () => {
    const todoList = ref([])

    function addTodo(todo) {
        todoList.value.push(todo)

    }

    function removeTodo(index) {
        todoList.value.splice(index, 1)
    }

    return {
        todoList,
        addTodo,
        removeTodo
    }
}, {
    persist: true
});