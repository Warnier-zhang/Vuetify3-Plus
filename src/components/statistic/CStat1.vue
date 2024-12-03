<template>
    <v-alert
        class="text-center"
        :class="$attrs.variant === 'outlined' ? 'elevation-0' : 'elevation-2'"
        border="top">
        <v-card-item class="py-0">
            <v-card-title class="font-weight-bold">
                <slot name="title">
                    {{ title }}
                </slot>
            </v-card-title>
        </v-card-item>

        <v-card-text class="text-caption text-truncate py-1">
            <slot name="text">
                <span :title="text">{{ text }}</span>
            </slot>
        </v-card-text>

        <v-card-item class="py-0">
            <v-card-subtitle>
                <slot name="subtitle">
                    {{ subtitle }}
                </slot>
            </v-card-subtitle>
        </v-card-item>
    </v-alert>
</template>

<script setup>
defineOptions({
    name: 'CStat1',
});

const props = defineProps({
    title: {
        type: String,
        default: null
    },
    subtitle: {
        type: String,
        default: null
    },
    text: {
        type: String,
        default: null
    },
});
</script>

<style scoped>

</style>
