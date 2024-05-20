<template>
    <slot :label="label">
        <span class="text-no-wrap">{{ label }}</span>
    </slot>
</template>

<script setup>
defineOptions({
    name: 'CLabel'
});

// Composables
import {useLang} from '@/composables/lang';
import {useItems} from '@/components/items';

// Vue
import {ref, watch, inject} from 'vue';

const props = defineProps({
    value: {
        type: [String, Number],
        default: null,
    },
    url: {
        type: String,
        default: null,
    },
    items: {
        type: Array,
        default: () => [],
    },
    itemTitle: {
        type: String,
        default: 'title',
    },
    itemValue: {
        type: String,
        default: 'value',
    }
});

const $http = inject('$http');
const {items: data} = useItems($http, props.url);

const {Arrays} = useLang();
watch(
    () => props.items,
    (value) => {
        if (Arrays.isNotEmpty(value)) {
            data.value = value;
        }
    },
    {
        immediate: true,
        deep: true,
    }
);

const label = ref(null);
watch(
    [
        data,
        () => props.value,
    ],
    ([data, value]) => {
        if (value) {
            label.value = value;
            if (Arrays.isNotEmpty(data)) {
                for (let item of data) {
                    if (item[props.itemValue] === value) {
                        label.value = item[props.itemTitle];
                        break;
                    }
                }
            }
        } else {
            label.value = null;
        }
    },
    {
        immediate: true,
        deep: true,
    }
);
</script>

<style scoped>

</style>
