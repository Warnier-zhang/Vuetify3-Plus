<template>
    <v-card class="elevation-2">
        <v-card-text class="pb-2">
            <v-toolbar
                color="rgba(0, 0, 0, 0)"
                height="24"
                flat>
                <v-divider
                    :color="color"
                    thickness="5"
                    class="rounded-shaped border-opacity-100"
                    vertical>
                </v-divider>

                <div class="text-subtitle-2 text-disabled ml-2">
                    <slot name="subtitle">
                        {{ subtitle }}
                    </slot>
                </div>

                <v-spacer></v-spacer>

                <div :class="['text-caption', 'text-truncate', 'font-weight-bold', `text-${color}`]">
                    <slot name="emphasis">
                        {{ emphasis }}
                    </slot>
                </div>
            </v-toolbar>
        </v-card-text>

        <v-card-item class="py-0">
            <v-card-title class="font-weight-bold">
                <slot name="title">
                    {{ title }}
                </slot>
            </v-card-title>
        </v-card-item>

        <v-card-text class="text-caption text-truncate pt-0">
            <slot name="text">
                {{ text }}
            </slot>
        </v-card-text>
    </v-card>
</template>

<script setup>
defineOptions({
    name: 'CStat4',
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
    emphasis: {
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
