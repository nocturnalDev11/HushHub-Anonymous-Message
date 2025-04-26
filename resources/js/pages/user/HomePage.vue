<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import Toast from '@/components/Toast.vue';

const router = useRouter();
const authStore = useAuthStore();
const messages = ref([]);
const loadingMessages = ref(true);
const errorMessages = ref(null);
const toasts = ref([]);
const loadingUser = ref(false);
const showPassword = ref(false);

const shareLink = computed(() => {
    const baseUrl = window.location.origin;
    const encodedUsername = btoa(authStore.user?.username || '');
    return `${baseUrl}/send-message?abcNum=${encodedUsername}`;
});

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
};

const fetchMessages = async () => {
    loadingMessages.value = true;
    errorMessages.value = null;
    try {
        messages.value = await authStore.fetchMessages();
    } catch (err) {
        addToast('Error', err.message, 'error');
    } finally {
        loadingMessages.value = false;
    }
};

const copyLink = () => {
    navigator.clipboard.writeText(shareLink.value).then(() => {
        addToast('Success', 'Link copied to clipboard!', 'success');
    }).catch(() => {
        addToast('Error', 'Failed to copy link', 'error');
    });
};

const copyCredentials = () => {
    const credentials = `Username: ${authStore.user?.username}\nPassword: ${authStore.user?.temp_password || 'Not available'}`;
    navigator.clipboard.writeText(credentials).then(() => {
        addToast('Success', 'Credentials copied to clipboard!', 'success');
    }).catch(() => {
        addToast('Error', 'Failed to copy credentials', 'error');
    });
};

const addToast = (message, description, type) => {
    const id = Date.now();
    toasts.value.push({ id, message, description, type });
};

const removeToast = (id) => {
    toasts.value = toasts.value.filter(toast => toast.id !== id);
};

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

onMounted(async () => {
    if (!authStore.token) {
        router.push({ name: 'landing-page' });
        return;
    }
    if (!authStore.user) {
        loadingUser.value = true;
        try {
            await authStore.fetchUser();
        } finally {
            loadingUser.value = false;
        }
    }
    fetchMessages();
});
</script>

<template>
    <div class="flex flex-1 items-center justify-center bg-gradient-to-br from-indigo-50 via-teal-50 to-gray-100">
        <div class="mx-auto px-4 py-12 max-w-7xl">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Background Decorative Layer -->
                <div class="absolute inset-0 pointer-events-none">
                    <div class="absolute -top-20 -left-20 w-60 h-60 bg-indigo-200 rounded-full opacity-30 blur-2xl">
                    </div>
                    <div class="absolute top-10 right-0 w-72 h-72 bg-teal-200 rounded-full opacity-30 blur-2xl"></div>
                </div>

                <div class="relative lg:col-span-2 bg-white rounded-2xl shadow-sm p-8">
                    <div v-if="loadingUser" class="text-gray-500 text-sm animate-pulse">
                        Loading user details...
                    </div>
                    <div v-else-if="authStore.user">
                        <div class="flex items-center justify-between">
                            <h1 class="text-2xl font-semibold text-gray-900">
                                Hey, {{ authStore.user?.name || 'User' }}!
                            </h1>
                            <router-link to="/user/settings"
                                class="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors cursor-pointer">
                                <span class="material-icons-outlined mr-2">settings</span>
                            </router-link>
                        </div>
                        <div class="mt-6 bg-gradient-to-r from-indigo-50 to-teal-50 rounded-xl p-6">
                            <p class="text-sm text-gray-600 mb-4">Save these credentials for future logins:</p>
                            <div class="space-y-2">
                                <p class="text-sm font-medium text-gray-900">
                                    Username: <span>{{ authStore.user?.username }}</span>
                                </p>
                                <div v-if="!authStore.user?.has_updated_password"
                                    class="relative flex items-center bg-gray-100 rounded-lg px-4 py-2.5 border border-gray-200 hover:border-indigo-300 transition-all duration-200 focus-within:ring-2 focus-within:ring-indigo-300">
                                    <p class="flex-1 text-sm font-medium text-gray-900 truncate">
                                        Password:
                                        <span class="inline-block transition-opacity duration-200"
                                            :class="{ 'opacity-70': !showPassword }">
                                            {{ showPassword ? (authStore.user?.temp_password || 'Not available') :
                                            '••••••' }}
                                        </span>
                                    </p>
                                    <button @click="togglePasswordVisibility" type="button"
                                        class="group relative flex items-center justify-center w-8 h-8 rounded-full bg-white/80 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-200 shadow-sm"
                                        aria-label="Toggle password visibility">
                                        <span
                                            class="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-200">
                                            {{ showPassword ? 'visibility_off' : 'visibility' }}
                                        </span>
                                        <span
                                            class="absolute inset-0 rounded-full bg-indigo-200 opacity-0 group-active:opacity-30 group-active:scale-125 transition-all duration-200"></span>
                                    </button>
                                </div>
                            </div>
                            <button @click="copyCredentials"
                                class="mt-4 inline-flex items-center px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors cursor-pointer">
                                <span class="material-icons-outlined mr-2">content_copy</span>
                                Copy Credentials
                            </button>
                        </div>
                        <div class="mt-6">
                            <p class="text-sm text-gray-600 mb-2">Share this link to receive anonymous messages:</p>
                            <div class="flex items-center bg-gray-100 rounded-lg p-3">
                                <span class="text-sm text-gray-800 truncate flex-1">{{ shareLink }}</span>
                                <button @click="copyLink"
                                    class="flex items-center ml-2 p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors cursor-pointer">
                                    <span class="material-icons-outlined">content_copy</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-else class="text-gray-500 text-sm">
                        Unable to load user details.
                    </div>
                </div>

                <div class="bg-white rounded-2xl shadow-sm p-8">
                    <h2 class="text-xl font-semibold text-gray-900 mb-6">Messages</h2>
                    <div v-if="loadingMessages" class="text-gray-500 text-sm animate-pulse">Loading messages...</div>
                    <div v-else-if="messages.length === 0" class="text-gray-500 text-sm">No messages yet.</div>
                    <div v-else class="space-y-4">
                        <article v-for="message in messages" :key="message.id"
                            class="bg-gray-50 rounded-lg p-4 transition-transform hover:scale-[1.01]">
                            <p class="text-sm text-gray-800">{{ message.msg_content }}</p>
                            <p class="text-xs text-gray-500 mt-2">{{ formatDate(message.created_at) }}</p>
                        </article>
                    </div>
                </div>
            </div>
        </div>

        <div class="fixed bottom-6 right-6 space-y-2">
            <Toast v-for="toast in toasts" :key="toast.id" :message="toast.message" :description="toast.description"
                :type="toast.type" @close="removeToast(toast.id)" />
        </div>
    </div>
</template>

<style scoped>
.material-icons-outlined {
    font-family: 'Material Icons Outlined' !important;
}
</style>
