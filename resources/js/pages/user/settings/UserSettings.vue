<script setup>
import { ref } from 'vue';
import UpdatePasswordForm from '../settings/partials/UpdatePasswordForm.vue';
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
    <div class="flex flex-1 items-center justify-center bg-gradient-to-br from-indigo-50 via-teal-50 to-gray-100">
        <UpdatePasswordForm @add-toast="addToast" />
        <div class="fixed bottom-6 right-6 space-y-2">
            <Toast v-for="toast in toasts" :key="toast.id" :message="toast.message" :description="toast.description"
                :type="toast.type" @close="removeToast(toast.id)" />
        </div>
    </div>
</template>
