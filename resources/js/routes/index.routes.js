import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '',
        component: () => import('../layouts/GuestLayout.vue'),
        meta: { requiresGuest: true },
        children: [
            {
                path: '/',
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
                path: '/:pathMatch(.*)*',
                name: 'NotFound',
                component: () => import('../views/NotFound.vue'),
                meta: {
                    title: '404 | Not Found'
                }
            },
        ]
    }
];
