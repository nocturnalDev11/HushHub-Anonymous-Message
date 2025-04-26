<template>
    <div class="flex flex-1 items-center justify-center bg-gradient-to-br from-indigo-50 via-teal-50 to-gray-100">
        <div class="absolute inset-0 pointer-events-none">
            <div class="absolute -top-20 -left-20 w-60 h-60 bg-indigo-200 rounded-full opacity-20 blur-2xl"></div>
            <div class="absolute top-10 right-0 w-72 h-72 bg-teal-200 rounded-full opacity-20 blur-2xl"></div>
        </div>

        <div v-if="loading" class="text-center text-gray-600 flex items-center space-x-2">
            <span class="material-symbols-outlined animate-spin">refresh</span>
            <span>Loading...</span>
        </div>

        <div v-else-if="error"
            class="max-w-md mx-auto bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-red-100 text-center">
            <span class="material-symbols-outlined text-red-500 text-3xl mb-2">error</span>
            <p class="text-red-500 font-medium">{{ error }}</p>
            <router-link to="/"
                class="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200">
                Back to Home
            </router-link>
        </div>

        <div v-else
            class="relative max-w-md mx-auto bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-100">
            <h1
                class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent mb-6">
                Hey, {{ authStore.user?.username }}! Send a secret to {{ recipientName }}!
            </h1>
            <form @submit.prevent="sendMessage" class="space-y-6">
                <transition name="slide">
                    <div v-if="successMessage"
                        class="flex items-center space-x-2 bg-green-100 text-green-600 p-3 rounded-lg">
                        <span class="material-symbols-outlined">check_circle</span>
                        <p class="text-sm font-medium">{{ successMessage }}</p>
                    </div>
                </transition>

                <div class="relative">
                    <textarea v-model="form.message" id="message"
                        class="peer w-full p-3 pt-6 border border-gray-200 rounded-lg bg-transparent focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition-all duration-200 resize-vertical placeholder-transparent"
                        rows="4" placeholder="Your message" required></textarea>
                    <label for="message"
                        class="absolute left-3 top-1 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-indigo-600">
                        Your secret message
                    </label>
                </div>

                <button type="submit" :disabled="sending"
                    class="group relative w-full flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                    <span v-if="sending" class="material-symbols-outlined animate-spin">refresh</span>
                    <span>{{ sending ? 'Sending...' : 'Send Message' }}</span>

                    <span
                        class="absolute inset-0 rounded-lg bg-indigo-200 opacity-0 group-active:opacity-20 group-active:scale-110 transition-all duration-200"></span>
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

        successMessage.value = 'Message sent successfully!';
        form.value.message = '';
        setTimeout(() => {
            successMessage.value = null;
        }, 3000);
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
    min-height: 100px;
    max-height: 300px;
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.material-symbols-outlined {
    font-family: 'Material Symbols Outlined' !important;
}
</style>
