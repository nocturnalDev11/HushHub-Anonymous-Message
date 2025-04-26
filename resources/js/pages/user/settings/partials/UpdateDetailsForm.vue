<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import TextInput from '@/components/TextInput.vue';

const authStore = useAuthStore();
const form = ref({
    name: authStore.user?.name || '',
    username: authStore.user?.username || '',
});
const loading = ref(false);
const errors = ref([]);
const emit = defineEmits(['add-toast']);

const validateForm = () => {
    errors.value = [];
    if (!form.value.name || form.value.name.length > 255) {
        errors.value.push('Name is required and must be 255 characters or less.');
    }
    if (!form.value.username || form.value.username.length > 255) {
        errors.value.push('Username is required and must be 255 characters or less.');
    }
    if (!/^[a-zA-Z0-9_@]+$/.test(form.value.username)) {
        errors.value.push('Username can only contain letters, numbers, underscores, and @.');
    }
    return errors.value.length === 0;
};

const updateDetails = async () => {
    if (!validateForm()) {
        errors.value.forEach(error => emit('add-toast', 'Error', error, 'error'));
        return;
    }

    loading.value = true;
    try {
        const response = await fetch(`/api/users/${authStore.user.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${authStore.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                name: form.value.name,
                username: form.value.username,
            }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed to update details');
        }

        const data = await response.json();

        authStore.user = { ...authStore.user, ...data.user };
        emit('add-toast', 'Success', 'Details updated successfully', 'success');
    } catch (error) {
        emit('add-toast', 'Error', error.message || 'Failed to update details', 'error');
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div>
        <h1 class="text-2xl font-semibold text-gray-900">
            Update Details
        </h1>
        <form @submit.prevent="updateDetails" class="mt-6 space-y-6">
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
                <TextInput v-model="form.name" id="name" type="text" class="pl-3" :class="{
                    'border-gray-200 focus:ring-indigo-300 focus:border-indigo-500': !errors.length,
                    'border-red-500 focus:ring-red-300 focus:border-red-500': errors.length
                }" required placeholder=" " />
            </div>

            <div>
                <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                <TextInput v-model="form.username" id="username" type="text" class="pl-3" :class="{
                        'border-gray-200 focus:ring-indigo-300 focus:border-indigo-500': !errors.length,
                        'border-red-500 focus:ring-red-300 focus:border-red-500': errors.length
                    }" required placeholder=" " />
            </div>

            <button type="submit" :disabled="loading"
                class="group relative w-full flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                <span v-if="loading" class="material-symbols-outlined animate-spin">refresh</span>
                <span>{{ loading ? 'Updating...' : 'Update Details' }}</span>
                <span
                    class="absolute inset-0 rounded-lg bg-indigo-200 opacity-0 group-active:opacity-20 group-active:scale-110 transition-all duration-200"></span>
            </button>
        </form>
    </div>
</template>

<style scoped>
.material-symbols-outlined {
    font-family: 'Material Symbols Outlined' !important;
}
</style>
