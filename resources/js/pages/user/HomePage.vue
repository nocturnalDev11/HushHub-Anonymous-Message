<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const router = useRouter();
const authStore = useAuthStore();
const messages = ref([]);
const loadingMessages = ref(true);
const errorMessages = ref(null);

const shareLink = computed(() => {
    const baseUrl = window.location.origin;
    const encodedUsername = btoa(authStore.user?.username || '');
    return `${baseUrl}/send-message?abcNum=${encodedUsername}`;
});

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
};

const fetchMessages = async () => {
    loadingMessages.value = true;
    errorMessages.value = null;

    try {
        messages.value = await authStore.fetchMessages();
    } catch (err) {
        errorMessages.value = err.message;
    } finally {
        loadingMessages.value = false;
    }
};

const copyLink = () => {
    const linkText = shareLink.value;
    navigator.clipboard.writeText(linkText).then(() => {
        alert(`Link copied to clipboard: ${linkText}`);
    }).catch(() => {
        alert('Failed to copy link');
    });
};

onMounted(() => {
    if (!authStore.token) {
        router.push({ name: 'landing-page' });
        return;
    }
    fetchMessages();
});
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row gap-8">
            <div class="content flex-1 bg-white p-6 rounded-lg shadow-md">
                <header>
                    <h1 class="text-3xl font-bold text-gray-800">Hey, {{ authStore.user?.name || 'User' }}!</h1>
                    <div class="credential text-center my-4">
                        <p class="text-gray-600">Use these credentials when you log in again, save them for future
                            reference.</p>
                        <h4 class="text-lg font-semibold">Your Username: {{ authStore.user?.username }}</h4>
                        <h4 class="text-lg font-semibold">Password: {{ authStore.user?.temp_password || 'Not available'
                            }}</h4>
                    </div>
                    <p class="text-gray-600">Share this URL with your friends so that they can send you messages.</p>
                    <p id="shareLink" class="my-4">
                        Link: <span>{{ shareLink }}</span>
                    </p>
                    <button @click="copyLink" class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
                        Copy Link
                    </button>
                </header>
            </div>
            <div class="sidebar w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-bold mb-4">Messages</h3>
                <div v-if="loadingMessages" class="text-gray-600">Loading messages...</div>
                <div v-else-if="messages.length === 0" class="text-gray-600">No messages yet.</div>
                <article v-for="message in messages" :key="message.id" class="mb-4">
                    <div class="message bg-gray-100 p-3 rounded">{{ message.msg_content }}</div>
                    <div class="timestamp text-sm text-gray-500 mt-1">{{ formatDate(message.created_at) }}</div>
                </article>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 1200px;
}

.message {
    word-break: break-word;
}
</style>
