<template>
    <BaseStat1>
        <template v-slot:text="{ color }">
            <v-sparkline
                :class="[type === 'trend' ? `text-${color}-lighten-4` : '']"
                :model-value="items"
                :type="type"
                :color="color"
                :line-width="type === 'bar' ? 20 : 4"
                stroke-linecap="round"
                height="42"
                padding="0"
                smooth
                fill
                auto-draw>
            </v-sparkline>
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
    name: 'CStat8',
});

const props = defineProps({
    type: {
        type: String,
        validator(value) {
            return ['trend', 'bar'].includes(value);
        },
        default: 'trend',
    },
    items: {
        type: Array,
        default: () => []
    }
});
</script>

<style scoped>

</style>
