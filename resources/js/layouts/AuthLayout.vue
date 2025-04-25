<template>
    <nav class="flex justify-between p-3">
        <router-link to="/user/home" class="text-2xl font-bold items-center">
            HushHub
        </router-link>
        <div class="space-x-4 flex items-center">
            <router-link to="/user/signup" class="text-xl items-center hover:text-indigo-500">
                Logout
            </router-link>
        </div>
    </nav>

    <main>
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </main>
</template>
