<template>
    <BaseStat2 class="d-inline-block">
        <template v-slot:prependIcon="{icon, color}">
            <v-avatar
                :color="color"
                class="text-white"
                :icon="icon"
                :rounded="rounded"
                :variant="variant">
            </v-avatar>
        </template>

        <template
            v-for="(item, key, index) in $slots"
            :key="index"
            v-slot:[key]="slotProps">
            <slot
                :name="key"
                v-bind="slotProps">
            </slot>
        </template>
    </BaseStat2>
</template>

<script setup>
import BaseStat2 from "@/components/statistic/BaseStat2.vue";

defineOptions({
    name: 'CStat6',
});

const props = defineProps({
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
