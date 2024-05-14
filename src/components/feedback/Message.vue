<template>
    <v-snackbar
        v-model="showSnackbar"
        :color="type"
        :timeout="timeout"
        location="top end">
        <v-icon>{{ `$${type}` }}</v-icon>

        {{ message }}

        <template v-slot:actions>
            <v-btn
                variant="text"
                @click="showSnackbar = false">
                关闭
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script setup>
// Vue
import {ref, watch} from 'vue';

defineOptions({
    name: 'Message',
    inheritAttrs: false
});

const emit = defineEmits(['close']);

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: null,
        validator: (value) => ['success', 'info', 'warning', 'error'].includes(value)
    },
    timeout: {
        type: Number,
        default: 5000,
    },
    message: {
        type: String,
        default: null
    },
});

const showSnackbar = ref(false);
watch(
    () => props.visible,
    (value) => {
        showSnackbar.value = value;
    },
    {
        immediate: true,
    }
);
watch(
    showSnackbar,
    (value) => {
        if (!value) {
            emit('close');
        }
    }
);
</script>

<style scoped>

</style>
