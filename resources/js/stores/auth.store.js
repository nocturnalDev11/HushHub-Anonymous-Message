import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter();
    const user = ref(null);
    const token = ref(localStorage.getItem('token') || null);

    const fetchUser = async () => {
        if (!token.value) return;
        try {
            const response = await fetch(`/api/users/${localStorage.getItem('userId')}`, {
                headers: {
                    'Authorization': `Bearer ${token.value}`,
                    'Accept': 'application/json',
                },
            });
            if (!response.ok) throw new Error('Failed to fetch user');
            const data = await response.json();
            user.value = data;
        } catch (error) {
            console.error('Fetch user failed:', error);
            logout();
        }
    };

    if (token.value) {
        fetchUser();
    }

    const login = async (credentials) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Login failed');
            }

            const data = await response.json();
            user.value = data.user;
            token.value = data.token;
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.user.id);
            router.push({ name: 'home-page' });
        } catch (error) {
            throw error;
        }
    };

    const startSession = async (name) => {
        try {
            const response = await fetch('/api/start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to start session');
            }

            const data = await response.json();
            user.value = data.user;
            token.value = data.token;
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.user.id);

            const redirectUrl = localStorage.getItem('redirectAfterStart');
            if (redirectUrl) {
                localStorage.removeItem('redirectAfterStart');
                router.push(redirectUrl);
            } else {
                router.push({ name: 'home-page' });
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token.value}`,
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Logout failed');
            }

            const data = await response.json();
            user.value = null;
            token.value = null;
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            router.push({ name: 'landing-page' });

            return { success: true, message: data.status || 'Logged out' };
        } catch (error) {
            console.error('Logout failed:', error);
            return { success: false, message: error.message || 'Logout failed' };
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await fetch('/api/messages', {
                headers: {
                    'Authorization': `Bearer ${token.value}`,
                    'Accept': 'application/json',
                },
            });
            if (!response.ok) throw new Error('Failed to fetch messages');
            return await response.json();
        } catch (error) {
            throw error;
        }
    };

    return { user, token, login, startSession, logout, fetchMessages, fetchUser };
});
