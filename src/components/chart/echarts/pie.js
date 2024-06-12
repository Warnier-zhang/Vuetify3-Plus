// Components
import CMessage from '@/components/feedback/CMessage';

// Composables
import {useLang} from '@/composables/lang';
import {useMath} from '@/composables/math';

// Vue
import {ref, watch} from "vue";

export const pieProps = {
    title: {
        type: String,
        default: ""
    },
    subtitle: {
        type: String,
        default: ""
    },
    series: {
        type: Array,
        default: () => []
    },
    showLegend: {
        type: Boolean,
        default: false
    },
    url: {
        type: String,
        default: null
    },
    itemName: {
        type: String,
        default: 'name'
    },
    itemValue: {
        type: String,
        default: 'value'
    },
    valueUnit: {
        type: String,
        default: ''
    },
    rounded: {
        type: Boolean,
        default: false
    },
    aspectRatio: {
        type: [String, Number],
        default: 'auto'
    },
};

export function usePie($http, type, props) {
    const {percentage} = useMath();

    const chartOptions = ref({
        title: {
            text: props.title,
            subtext: props.subtitle,
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
            formatter(params) {
                let name = params.value[props.itemName];
                let value = params.value[props.itemValue];
                let percent = percentage(params.percent / 100);
                return `<span class="text-caption">${name}：</span><span class="font-weight-bold">${value}${props.valueUnit}</span><span class="text-caption">（占<span class="font-weight-bold">${percent}</span>）</span>`;
            }
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
                let serie = {
                    type: 'pie',
                    label: {
                        show: true,
                        formatter: `{@${props.itemName}}：{d}%`,
                    },
                    encode: {
                        itemName: props.itemName,
                        value: props.itemValue,
                    },
                    emphasis: {
                        focus: 'self',
                    },
                };
                if (type === 'pie') {
                    serie['radius'] = '50%';
                } else if (type === 'donut') {
                    serie['radius'] = ['30%', '50%'];
                } else if (type === 'half-donut') {
                    serie['radius'] = ['30%', '50%'];
                    serie['startAngle'] = 180;
                    serie['endAngle'] = 360;
                } else if (type === 'coxcomb') {
                    serie['radius'] = ['10%', '50%'];
                    serie['roseType'] = 'radius';
                }
                if (props.rounded) {
                    serie['itemStyle'] = {
                        borderRadius: 10,
                        borderColor: 'white',
                        borderWidth: 5
                    };
                }
                chartOptions.value.series.push(serie);
                chartOptions.value.dataset.source = value;
            }
        },
        {
            immediate: true,
            deep: true,
        }
    );

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

    return {
        chartOptions
    };
}
