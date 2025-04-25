<template>
    <nav class="flex px-3 py-2 justify-between items-center mb-8">
        <router-link to="/" class="text-2xl font-bold text-indigo-600">
            HushHub
        </router-link>
        <router-link to="/user/login">
            <button class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">Login</button>
        </router-link>
    </nav>

    <main>
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </main>
</template>
