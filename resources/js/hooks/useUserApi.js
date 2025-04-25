import { ref } from 'vue';

export function useUserApi(endpoint) {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const fetchData = async () => {
        loading.value = true;
        error.value = null;

        try {
            const response = await fetch(endpoint);
            if (!response.ok) throw new Error('Network response was not ok');
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
