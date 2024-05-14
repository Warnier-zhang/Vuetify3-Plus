<template>
    <v-overlay
        v-model="showOverlay"
        class="d-flex justify-center align-center"
        no-click-animation
        persistent>
        <div class="d-flex flex-column align-center">
            <v-progress-circular
                :color="color"
                size="large"
                indeterminate>
            </v-progress-circular>

            <div :class="[`text-${color}`, 'text-body-1', 'mt-1']">
                {{ text }}
            </div>
        </div>
    </v-overlay>
</template>

<script setup>
// Vue
import {ref, watch} from 'vue';

defineOptions({
    name: 'Loading',
    inheritAttrs: false
});

defineExpose({
    close,
});

const emit = defineEmits(['close']);

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        default: 'primary'
    },
    text: {
        type: String,
        default: 'Loading...'
    },
});

const showOverlay = ref(false);
watch(
    () => props.visible,
    (value) => {
        showOverlay.value = value;
    },
    {
        immediate: true,
    }
);

watch(
    showOverlay,
    (value) => {
        if (!value) {
            emit('close');
        }
    }
);

function close() {
    showOverlay.value = false;
}
</script>

<style scoped>

</style>
