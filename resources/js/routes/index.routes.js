import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: () => import('../layouts/AuthLayout.vue'),
        children: [
            {
                path: '',
                name: 'landing-page',
                component: () => import('../pages/LandingPage.vue'),
                meta: { requiresGuest: true },
            },
            {
                path: '/user/login',
                name: 'user-login',
                component: () => import('../pages/user/auth/LoginPage.vue'),
                meta: { title: 'Login', requiresGuest: true },
            },
            {
                path: '/user/forgot-password',
                name: 'user-forgot-password',
                component: () => import('../pages/user/auth/ForgotPassword.vue'),
                meta: { title: 'Forgot Password', requiresGuest: true },
            },
            {
                path: '/send-message',
                name: 'send-message',
                component: () => import('../pages/user/SendMessage.vue'),
                meta: { title: 'Send Anonymous Message' },
            },
            {
                path: '/user/home',
                name: 'home-page',
                component: () => import('../pages/user/HomePage.vue'),
                meta: { title: 'Home', requiresAuth: true },
            },
            {
                path: '/user/settings',
                name: 'settings',
                component: () => import('../pages/user/settings/UserSettings.vue'),
                meta: { title: 'Settings', requiresAuth: true },
            },
            {
                path: '/:pathMatch(.*)*',
                name: 'NotFound',
                component: () => import('../pages/NotFound.vue'),
                meta: { title: '404 | Not Found' },
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { top: 0 };
    },
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title ? `${to.meta.title} - HushHub` : 'HushHub';
    next();
});

export default router;
