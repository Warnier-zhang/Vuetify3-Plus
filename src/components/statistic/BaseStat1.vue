<template>
    <v-card elevation="2">
        <v-card-item class="pt-4 pb-0">
            <v-card-subtitle>
                <slot
                    name="subtitle"
                    :subtitle="subtitle"
                    :color="color">
                    {{ subtitle }}
                </slot>
            </v-card-subtitle>

            <template v-slot:append>
                <slot
                    name="appendIcon"
                    :icon="icon"
                    :color="color"/>
            </template>
        </v-card-item>

        <v-card-item class="py-0">
            <v-card-title>
                <slot
                    name="title"
                    :title="title"
                    :color="color">
                    <div class="font-weight-bold">
                        {{ title }}
                    </div>
                </slot>
            </v-card-title>
        </v-card-item>

        <v-card-text>
            <slot
                name="text"
                :text="text"
                :color="color">
                <div
                    class="text-caption text-truncate"
                    :title="text">
                    {{ text }}
                </div>
            </slot>
        </v-card-text>
    </v-card>
</template>

<script setup>
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
