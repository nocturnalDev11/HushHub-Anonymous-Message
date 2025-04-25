<script setup>
import { onMounted, ref } from 'vue';

const user = ref(null);
const error = ref(null);

onMounted(async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
        const res = await fetch(`/api/users/${userId}`, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
            },
        });
        if (!res.ok) throw new Error('Failed to fetch user');
        user.value = await res.json();
    } catch (err) {
        error.value = err.message;
    }
});
</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-4xl font-bold">Welcome, {{ user?.name || 'Guest' }}</h1>
        <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
    </div>
</template>
