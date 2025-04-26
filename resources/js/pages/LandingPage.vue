<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();
const form = ref({ name: '' });
const loading = ref(false);
const error = ref(null);

const startSession = async () => {
    loading.value = true;
    error.value = null;

    try {
        await authStore.startSession(form.value.name);
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="flex flex-1 items-center justify-center bg-gradient-to-br from-indigo-50 via-teal-50 to-gray-100">
        <!-- Background Decorative Layer -->
        <div class="absolute inset-0 pointer-events-none">
            <div class="absolute -top-20 -left-20 w-60 h-60 bg-indigo-200 rounded-full opacity-30 blur-2xl"></div>
            <div class="absolute top-10 right-0 w-72 h-72 bg-teal-200 rounded-full opacity-30 blur-2xl"></div>
        </div>

        <div
            class="relative z-10 max-w-xl w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-100">
            <header class="text-center mb-8">
                <h1
                    class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
                    HushHub
                </h1>
                <p class="text-sm text-gray-600 mt-3 leading-relaxed">
                    Confess your thoughts anonymously. Share messages with friends without revealing your identity.
                    Enter your name to get started.
                </p>
            </header>

            <form @submit.prevent="startSession" class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <span class="material-symbols-outlined text-lg">person</span>
                        </span>
                        <input v-model="form.name" type="text" placeholder="Enter your name" required
                            class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition-all duration-200 text-sm placeholder-gray-400" />
                    </div>
                </div>

                <button type="submit" :disabled="loading"
                    class="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 transition-all duration-300 shadow-sm hover:shadow-md"
                    :class="{ 'opacity-50 cursor-not-allowed': loading }">
                    <span class="material-symbols-outlined text-lg" v-if="loading">hourglass_empty</span>
                    <span>{{ loading ? 'Starting...' : 'Start Session' }}</span>
                </button>

                <p v-if="error" class="text-red-500 text-xs text-center mt-3">{{ error }}</p>
            </form>

            <p class="text-xs text-gray-500 text-center mt-6">
                Your name will be used to generate a unique anonymous link.
            </p>
        </div>
    </div>
</template>
