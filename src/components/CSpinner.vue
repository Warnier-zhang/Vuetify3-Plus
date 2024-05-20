<template>
    <svg
        :class="['q-spinner', 'q-spinner-mat', `text-${color}`]"
        :width="size"
        :height="size"
        viewBox="25 25 50 50">
        <circle
            class="path"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="currentColor"
            :stroke-width="thickness"
            stroke-miterlimit="10"/>
    </svg>
</template>

<script setup>
defineOptions({
    name: 'CSpinner'
});

const props = defineProps({
    color: {
        type: String,
        default: 'primary'
    },
    size: {
        type: [String, Number],
        default: '1em'
    },
    thickness: {
        type: Number,
        default: 5
    }
});
</script>

<style scoped>
.q-spinner {
    vertical-align: middle;
}

.q-spinner-mat {
    animation: q-spin 2s linear infinite;
    transform-origin: center center;
}

.q-spinner-mat .path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: q-mat-dash 1.5s ease-in-out infinite;
}

@keyframes q-spin {
    0% {
        transform: rotate3d(0, 0, 1, 0deg)
    }
    25% {
        transform: rotate3d(0, 0, 1, 90deg)
    }
    50% {
        transform: rotate3d(0, 0, 1, 180deg)
    }
    75% {
        transform: rotate3d(0, 0, 1, 270deg)
    }
    100% {
        transform: rotate3d(0, 0, 1, 359deg)
    }
}

@keyframes q-mat-dash {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
    }
    100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
    }
}
</style>
