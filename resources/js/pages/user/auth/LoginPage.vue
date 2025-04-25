<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-3xl font-bold text-center mb-4">Login</h1>
        <div class="max-w-lg w-full mx-auto bg-white p-6 rounded-lg shadow-md">
            <div class="mb-4">
                <label for="username" class="block text-gray-700">Username</label>
                <input type="text" id="username" required class="w-full px-3 py-2 border border-gray-300 rounded" />
            </div>
            <div class="mb-4">
                <label for="password" class="block text-gray-700">Password</label>
                <input type="password" id="password" required class="w-full px-3 py-2 border border-gray-300 rounded" />
            </div>
            <button type="submit" class="w-full bg-indigo-500 text-white py-2 rounded">Login</button>
            <div class="mt-4 text-center">
                <router-link to="/user/forgot-password" class="text-indigo-500">Forgot password?</router-link>
            </div>
        </div>
    </div>
</template>
