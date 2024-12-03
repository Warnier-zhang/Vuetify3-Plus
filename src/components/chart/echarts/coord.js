// Components
import CMessage from '@/components/feedback/CMessage';

// Composables
import {useLang} from '@/composables/lang';

// Vue
import {ref, watch} from "vue";

// Utilities
import cloneDeep from 'lodash/cloneDeep';

export const coordProps = {
    title: {
        type: String,
        default: ""
    },
    subtitle: {
        type: String,
        default: ""
    },
    xAxisType: {
        type: String,
        default: 'category',
        validator(value) {
            return ['value', 'category', 'time'].includes(value);
        }
    },
    xAxisTitle: {
        type: String,
        default: ""
    },
    xAxisScale: {
        type: Boolean,
        default: false
    },
    yAxisType: {
        type: String,
        default: 'value',
        validator(value) {
            return ['value', 'category', 'time'].includes(value);
        }
    },
    yAxisTitle: {
        type: String,
        default: ""
    },
    yAxisScale: {
        type: Boolean,
        default: false
    },
    yAxisUnit: {
        type: String,
        default: ''
    },
    yAxisMin: {
        type: [String, Number],
        default: null
    },
    yAxisMax: {
        type: [String, Number],
        default: null
    },
    series: {
        type: Array,
        default: () => []
    },
    showPoint: {
        type: Boolean,
        default: true
    },
    multiple: {
        type: Boolean,
        default: false
    },
    showLegend: {
        type: Boolean,
        default: false
    },
    smooth: {
        type: Boolean,
        default: false
    },
    steped: {
        type: Boolean,
        default: false
    },
    stacked: {
        type: Boolean,
        default: false
    },
    url: {
        type: String,
        default: null
    },
    itemSerieName: {
        type: String,
        default: 'serieName'
    },
    itemName: {
        type: String,
        default: 'name'
    },
    nameTitle: {
        type: String,
        default: ''
    },
    itemX: {
        type: String,
        default: 'x'
    },
    itemY: {
        type: String,
        default: 'y'
    },
    itemZ: {
        type: String,
        default: null
    },
    maxPointSize: {
        type: Number,
        default: 100
    },
    minPointSize: {
        type: Number,
        default: 10
    },
    lines: {
        type: Array,
        default: () => []
    },
    aspectRatio: {
        type: [String, Number],
        default: 'auto'
    },
};

