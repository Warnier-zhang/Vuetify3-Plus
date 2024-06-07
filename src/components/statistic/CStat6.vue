<template>
    <v-card class="elevation-2 d-inline-block">
        <v-card-item>
            <v-card-subtitle>
                <slot name="subtitle">
                    {{ subtitle }}
                </slot>
            </v-card-subtitle>

            <v-card-title class="font-weight-bold">
                <slot name="title">
                    {{ title }}
                </slot>
            </v-card-title>

            <template v-slot:prepend>
                <slot name="icon">
                    <v-avatar
                        :color="color"
                        class="text-white"
                        :icon="icon"
                        :rounded="rounded"
                        :variant="variant">
                    </v-avatar>
                </slot>
            </template>
        </v-card-item>
    </v-card>
</template>

<script setup>
defineOptions({
    name: 'CStat6',
});

const props = defineProps({
    title: {
        type: String,
        default: null
    },
    subtitle: {
        type: [String, Number],
        default: null
    },
    icon: {
        type: String,
        default: null
    },
    color: {
        type: String,
        default: null
    },
    rounded: {
        type: Boolean,
        default: true
    },
    variant: {
        type: String,
        default: 'elevated'
    },
});
</script>

<style scoped>

</style>
