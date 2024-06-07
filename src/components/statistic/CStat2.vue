<template>
    <v-card class="elevation-2">
        <v-card-item
            class="pt-4 pb-0"
            :subtitle="subtitle">
            <template v-slot:append>
                <div style="min-height: 32px;"
                     :class="[`text-${color}`]">
                    <slot name="icon">
                        <v-btn
                            variant="tonal"
                            size="x-small"
                            :icon="icon">
                        </v-btn>
                    </slot>
                </div>
            </template>
        </v-card-item>

        <v-card-item class="py-0">
            <v-card-title class="font-weight-bold">
                <slot name="title">
                    {{ title }}
                </slot>
            </v-card-title>
        </v-card-item>

        <v-card-text class="text-caption text-truncate">
            <slot name="text">
                {{ text }}
            </slot>
        </v-card-text>
    </v-card>
</template>

<script setup>
defineOptions({
    name: 'CStat2',
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
    icon: {
        type: String,
        default: null
    },
    color: {
        type: String,
        default: null
    },
});
</script>

<style scoped>

</style>
