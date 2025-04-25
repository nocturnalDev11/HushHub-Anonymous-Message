<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-4xl font-bold mb-4">Landing Page</h1>

        <div v-if="loading">Loading users...</div>
        <div v-else-if="error">Error: {{ error }}</div>
        <ul v-else>
            <li v-for="user in users" :key="user.id">
                {{ user.name }} ({{ user.email }})
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useUserApi } from '../hooks/useUserApi';

const { data: users, loading, error } = useUserApi('/api/users');
</script>
