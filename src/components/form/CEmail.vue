<template>
    <v-autocomplete
        :model-value="modelValue"
        @update:modelValue="emit('update:modelValue', $event)"
        @update:search="updateItems($event)"
        :items="items">
    </v-autocomplete>
</template>

<script setup>
// Vue
import {onMounted, ref} from 'vue';

defineOptions({
    name: 'CEmail'
});

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    modelValue: [String, Number, Array],
    servers: {
        type: Array,
        default: () => [
            'gmail.com',
            'qq.com',
            '163.com',
            'vip.163.com',
            '126.com',
            'vip.126.com',
            'outlook.com',
            'hotmail.com',
            'foxmail.com',
            '139.com',
            '188.com',
        ],
    },
});

const items = ref([]);

function updateItems(input) {
    if (input) {
        let i = input.indexOf('@');
        if (i !== -1) {
            input = input.substring(0, i);
        }
    }
    items.value = props.servers.map((server) => {
        return `${input ? input : ''}@${server}`;
    });
}

onMounted(() => {
    updateItems();
});
</script>

<style scoped>

</style>
