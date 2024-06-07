<template>
    <v-card class="elevation-2 pa-2">
        <template v-slot:prepend>
            <v-avatar
                v-if="avatar"
                class="rounded-lg"
                :icon="icon"
                :color="color"
                rounded="0"
                variant="outlined">
            </v-avatar>

            <v-icon
                v-else
                :icon="icon"
                :color="color"
                size="large">
            </v-icon>
        </template>

        <v-card-item>
            <v-card-title class="text-subtitle-1">{{ title }}</v-card-title>

            <v-card-subtitle class="text-body-2">{{ subtitle }}</v-card-subtitle>
        </v-card-item>

        <v-card-actions class="mt-4">
            <v-btn
                @click="emit('click')"
                class="text-none"
                :color="btnColor"
                variant="flat"
                block>
                {{ btnText }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
defineOptions({
    name: 'CStat7',
    inheritAttrs: false
});

const emit = defineEmits(['click']);

const props = defineProps({
    title: {
        type: String,
        default: null
    },
    subtitle: {
        type: String,
        default: null
    },
    avatar: {
        type: Boolean,
        default: false
    },
    icon: {
        type: String,
        default: null
    },
    color: {
        type: String,
        default: null
    },
    btnText: {
        type: String,
        default: null
    },
    btnColor: {
        type: String,
        default: null
    },
});
</script>

<style scoped>

</style>
