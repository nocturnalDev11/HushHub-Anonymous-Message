<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <header class="text-center mb-8">
            <h1 class="text-4xl font-bold text-gray-800">HushHub | Anonymous Message</h1>
            <p class="text-lg text-gray-600 mt-2">
                Confess your thoughts by sending messages to your friends anonymously.
                They won't know who sent the message. Enter your name to get started.
            </p>
        </header>
        <div class="max-w-xl w-full mx-auto bg-white p-6 rounded-lg shadow-md">
            <form @submit.prevent="startSession">
                <div class="mb-4">
                    <label class="block text-gray-700">Your Name to Get Started</label>
                    <input v-model="form.name" type="text" placeholder="Name" required
                        class="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>
                <button type="submit" :disabled="loading"
                    class="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
                    :class="{ 'opacity-50': loading }">
                    {{ loading ? 'Starting...' : 'Start' }}
                </button>
                <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = ref({ name: '' });
const loading = ref(false);
const error = ref(null);

const startSession = async () => {
    loading.value = true;
    error.value = null;

    try {
        const response = await fetch('/api/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ name: form.value.name }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed to start session');
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

<style scoped>
.container {
    max-width: 1200px;
}
</style>
