<template>
    <nav class="flex justify-between">
        <route-link to="/" class="text-2xl font-bold items-center">
            HushHub
        </route-link>
        <ul class="space-x-4 flex items-center">
            <li>
                <route-link to="/user/login" class="text-2xl font-bold items-center">
                    Login
                </route-link>
            </li>
            <li>
                <route-link to="/user/signup" class="text-2xl font-bold items-center">
                    Signup
                </route-link>
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
