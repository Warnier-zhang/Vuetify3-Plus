<template>
    <echarts
        ref="chart"
        :init-options="{locale: 'ZH'}"
        :option="chartOptions">
    </echarts>
</template>

<script setup>
// Vue
import {ref, toValue, useAttrs, watch} from 'vue';

// Composables
import {useElementSize} from '@vueuse/core';

defineOptions({
    inheritAttrs: false,
});

const props = defineProps({
    aspectRatio: {
        type: [String, Number],
        default: 'auto'
    },
    options: {
        type: Object,
        default: null,
    }
});

const chartOptions = ref(props.options);

const chart = ref(null);
const attrs = useAttrs();
const {width, height} = useElementSize(chart);
watch(
    [
        () => props.aspectRatio,
        width,
        height,
    ],
    ([aspectRatio, width, height]) => {
        if (width > 0) {
            chart.value.resize({
                width,
                height: !aspectRatio || aspectRatio === 'auto' ? height > 0 ? height : width : width / parseFloat(aspectRatio)
            });
            chart.value.getDom().className = attrs.class ? attrs.class : '';
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
