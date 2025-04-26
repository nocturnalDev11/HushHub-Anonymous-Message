<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import TextInput from '@/components/TextInput.vue';
import { Text } from 'vue';

const authStore = useAuthStore();
const currentPassword = ref('');
const newPassword = ref('');
const newPasswordConfirmation = ref('');
const loading = ref(false);
const showPassword = ref(false);

// Emit events for toast notifications
const emit = defineEmits(['add-toast']);

// Password validation
const passwordErrors = ref([]);
const passwordStrength = computed(() => {
    const password = newPassword.value;
    if (!password) return '';

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const lengthValid = password.length >= 8;

    let strengthScore = 0;
    if (hasUpperCase) strengthScore++;
    if (hasLowerCase) strengthScore++;
    if (hasNumber) strengthScore++;
    if (hasSpecialChar) strengthScore++;
    if (lengthValid) strengthScore++;

    if (strengthScore <= 2) return 'weak';
    if (strengthScore <= 4) return 'medium';
    return 'strong';
});

const passwordMatch = computed(() => {
    return newPassword.value && newPasswordConfirmation.value
        ? newPassword.value === newPasswordConfirmation.value
        : true;
});

const validatePassword = () => {
    passwordErrors.value = [];
    if (newPassword.value.length < 8) {
        passwordErrors.value.push('Password must be at least 8 characters long.');
    }
    if (passwordStrength.value === 'weak') {
        passwordErrors.value.push('Password is too weak. Include uppercase, lowercase, numbers, and special characters.');
    }
    if (!passwordMatch.value) {
        passwordErrors.value.push('Passwords do not match.');
    }
    return passwordErrors.value.length === 0;
};

const updatePassword = async () => {
    if (!validatePassword()) {
        passwordErrors.value.forEach(error => emit('add-toast', 'Error', error, 'error'));
        return;
    }

    loading.value = true;
    try {
        const response = await fetch('/api/password', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${authStore.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                current_password: currentPassword.value,
                password: newPassword.value,
                password_confirmation: newPasswordConfirmation.value,
            }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed to update password');
        }

        const data = await response.json();
        emit('add-toast', 'Success', data.status || 'Password updated', 'success');
        currentPassword.value = '';
        newPassword.value = '';
        newPasswordConfirmation.value = '';
    } catch (error) {
        emit('add-toast', 'Error', error.message || 'Failed to update password', 'error');
    } finally {
        loading.value = false;
    }
};

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};
</script>

<template>
    <div
        class="relative z-10 max-w-xl w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-100">
        <h1 class="text-2xl font-semibold text-gray-900">
            Change Password
        </h1>
        <form @submit.prevent="updatePassword" class="mt-6 space-y-4">
            <div>
                <label for="current_password" class="block text-sm font-medium text-gray-700">Current Password</label>
                <div class="relative">
                    <TextInput v-model="currentPassword" :type="showPassword ? 'text' : 'password'"
                        id="current_password" class="pl-3 pr-12" required />
                    <button @click="togglePasswordVisibility" type="button"
                        class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                        aria-label="Toggle password visibility">
                        <span class="material-symbols-outlined text-lg">
                            {{ showPassword ? 'visibility_off' : 'visibility' }}
                        </span>
                    </button>
                </div>
            </div>

            <div>
                <label for="new_password" class="block text-sm font-medium text-gray-700">New Password</label>
                <div class="relative">
                    <TextInput v-model="newPassword" :type="showPassword ? 'text' : 'password'" id="new_password"
                        class="pl-3 pr-12" :class="{
                            'border-gray-200 focus:ring-indigo-300 focus:border-indigo-500': !passwordErrors.length,
                            'border-red-500 focus:ring-red-300 focus:border-red-500': passwordErrors.length
                        }" required />
                    <button @click="togglePasswordVisibility" type="button"
                        class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                        aria-label="Toggle password visibility">
                        <span class="material-symbols-outlined text-lg">
                            {{ showPassword ? 'visibility_off' : 'visibility' }}
                        </span>
                    </button>
                </div>
                <div v-if="newPassword" class="mt-2 text-sm">
                    <span :class="{
                        'text-red-600': passwordStrength === 'weak',
                        'text-yellow-600': passwordStrength === 'medium',
                        'text-green-600': passwordStrength === 'strong'
                    }">
                        Password Strength: {{ passwordStrength || 'None' }}
                    </span>
                </div>
            </div>

            <div>
                <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirm New
                    Password</label>
                <div class="relative">
                    <TextInput v-model="newPasswordConfirmation" :type="showPassword ? 'text' : 'password'"
                        id="password_confirmation" class="pl-3 pr-12" :class="{
                            'border-gray-200 focus:ring-indigo-300 focus:border-indigo-500': passwordMatch,
                            'border-red-500 focus:ring-red-300 focus:border-red-500': !passwordMatch
                        }" required />
                    <button @click="togglePasswordVisibility" type="button"
                        class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                        aria-label="Toggle password visibility">
                        <span class="material-symbols-outlined text-lg">
                            {{ showPassword ? 'visibility_off' : 'visibility' }}
                        </span>
                    </button>
                </div>
                <p v-if="!passwordMatch && newPasswordConfirmation" class="mt-2 text-sm text-red-600">
                    Passwords do not match.
                </p>
            </div>

            <button type="submit" :disabled="loading || passwordErrors.length"
                class="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                {{ loading ? 'Updating...' : 'Update Password' }}
            </button>
        </form>
    </div>
</template>

<style scoped>
.material-symbols-outlined {
    font-family: 'Material Symbols Outlined' !important;
}
</style>
