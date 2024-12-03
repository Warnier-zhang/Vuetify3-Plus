<template>
    <BaseStat1>
        <template v-slot:subtitle="{ subtitle, color }">
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
                    {{ hint }}
                </div>
            </v-toolbar>
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
    name: 'CStat4',
});

const props = defineProps({
    hint: {
        type: String,
        default: null
    },
});
</script>

<style scoped>

</style>
