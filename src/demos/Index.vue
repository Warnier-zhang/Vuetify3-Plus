<template>
    <v-app>
        <v-main>
            <v-container fluid>
                <Feedback/>

                <v-divider class="mt-8"></v-divider>

                <Form/>

                <v-divider class="mt-8"></v-divider>

                <Other/>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import Feedback from '@/demos/Feedback.vue';
import Form from '@/demos/Form.vue';
import Other from '@/demos/Other.vue';
</script>

<style scoped>

</style>
