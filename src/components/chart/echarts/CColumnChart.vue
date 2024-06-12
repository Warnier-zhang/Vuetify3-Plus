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

// 2D Coord
import {coordProps, useCoord} from '@/components/chart/echarts/coord';

defineOptions({
    name: 'CColumnChart'
});

const props = defineProps(coordProps);

const $http = inject('$http');

const {chartOptions} = useCoord($http, 'column', props);
</script>

<style scoped>

</style>
