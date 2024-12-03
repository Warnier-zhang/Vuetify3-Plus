<template>
    <BaseStat1>
        <template v-slot:appendIcon="{ icon, color }">
            <v-chip
                v-if="chip"
                :color="color"
                :prepend-icon="icon"
                size="small">
                <span class="font-weight-bold">{{ chipText }}</span>
            </v-chip>

            <v-btn
                v-else
                :color="color"
                :icon="icon"
                size="x-small"
                variant="tonal">
            </v-btn>
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
    </BaseStat1>
</template>

<script setup>
import BaseStat1 from "@/components/statistic/BaseStat1.vue";

defineOptions({
    name: 'CStat2',
});

const props = defineProps({
    chip: {
        type: Boolean,
        default: false
    },
    chipText: {
        type: String,
        default: null
    },
});
</script>

<style scoped>

</style>
