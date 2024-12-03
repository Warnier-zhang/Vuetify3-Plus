<template>
    <v-card class="elevation-2 overflow-visible">
        <v-card-item class="py-0 mb-n4">
            <template v-slot:prepend>
                <v-sheet
                    class="v-sheet--offset d-flex flex-row justify-center"
                    elevation="8"
                    :color="color"
                    :width="80"
                    :height="80"
                    rounded>
                    <v-icon
                        class="align-self-center"
                        color="white"
                        size="x-large">
                        {{ icon }}
                    </v-icon>
                </v-sheet>
            </template>

            <v-card-subtitle class="text-end">
                {{ subtitle }}
            </v-card-subtitle>

            <v-card-title class="font-weight-bold text-end">
                {{ title }}
            </v-card-title>
        </v-card-item>

        <v-card-text class="text-caption text-truncate">
            <v-divider class="my-2"></v-divider>

            {{ text }}
        </v-card-text>
    </v-card>
</template>

<script setup>
defineOptions({
    name: 'CStat5',
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
.v-sheet--offset {
    top: -24px;
    position: relative;
}
</style>
