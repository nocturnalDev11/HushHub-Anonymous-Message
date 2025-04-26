<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps({
    message: { type: String, required: true },
    description: { type: String, default: '' },
    type: { type: String, default: 'info' },
    duration: { type: Number, default: 3000 },
});

const emit = defineEmits(['close']);

const isVisible = ref(false);

const toastStyles = computed(() => ({
    success: 'bg-green-50/80 border-green-200 text-green-800',
    error: 'bg-red-50/80 border-red-200 text-red-800',
    warning: 'bg-yellow-50/80 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50/80 border-blue-200 text-blue-800',
}[props.type] || 'bg-blue-50/80 border-blue-200 text-blue-800'));

const iconStyles = computed(() => ({
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
}[props.type] || 'text-blue-500'));

const getIcon = computed(() => ({
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info',
}[props.type] || 'info'));

onMounted(() => {
    isVisible.value = true;
    const timer = setTimeout(() => {
        isVisible.value = false;
        setTimeout(() => emit('close'), 300);
    }, props.duration);
    return () => clearTimeout(timer);
});

onUnmounted(() => {
    isVisible.value = false;
});

const handleClose = () => {
    isVisible.value = false;
    setTimeout(() => emit('close'), 300);
};
</script>

<template>
    <div v-if="message"
        :class="['toast', toastStyles, { 'opacity-100 translate-y-0': isVisible, 'opacity-0 translate-y-4': !isVisible }]"
        class="fixed bottom-6 right-6 z-50 max-w-sm w-full rounded-xl backdrop-blur-md border p-4 shadow-lg transition-all duration-300">
        <div class="flex items-start space-x-3">
            <span :class="['material-symbols-outlined text-xl', iconStyles]">{{ getIcon }}</span>
            <div class="flex-1">
                <p class="text-sm font-medium">{{ message }}</p>
                <p v-if="description" class="text-xs opacity-75 mt-1">{{ description }}</p>
            </div>
            <button @click="handleClose" class="text-gray-500 hover:text-gray-700 rounded-full p-1 transition-colors"
                aria-label="Close notification">
                <span class="material-symbols-outlined text-lg">close</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
.toast {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.material-symbols-outlined {
    font-family: 'Material Symbols Outlined' !important;
}
</style>
