// ECharts
import "echarts";
import ECharts from 'vue-echarts';

export function registerECharts(app) {
    app.component("echarts", ECharts);
}
