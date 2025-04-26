<script setup>
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
    type: { type: String, default: 'text' },
    modelValue: { type: String, required: true },
    id: String,
    required: Boolean,
    autocomplete: String,
    class: String
});

const emit = defineEmits(['update:modelValue']);
const input = ref(null);

onMounted(() => {
    if (input.value && input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});

const updateValue = (event) => {
    emit('update:modelValue', event.target.value);
};
</script>

<template>
    <input :id="id" :type="type" :class="[
        props.class || '',
        'w-full',
        'py-3',
        'border',
        'border-gray-200',
        'rounded-lg',
        'focus:ring-2',
        'focus:ring-indigo-300',
        'focus:border-indigo-500',
        'outline-none transition-all',
        'duration-200',
        'placeholder-gray-400'
    ]" :value="modelValue" :required="required" :autocomplete="autocomplete" @input="updateValue" ref="input" />
</template>
