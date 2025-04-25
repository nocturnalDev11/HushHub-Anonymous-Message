<template>
    <div class="container mx-auto px-4 py-8">
        <div v-if="loading" class="text-center text-gray-600">Loading...</div>
        <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
        <div v-else class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 class="text-2xl font-bold text-gray-800 mb-4">
                Hey, anonymous! Send a secret message to {{ recipientName }}!
            </h1>
            <form @submit.prevent="sendMessage">
                <h3 v-if="successMessage" class="my-4 text-green-500 text-center">{{ successMessage }}</h3>
                <textarea v-model="form.message" class="w-full p-3 border border-gray-300 rounded mb-4" rows="3"
                    placeholder="Your message" required></textarea>
                <button type="submit" :disabled="sending"
                    class="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
                    :class="{ 'opacity-50': sending }">
                    {{ sending ? 'Sending...' : 'Send' }}
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const recipientName = ref(null);
const loading = ref(true);
const error = ref(null);
const form = ref({ message: '' });
const sending = ref(false);
const successMessage = ref(null);

const checkAuthAndRedirect = () => {
    if (!authStore.token) {
        localStorage.setItem('redirectAfterStart', route.fullPath);
        router.push({ name: 'landing-page' });
        return false;
    }
    return true;
};

const fetchRecipient = async () => {
    if (!checkAuthAndRedirect()) return;

    const encodedUsername = route.query.abcNum;
    if (!encodedUsername) {
        error.value = 'Invalid link';
        loading.value = false;
        router.push({ name: 'landing-page' });
        return;
    }

    try {
        const username = atob(encodedUsername);
        const response = await fetch(`/api/user/name/${encodeURIComponent(username)}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authStore.token}`,
            },
        });
        if (!response.ok) {
            throw new Error('User not found');
        }
        const data = await response.json();
        recipientName.value = data.name;
    } catch (err) {
        error.value = err.message;
        router.push({ name: 'landing-page' });
    } finally {
        loading.value = false;
    }
};

const sendMessage = async () => {
    if (!checkAuthAndRedirect()) return;

    sending.value = true;
    successMessage.value = null;

    try {
        const username = atob(route.query.abcNum);
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${authStore.token}`,
            },
            body: JSON.stringify({
                msg_content: form.value.message,
                username,
            }),
        });

        if (!response.ok) {
            const data = await response.json();
            if (response.status === 401) {
                localStorage.setItem('redirectAfterStart', route.fullPath);
                router.push({ name: 'landing-page' });
                return;
            }
            throw new Error(data.message || 'Failed to send message');
        }

        successMessage.value = 'Message sent';
        form.value.message = '';
        setTimeout(() => {
            successMessage.value = null;
        }, 2000);
    } catch (err) {
        error.value = err.message;
    } finally {
        sending.value = false;
    }
};

onMounted(fetchRecipient);
</script>

<style scoped>
.container {
    max-width: 1200px;
}

textarea {
    resize: vertical;
}
</style>
