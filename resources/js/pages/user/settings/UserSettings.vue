<script setup>
import { ref } from 'vue';
import UpdatePasswordForm from '../settings/partials/UpdatePasswordForm.vue';
import UpdateDetailsForm from '../settings/partials/UpdateDetailsForm.vue';
import Toast from '@/components/Toast.vue';

const toasts = ref([]);

const addToast = (message, description, type) => {
    const id = Date.now();
    toasts.value.push({ id, message, description, type });
};

const removeToast = (id) => {
    toasts.value = toasts.value.filter(toast => toast.id !== id);
};
</script>

<template>
    <div class="max-w-4xl w-full mx-auto space-y-6 px-4 py-5 sm:px-0">
        <div class="bg-white p-4 shadow sm:rounded-lg sm:p-8">
            <UpdateDetailsForm @add-toast="addToast" class="max-w-3xl" />
        </div>

        <div class="bg-white p-4 shadow sm:rounded-lg sm:p-8">
            <UpdatePasswordForm @add-toast="addToast" />
        </div>

        <div class="fixed bottom-6 right-6 space-y-2">
            <Toast v-for="toast in toasts" :key="toast.id" :message="toast.message" :description="toast.description"
                :type="toast.type" @close="removeToast(toast.id)" />
        </div>
    </div>
</template>
