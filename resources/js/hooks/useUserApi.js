import { ref } from 'vue';

export function useUserApi(userId = null) {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const fetchData = async () => {
        loading.value = true;
        error.value = null;

        try {
            const endpoint = userId ? `/api/users/${userId}` : '/api/users';
            const response = await fetch(endpoint, {
                credentials: 'include',
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

    fetchData();

    return {
        data,
        loading,
        error,
        refresh: fetchData,
    };
}
