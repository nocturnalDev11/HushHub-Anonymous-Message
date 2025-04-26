<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import Toast from '@/components/Toast.vue';

const authStore = useAuthStore();
const toasts = ref([]);

const addToast = (message, description, type) => {
    const id = Date.now();
    toasts.value.push({ id, message, description, type });
};

const removeToast = (id) => {
    toasts.value = toasts.value.filter(toast => toast.id !== id);
};

const handleLogout = async () => {
    const result = await authStore.logout();
    if (result && result.success) {
        addToast('Success', result.message, 'success');
    } else {
        addToast('Error', result ? result.message : 'Logout failed', 'error');
    }
};
</script>

<template>
    <div class="relative flex flex-col min-h-screen bg-gray-50">
        <nav
            class="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">

            <div v-if="authStore.token">
                <router-link to="/user/home" class="flex items-center space-x-2 group">
                    <span
                        class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent transition-all duration-300 group-hover:from-indigo-700 group-hover:to-teal-600">
                        HushHub
                    </span>
                    <span
                        class="material-symbols-outlined text-indigo-600 group-hover:text-indigo-700 transition-colors">
                        chat
                    </span>
                </router-link>
            </div>

            <router-link v-else to="/" class="flex items-center space-x-2 group">
                <span
                    class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent transition-all duration-300 group-hover:from-indigo-700 group-hover:to-teal-600">
                    HushHub
                </span>
                <span class="material-symbols-outlined text-indigo-600 group-hover:text-indigo-700 transition-colors">
                    chat
                </span>
            </router-link>

            <div v-if="authStore.token">
                <button @click="handleLogout"
                    class="relative flex items-center space-x-2 px-5 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-medium tracking-tight hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer">
                    <span class="material-symbols-outlined text-lg">logout</span>
                    <span>Logout</span>
                </button>
            </div>

            <router-link v-else to="/user/login">
                <button
                    class="relative flex items-center space-x-2 px-5 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-medium tracking-tight hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer">
                    <span class="material-symbols-outlined text-lg">login</span>
                    <span>Login</span>
                </button>
            </router-link>
        </nav>

        <main class="flex-1 flex">
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </main>

        <div class="fixed bottom-6 right-6 space-y-2">
            <Toast v-for="toast in toasts" :key="toast.id" :message="toast.message" :description="toast.description"
                :type="toast.type" @close="removeToast(toast.id)" />
        </div>
    </div>
</template>

<style scoped>
/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
