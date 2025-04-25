<script setup>
import { useUserApi } from '../../hooks/useUserApi';

const userId = localStorage.getItem('userId');
const { data: user, loading, error } = useUserApi(userId);
</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <h1 v-if="loading" class="text-4xl font-bold">Loading...</h1>
        <h1 v-else class="text-4xl font-bold">Welcome, {{ user?.name || 'Guest' }}</h1>
        <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
    </div>
</template>
