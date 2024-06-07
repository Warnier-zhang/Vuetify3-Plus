<template>
    <v-card class="elevation-2 overflow-visible">
        <v-card-text class="py-0 d-flex flex-row justify-space-between">
            <v-sheet
                class="v-sheet--offset d-flex flex-column justify-center"
                elevation="8"
                :color="color"
                :width="80"
                :height="80"
                rounded>
                <v-icon
                    class="align-self-center"
                    color="white"
                    size="36">
                    {{ icon }}
                </v-icon>
            </v-sheet>

            <div class="pt-3">
                <v-card-subtitle class="text-end pr-0">
                    {{ subtitle }}
                </v-card-subtitle>

                <v-card-title class="font-weight-bold text-end py-0 pr-0">
                    {{ title }}
                </v-card-title>
            </div>
        </v-card-text>

        <v-card-text class="mt-n8">
            <v-divider class="my-2"></v-divider>

            <span class="text-caption">
                {{ text }}
            </span>
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
