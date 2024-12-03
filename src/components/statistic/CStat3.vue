<template>
    <BaseStat1>
        <template v-slot:text="{ color }">
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
    name: 'CStat3',
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
