<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const fullname = ref('');
const email = ref('');
const username = ref('');
const password = ref('');
const password_confirmation = ref('');
const error = ref(null);
const router = useRouter();

const handleSignup = async () => {
    error.value = null;

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: fullname.value,
                email: email.value,
                username: username.value,
                password: password.value,
                password_confirmation: password_confirmation.value,
            }),
        });

        if (!response.ok) {
            const res = await response.json();
            throw new Error(res.message || 'Signup failed');
        }

        const result = await response.json();
        localStorage.setItem('userId', result.user.id);
        await router.push({ name: 'home-page' });
    } catch (err) {
        error.value = err.message;
    }
};
</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-3xl font-bold text-center mb-4">Signup</h1>
        <div class="max-w-xl w-full mx-auto bg-white p-6 rounded-lg shadow-md">
            <form @submit.prevent="handleSignup">
                <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>

                <div class="mb-4">
                    <label class="block text-gray-700">Fullname</label>
                    <input v-model="fullname" type="text" required
                        class="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700">Email</label>
                    <input v-model="email" type="email" required
                        class="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700">Username</label>
                    <input v-model="username" type="text" required
                        class="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700">Password</label>
                    <input v-model="password" type="password" required
                        class="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700">Confirm Password</label>
                    <input v-model="password_confirmation" type="password" required
                        class="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>

                <button type="submit" class="w-full bg-indigo-500 text-white py-2 rounded">Signup</button>
            </form>
        </div>
    </div>
</template>
