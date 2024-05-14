<template>
    <BaseSelect v-slot="{attrs}">
        <v-select v-bind="attrs"></v-select>
    </BaseSelect>
</template>

<script setup>
// Components
import BaseSelect from "@/components/form/selection/BaseSelect.vue";

defineOptions({
    name: 'CSelect'
});
</script>

<style scoped>

</style>
