<template>
    <v-btn
        class="pl-0"
        color="primary"
        :href="href"
        target="_blank"
        rel="noopener"
        variant="text"
        :disabled="disabled"
        :ripple="false">
        {{ text }}

        <v-tooltip
            v-if="showHint"
            activator="parent"
            location="top">
            {{ hint }}
        </v-tooltip>
    </v-btn>
</template>

<script setup>
defineOptions({
    name: 'CAnchor'
});

const props = defineProps({
    text: {
        type: String,
        default: null
    },
    hint: {
        type: String,
        default: null
    },
    showHint: {
        type: [Boolean, String],
        default: false
    },
    href: {
        type: String,
        default: null
    },
    disabled: {
        type: Boolean,
        default: false
    },
});
</script>

<style scoped>

</style>
