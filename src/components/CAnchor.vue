<template>
    <v-btn
        :color="color"
        :href="href"
        target="_blank"
        rel="noopener noreferrer"
        :text="text"
        :icon="icon"
        :variant="icon ? 'tonal' : 'text'"
        :size="icon ? 'x-small': 'default'"
        :ripple="icon ? true : false"
        v-tooltip="{
            text: hint ? hint : '',
            disabled: !hint,
            location: 'top',
        }"
        :disabled="disabled">
    </v-btn>
</template>

<script setup>
defineOptions({
    name: 'CAnchor'
});

const props = defineProps({
    href: {
        type: String,
        default: null
    },
    text: {
        type: String,
        default: null
    },
    icon: {
        type: String,
        default: null
    },
    color: {
        type: String,
        default: 'primary'
    },
    hint: {
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
