<template>
    <BaseSelect v-slot="{attrs}">
        <v-chip-group v-bind="attrs">
            <v-chip
                v-for="item in attrs.items"
                v-bind="chipProps"
                :value="item[attrs.itemValue]">
                {{ item[attrs.itemTitle] }}
            </v-chip>
        </v-chip-group>
    </BaseSelect>
</template>

<script setup>
// Components
import BaseSelect from "@/components/form/selection/BaseSelect.vue";

// Vue
import {ref, useAttrs, watch} from 'vue';

defineOptions({
    name: 'CChipGroup'
});

const attrs = useAttrs();

const chipProps = ref(null);
watch(
    () => attrs,
    (value) => {
        if (value) {
            chipProps.value = {};
            Object.keys(value)
                .filter((key) => key.startsWith('chip-'))
                .forEach((key) => {
                    chipProps.value[key.substring(5)] = value[key];
                });
        }
    },
    {
        immediate: true,
        deep: true,
    }
)
</script>

<style scoped>

</style>
