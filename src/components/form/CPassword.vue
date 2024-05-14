<template>
    <v-text-field
        v-bind="$props"
        :type="inputType"
        :append-inner-icon="inputType === 'password' ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="inputType = (inputType === 'password' ? 'text' : 'password')">
    </v-text-field>
</template>

<script setup>
defineOptions({
    name: 'CPassword'
});

// Vue
import {ref} from 'vue';

const inputType = ref('password');
</script>

<style scoped>

</style>