export function useCoord($http, type, props) {
    const chartOptions = ref({
        // grid: {
        //     containLabel: true,
        // },
        title: {
            text: props.title,
            subtext: props.subtitle,
            left: 'center',
        },
        xAxis: {
            type: props.xAxisType,
            name: props.xAxisTitle,
            scale: props.xAxisScale,
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                // 显示全部标签
                interval: 0,
                // formatter: '{yyyy}-{MM}-{dd}',
                // hideOverlap: true,
            }
        },
        yAxis: {
            type: props.yAxisType,
            name: props.yAxisTitle,
            scale: props.yAxisScale,
            axisLabel: {
                formatter: `{value}${props.yAxisUnit}`
            },
            min: props.yAxisMin,
            max: props.yAxisMax,
        },
        tooltip: {
            trigger: 'axis',
            formatter(params) {
                let tooltip = '';
                if (props.multiple) {
                    tooltip = `<span class="text-subtitle-2">${params[0].value[props.itemX]}</span><br/>`;
                    for (let param of params) {
                        tooltip += `<span class="text-caption" style="color: ${param.color};">● ${param.value[props.itemSerieName]}：</span><span class="font-weight-bold">${param.value[props.itemY]}${props.yAxisUnit}</span><br/>`;
                    }
                } else {
                    if (type === 'bubble') {
                        tooltip = `<span class="text-subtitle-2">${params[0].value[props.itemX]}</span><br/>`;
                        for (let param of params) {
                            tooltip += `<span class="text-caption" style="color: ${param.color};">● ${param.value[props.itemName]}：</span><span class="font-weight-bold">${param.value[props.itemY]}${props.yAxisUnit}</span><br/>`;
                        }
                    } else {
                        tooltip = `<span class="text-caption">${props.xAxisTitle}：</span><span class="font-weight-bold">${params[0].value[props.itemX]}</span><br/><span class="text-caption">${props.yAxisTitle}：</span><span class="font-weight-bold">${params[0].value[props.itemY]}${props.yAxisUnit}</span>`;
                    }
                }
                return tooltip;
            },
            confine: true,
        },
        legend: {
            show: props.showLegend,
            data: [],
            top: 'bottom',
        },
        dataset: {
            source: [],
        },
        series: [],
    });

    const chartData = ref([]);
    const {Arrays, AsyncTask} = useLang();
    watch(
        [
            () => props.url,
            () => props.series,
        ],
        ([url, series]) => {
            if (Arrays.isNotEmpty(series)) {
                chartData.value = series;
            } else if (url) {
                loadSeries();
            }
        },
        {
            immediate: true,
            deep: true,
        }
    );


    async function loadSeries() {
        let [error, response] = await AsyncTask($http.get(props.url));
        if (error) {
            CMessage.error(error.message);
            console.log(error);
            return;
        }
        if (response.errorCode === 1) {
            if (Arrays.isNotEmpty(response.data)) {
                chartData.value = response.data;
            }
        } else {
            CMessage.error(response.msg);
            console.log(response.msg);
        }
    }

    watch(
        chartData,
        (value) => {
            if (Arrays.isNotEmpty(value)) {
                if (!props.multiple) {
                    let serie = buildSerie(null, null, type, props);
                    chartOptions.value.series.push(serie);
                    chartOptions.value.dataset.source = value;
                } else {
                    let series = [];
                    let legends = [];
                    let dataset = [];
                    value.forEach((items, index) => {
                        let serie = buildSerie(items[0][props.itemSerieName], index, type, props);
                        series.push(serie);
                        legends.push(items[0][props.itemSerieName]);
                        dataset.push({
                            source: items
                        });
                    });
                    chartOptions.value.series = series;
                    chartOptions.value.legend.data = legends;
                    chartOptions.value.dataset = dataset;
                }
                addMarkLines();
            }
        },
        {
            immediate: true,
            deep: true,
        }
    );

    function buildSerie(name, datasetIndex, type, props) {
        let chartType = 'line';
        if (type === 'area') {
            chartType = 'line';
        } else if (type === 'column') {
            chartType = 'bar';
        } else if (type === 'bubble') {
            chartType = 'scatter';
        }

        let serie = {
            type: chartType,
            name,
            datasetIndex,
            encode: {
                x: props.itemX,
                y: props.itemY,
            },
            showSymbol: props.showPoint,
            emphasis: {
                focus: props.multiple ? 'none' : 'self',
            },
            smooth: props.smooth,
            markLine: {
                data: [],
            }
        };
        if (type === 'area') {
            serie['areaStyle'] = {};
        } else if (type === 'bubble') {
            serie['label'] = {
                show: true,
                position: 'inside',
                formatter: `{@${props.itemName}}`,
            };
            serie['itemStyle'] = {
                shadowBlur: 10,
                shadowColor: '#9E9E9E',
                shadowOffsetY: 5,
            };
            if (props.itemZ) {
                serie['symbolSize'] = function (value) {
                    let minSize = props.minPointSize;
                    let maxSize = props.maxPointSize;
                    let values = props.multiple ? chartData.value.flat() : chartData.value;
                    values = values.map((item) => {
                        return Math.abs(item[props.itemZ]);
                    });
                    let minValue = Math.min(...values);
                    let maxValue = Math.max(...values);
                    return (Math.abs(value[props.itemZ]) - minValue) / (maxValue - minValue) * (maxSize - minSize) + minSize;
                };
            } else {
                serie['symbolSize'] = props.minPointSize;
            }
        } else if (type === 'column') {
            if (props.stacked) {
                serie['stack'] = 'total';
                serie['label'] = {
                    show: true,
                    formatter: `{@${props.itemY}}${props.yAxisUnit}`,
                };
            }
        } else if (type === 'line') {
            if (props.steped) {
                serie['step'] = 'start';
            }
        }
        return serie;
    }

    watch(
        () => props.title,
        (value) => {
            chartOptions.value.title.text = value;
        },
        {
            immediate: true
        }
    );

    watch(
        () => props.subtitle,
        (value) => {
            chartOptions.value.title.subtext = value;
        },
        {
            immediate: true
        }
    );

    watch(
        () => props.lines,
        (value) => {
            addMarkLines();
        },
        {
            immediate: true,
            deep: true,
        }
    );

    function addMarkLines() {
        if (Arrays.isNotEmpty(chartOptions.value.series)) {
            chartOptions.value.series[0].markLine.data.length = 0;
            if (Arrays.isNotEmpty(props.lines)) {
                let lines = cloneDeep(props.lines);
                lines.forEach((line) => {
                    line['tooltip'] = {
                        trigger: 'item',
                        formatter(params) {
                            return `<span class="text-caption">${params.name}：</span><span class="font-weight-bold">${params.value}</span>`;
                        }
                    };
                    chartOptions.value.series[0].markLine.data.push(line);
                });
            }
        }
    }

    watch(
        () => props.yAxisMin,
        (value) => {
            chartOptions.value.yAxis.min = value;
        },
        {
            immediate: true,
        }
    );

    watch(
        () => props.yAxisMax,
        (value) => {
            chartOptions.value.yAxis.max = value;
        },
        {
            immediate: true,
        }
    );

    return {
        chartOptions
    };
}
