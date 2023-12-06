import {createRouter, createWebHistory} from "vue-router";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/login', // 添加重定向配置
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginView,
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('@/views/HomeView.vue'),
            children: [
                {
                    path: 'studentList',
                    name: 'StudentList',
                    component: () => import('@/views/StudentListView.vue'),
                },
            ],
        },
    ],
});
export default router;
