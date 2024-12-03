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

const emit = defineEmits(['update:title', 'update:selected']);

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
        let selected = [];
        let titles = [];

        let values = attrs.multiple === '' ? value : [value];
        if (isNotEmpty(items) && isNotEmpty(values)) {
            selected = items.filter((item) => values.includes(item[props.itemValue]));
            titles = selected.map((item) => item[props.itemTitle]);
        }
        emit('update:selected', attrs.multiple === '' ? selected : selected[0]);
        emit('update:title', titles.join(','));
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
