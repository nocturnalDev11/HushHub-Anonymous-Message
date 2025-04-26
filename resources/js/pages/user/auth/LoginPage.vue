<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();
const form = ref({ username: '', password: '' });
const loading = ref(false);
const error = ref(null);
const showPassword = ref(false);

const login = async () => {
    loading.value = true;
    error.value = null;

    try {
        await authStore.login(form.value);
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};
</script>

<template>
    <div class="flex flex-1 items-center justify-center bg-gradient-to-br from-indigo-50 via-teal-50 to-gray-100">
        <div
            class="max-w-md w-full bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
            <h1
                class="text-3xl font-semibold text-center mb-6 bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
                Welcome Back
            </h1>

            <div v-if="error"
                class="mb-6 p-4 bg-red-50/80 border border-red-200 rounded-lg flex items-center space-x-3">
                <span class="material-symbols-outlined text-red-500">error</span>
                <p class="text-sm text-red-700">{{ error }}</p>
            </div>

            <div class="space-y-6">
                <div>
                    <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                            <span class="material-symbols-outlined text-lg">person</span>
                        </span>
                        <input v-model="form.username" type="text" id="username" required
                            class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition-all duration-200 placeholder-gray-400"
                            placeholder="Enter your username" />
                    </div>
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                            <span class="material-symbols-outlined text-lg">lock</span>
                        </span>
                        <input v-model="form.password" :type="showPassword ? 'text' : 'password'" id="password" required
                            class="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition-all duration-200 placeholder-gray-400"
                            placeholder="Enter your password" />
                        <button @click="togglePasswordVisibility" type="button"
                            class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 transition-colors"
                            aria-label="Toggle password visibility">
                            <span class="material-symbols-outlined text-lg">
                                {{ showPassword ? 'visibility_off' : 'visibility' }}
                            </span>
                        </button>
                    </div>
                </div>

                <button @click="login" :disabled="loading"
                    class="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                    <span class="material-symbols-outlined text-lg" v-if="loading">autorenew</span>
                    <span>{{ loading ? 'Logging in...' : 'Login to HushHub' }}</span>
                </button>
            </div>

            <div class="mt-6 text-center">
                <router-link to="/user/forgot-password"
                    class="text-sm text-indigo-600 hover:text-indigo-700 hover:underline transition-all duration-200">
                    Forgot Password?
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
input:focus {
    transform: scale(1.01);
}
</style>
