<template>
    <nav class="flex px-3 py-2 justify-between">
        <router-link to="/user/home" class="text-2xl font-bold text-indigo-600">
            HushHub
        </router-link>
        <div class="space-x-4 flex items-center">
            <router-link to="/" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
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
