<template>
    <BaseStat2 class="d-inline-block">
        <template v-slot:prependIcon="{icon, color}">
            <v-progress-circular
                :model-value="actual / expected * 100"
                :color="color"
                :size="64"
                :width="8">
                {{ Math.ceil(actual / expected * 100) }}%
            </v-progress-circular>
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
    name: 'CStat9',
});

const props = defineProps({
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
