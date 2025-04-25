import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: () => import('../layouts/GuestLayout.vue'),
        meta: { requiresGuest: true },
        children: [
            {
                path: '',
                name: 'landing-page',
                component: () => import('../pages/LandingPage.vue'),
                meta: { title: 'Login' }
            },
            {
                path: '/user/login',
                name: 'user-login',
                component: () => import('../pages/user/auth/LoginPage.vue'),
                meta: { title: 'Login' }
            },
            {
                path: '/user/signup',
                name: 'user-signup',
                component: () => import('../pages/user/auth/Signup.vue'),
                meta: { title: 'Signup' }
            },
            {
                path: '/user/forgot-password',
                name: 'user-forgot-password',
                component: () => import('../pages/user/auth/ForgotPassword.vue'),
                meta: { title: 'Forgot Password' }
            },
            {
                path: '/:pathMatch(.*)*',
                name: 'NotFound',
                component: () => import('../pages/NotFound.vue'),
                meta: {
                    title: '404 | Not Found'
                }
            },
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
        scrollBehavior (to, from, savedPosition) {
        return savedPosition || { top: 0 };
    }
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title ? `${to.meta.title} - HushHub` : 'HushHub';
    next();
});

export default router;
