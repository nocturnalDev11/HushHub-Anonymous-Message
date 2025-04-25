<template>
    <nav class="flex justify-between p-3">
        <router-link to="/" class="text-2xl font-bold items-center">
            HushHub
        </router-link>
        <ul class="space-x-4 flex items-center">
            <li>
                <router-link to="/user/login" class="text-xl items-center hover:text-indigo-500">
                    Login
                </router-link>
            </li>
            <li>
                <router-link to="/user/signup" class="text-xl items-center hover:text-indigo-500">
                    Signup
                </router-link>
            </li>
        </ul>
    </nav>

    <main>
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </main>
</template>
