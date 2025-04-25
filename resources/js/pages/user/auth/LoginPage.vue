<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = ref({ username: '', password: '' });
const loading = ref(false);
const error = ref(null);

const login = async () => {
    loading.value = true;
    error.value = null;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(form.value),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Login failed');
        }

        const data = await response.json();
        localStorage.setItem('userId', data.user.id);
        router.push({ name: 'home-page' });
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-3xl font-bold text-center mb-4">Login</h1>
        <div class="max-w-lg w-full mx-auto bg-white p-6 rounded-lg shadow-md">
            <div class="mb-4">
                <label for="username" class="block text-gray-700">Username</label>
                <input v-model="form.username" type="text" id="username" required
                    class="w-full px-3 py-2 border border-gray-300 rounded" />
            </div>
            <div class="mb-4">
                <label for="password" class="block text-gray-700">Password</label>
                <input v-model="form.password" type="password" id="password" required
                    class="w-full px-3 py-2 border border-gray-300 rounded" />
            </div>
            <button @click="login" :disabled="loading" class="w-full bg-indigo-500 text-white py-2 rounded"
                :class="{ 'opacity-50': loading }">
                {{ loading ? 'Logging in...' : 'Login' }}
            </button>
            <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
            <div class="mt-4 text-center">
                <router-link to="/user/forgot-password" class="text-indigo-500">Forgot password?</router-link>
            </div>
        </div>
    </div>
</template>
