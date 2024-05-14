<template>
    <!-- 无渲染组件 -->
    <slot :attrs="allAttrs"></slot>
</template>

<script setup>
// Vue
import {computed, inject, useAttrs, watch} from 'vue';

// Composables
import {useArrays} from '@/composables/arrays';
import {useItems} from '@/components/items';

defineOptions({
    inheritAttrs: false,
});

const emit = defineEmits(['update:title']);

const props = defineProps({
    modelValue: {
        type: [String, Number, Array],
        default: null
    },
    url: {
        type: String,
        default: null
    },
    items: {
        type: Array,
        default: () => [],
    },
    itemTitle: {
        type: String,
        default: 'title'
    },
    itemValue: {
        type: String,
        default: 'value'
    },
});

const attrs = useAttrs();

const $http = inject('$http');
const {items} = useItems($http, props.url);

const {isNotEmpty} = useArrays();
watch(
    () => props.items,
    (value) => {
        if (isNotEmpty(value)) {
            items.value = value;
        }
    },
    {
        immediate: true,
        deep: true,
    }
);

watch(
    [
        items,
        () => props.modelValue,
    ],
    ([items, value]) => {
        let title = null;
        if (isNotEmpty(items) && value) {
            let item = items.find((item) => item[props.itemValue] === value);
            if (item) {
                title = item[props.itemTitle];
            }
        }
        emit('update:title', title);
    },
    {
        immediate: true,
        deep: true,
    }
);

const allAttrs = computed(() => {
    return Object.assign({}, props, attrs, {items: items.value});
});
</script>

<style scoped>

</style>
