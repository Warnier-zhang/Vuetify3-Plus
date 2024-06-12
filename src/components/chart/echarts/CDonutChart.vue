<template>
    <BaseChart
        :aspect-ratio="aspectRatio"
        :options="chartOptions">
    </BaseChart>
</template>

<script setup>
// Components
import BaseChart from '@/components/chart/echarts/BaseChart.vue';

// Vue
import {inject} from "vue";

// Pie
import {pieProps, usePie} from '@/components/chart/echarts/pie';

defineOptions({
    name: 'CDonutChart'
});

const props = defineProps(pieProps);

const $http = inject('$http');

const {chartOptions} = usePie($http, 'donut', props);
</script>

<style scoped>

</style>
