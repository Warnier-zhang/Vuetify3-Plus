// Highcharts
import Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
import highchartsMore from 'highcharts/highcharts-more'
import HighchartsVue from 'highcharts-vue';
import variablepie from 'highcharts/modules/variable-pie';

Highcharts3D(Highcharts);
variablepie(Highcharts);
highchartsMore(Highcharts);

export function registerHighcharts(app) {
    app.use(HighchartsVue);
}
