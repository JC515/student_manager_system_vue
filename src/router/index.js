import {createRouter, createWebHistory} from "vue-router";
import LoginView from "@/views/LoginView.vue";
import {useUserStore} from "@/stores/user";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginView,
        },
        {
            path: '/student_manager_system',
            name: 'System',
            component: () => import('@/views/MainView.vue'),
            children: [
                {
                    path: 'home',
                    name: 'Home',
                    component: () => import('@/views/HomeView.vue'),
                },
                {
                    path: 'studentList',
                    name: 'StudentList',
                    component: () => import('@/views/StudentListView.vue'),
                },
                {
                    path: 'findStudent',
                    name: 'FindStudent',
                    component: () => import('@/views/FindStudentView.vue'),
                }
            ],
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    const user = useUserStore();
    //需要删除！
    if (!user.isAuthenticated || to.name === 'Login') {
        next();
    } else {
        next({name: 'Login'});
    }
});

export default router;
