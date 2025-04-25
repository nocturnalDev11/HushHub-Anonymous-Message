<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-3xl font-bold text-center mb-4">Signup</h1>
        <div class="max-w-xl w-full mx-auto bg-white p-6 rounded-lg shadow-md">
            <div class="mb-4">
                <label for="fullname" class="block text-gray-700">Fullname</label>
                <input type="text" id="fullname" required class="w-full px-3 py-2 border border-gray-300 rounded" />
            </div>
            <div class="mb-4">
                <label for="email" class="block text-gray-700">Email</label>
                <input type="email" id="email" required class="w-full px-3 py-2 border border-gray-300 rounded" />
            </div>
            <div class="mb-4">
                <label for="username" class="block text-gray-700">Username</label>
                <input type="text" id="username" required class="w-full px-3 py-2 border border-gray-300 rounded" />
            </div>
            <div class="mb-4">
                <label for="password" class="block text-gray-700">Password</label>
                <input type="password" id="password" required class="w-full px-3 py-2 border border-gray-300 rounded" />
            </div>
            <div class="mb-4">
                <label for="password_confirmation" class="block text-gray-700">Confirm Password</label>
                <input type="password" id="password_confirmation" required
                    class="w-full px-3 py-2 border border-gray-300 rounded" />
            </div>
            <button type="submit" class="w-full bg-indigo-500 text-white py-2 rounded">Signup</button>
        </div>
    </div>
</template>
