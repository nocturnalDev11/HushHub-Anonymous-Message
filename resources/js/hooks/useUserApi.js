import { ref } from 'vue';

export function useUserApi(userId = null) {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const fetchData = async () => {
        loading.value = true;
        error.value = null;

        try {
            // Construct endpoint: use userId for specific user, or fallback to a general user endpoint
            const endpoint = userId ? `/api/users/${userId}` : '/api/users';
            const response = await fetch(endpoint, {
                credentials: 'include', // Include session cookie for auth:web
                headers: {
                    'Accept': 'application/json',
                },
            });
            if (!response.ok) throw new Error('Failed to fetch user data');
            data.value = await response.json();
        } catch (err) {
            error.value = err.message || 'An error occurred';
        } finally {
            loading.value = false;
        }
    };

    // Trigger fetch immediately
    fetchData();

    return {
        data,
        loading,
        error,
        refresh: fetchData,
    };
}
