<template>
    <v-text-field v-bind="$props">
        <template v-slot:append-inner>
            <v-img
                width="48"
                height="27"
                aspect-ratio="16/9"
                cover
                :src="captchaUrl"
                @click="refreshCaptcha">
            </v-img>
        </template>
    </v-text-field>
</template>

<script setup>
defineOptions({
    name: 'CCaptcha'
});

// Vue
import {ref} from 'vue';

const props = defineProps({
    url: {
        type: String,
        default: null
    },
});

const captchaUrl = ref(`${props.url}${props.url.indexOf('?') === -1 ? '?' : '&'}random=${Math.random()}`);

function refreshCaptcha() {
    captchaUrl.value = `${props.url}${props.url.indexOf('?') === -1 ? '?' : '&'}random=${Math.random()}`;
}
</script>

<style scoped>

</style>
