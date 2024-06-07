<template>
    <v-card class="elevation-2">
        <v-card-item class="pt-4 pb-0">
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
        </v-card-item>

        <v-card-text>
            <div class="d-flex flex-row justify-space-between">
                <div class="text-caption text-medium-emphasis">
                    {{ Math.ceil(actual / expected * 100) }}% ({{ actual }})
                </div>
                <div class="text-caption text-medium-emphasis">
                    {{ expected }}
                </div>
            </div>

            <v-progress-linear
                :model-value="actual / expected * 100"
                :color="color"
                height="8"
                rounded>
            </v-progress-linear>
        </v-card-text>
    </v-card>
</template>

<script setup>
defineOptions({
    name: 'CStat3',
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
    color: {
        type: String,
        default: null
    },
    actual: {
        type: [String, Number],
        default: null
    },
    expected: {
        type: [String, Number],
        default: null
    }
});
</script>

<style scoped>

</style>
