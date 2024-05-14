<template>
    <v-app>
        <v-main>
            <v-container fluid>
                <Feedback/>

                <v-divider class="mt-8"></v-divider>

                <Form/>

                <v-divider></v-divider>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import Feedback from '@/demos/Feedback.vue';
import Form from '@/demos/Form.vue';
</script>

<style scoped>

</style>
