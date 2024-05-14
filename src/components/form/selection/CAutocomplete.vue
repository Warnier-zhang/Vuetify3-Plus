<template>
    <BaseSelect v-slot="{attrs}">
        <v-autocomplete v-bind="attrs"></v-autocomplete>
    </BaseSelect>
</template>

<script setup>
// Components
import BaseSelect from "@/components/form/selection/BaseSelect.vue";

defineOptions({
    name: 'CAutocomplete'
});
</script>

<style scoped>

</style>
