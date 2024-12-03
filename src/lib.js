// Components
// Table
import CCrudTable from '@/components/table/CCrudTable.vue';
import CCrudTableV2 from '@/components/table/CCrudTableV2.vue';

// Form
import CPassword from '@/components/form/CPassword.vue';
import CCaptcha from '@/components/form/CCaptcha.vue';
import CEmail from '@/components/form/CEmail.vue';
import CDatePicker from '@/components/form/CDatePicker.vue';
import CDatetimePicker from '@/components/form/CDatetimePicker.vue';
import CCascader from '@/components/form/CCascader.vue';
import CTree from '@/components/form/CTree.vue';
import CSelect from '@/components/form/selection/CSelect.vue';
import CAutocomplete from '@/components/form/selection/CAutocomplete.vue';
import CChipGroup from '@/components/form/selection/CChipGroup.vue';
import CFileUpload from '@/components/form/CFileUpload.vue';

// Feedback
import CMessage from '@/components/feedback/CMessage';
import CModal from '@/components/feedback/CModal';
import CLoading from '@/components/feedback/CLoading';

// ECharts
import CLineChart from '@/components/chart/echarts/CLineChart.vue';
import CAreaChart from '@/components/chart/echarts/CAreaChart.vue';
import CColumnChart from '@/components/chart/echarts/CColumnChart.vue';
import CBubbleChart from '@/components/chart/echarts/CBubbleChart.vue';
import CPieChart from '@/components/chart/echarts/CPieChart.vue';
import CDonutChart from '@/components/chart/echarts/CDonutChart.vue';
import CHalfDonutChart from '@/components/chart/echarts/CHalfDonutChart.vue';
import CCoxcombChart from '@/components/chart/echarts/CCoxcombChart.vue';

// Statistic
import CStat1 from '@/components/statistic/CStat1.vue';
import CStat2 from '@/components/statistic/CStat2.vue';
import CStat3 from '@/components/statistic/CStat3.vue';
import CStat4 from '@/components/statistic/CStat4.vue';
import CStat5 from '@/components/statistic/CStat5.vue';
import CStat6 from '@/components/statistic/CStat6.vue';
import CStat7 from '@/components/statistic/CStat7.vue';
import CStat8 from '@/components/statistic/CStat8.vue';
import CStat9 from '@/components/statistic/CStat9.vue';

// Other
import CImg from '@/components/CImg.vue';
import CAnchor from '@/components/CAnchor.vue';
import CLabel from '@/components/CLabel.vue';
import CSpinner from '@/components/CSpinner.vue';
import CCKEditor5 from '@/components/CCKEditor5.vue';

// Composables
import {useDate} from '@/composables/date';
import {useForm} from '@/composables/form';
import {useFormat} from '@/composables/format';
import {useLang} from '@/composables/lang';
import {useArrays} from '@/composables/arrays';
import {useMath} from '@/composables/math';
import {useResize} from '@/composables/resize';
import {useStringUtils} from '@/composables/string-utils';
import {useTimer} from '@/composables/timer';

export {
    // Components
    // Table
    CCrudTable,
    CCrudTableV2,

    // Form
    CPassword,
    CCaptcha,
    CEmail,
    CDatePicker,
    CDatetimePicker,
    CCascader,
    CTree,
    CSelect,
    CAutocomplete,
    CChipGroup,
    CFileUpload,

    // Feedback
    CMessage,
    CModal,
    CLoading,

    // ECharts
    CLineChart,
    CAreaChart,
    CColumnChart,
    CBubbleChart,
    CPieChart,
    CDonutChart,
    CHalfDonutChart,
    CCoxcombChart,

    // Statistic
    CStat1,
    CStat2,
    CStat3,
    CStat4,
    CStat5,
    CStat6,
    CStat7,
    CStat8,
    CStat9,

    // Other
    CImg,
    CAnchor,
    CLabel,
    CSpinner,
    CCKEditor5,

    // Composables
    useDate,
    useForm,
    useFormat,
    useLang,
    useArrays,
    useMath,
    useResize,
    useStringUtils,
    useTimer,
}

const components = [
    // Table
    CCrudTable,
    CCrudTableV2,

    // Form
    CPassword,
    CCaptcha,
    CEmail,
    CDatePicker,
    CDatetimePicker,
    CCascader,
    CTree,
    CSelect,
    CAutocomplete,
    CChipGroup,
    CFileUpload,

    // ECharts
    CLineChart,
    CAreaChart,
    CColumnChart,
    CBubbleChart,
    CPieChart,
    CDonutChart,
    CHalfDonutChart,
    CCoxcombChart,

    // Statistic
    CStat1,
    CStat2,
    CStat3,
    CStat4,
    CStat5,
    CStat6,
    CStat7,
    CStat8,
    CStat9,

    // Other
    CImg,
    CAnchor,
    CLabel,
    CSpinner,
    CCKEditor5,
];
const Vuetify3Plus = {
    install: (app) => {
        components.forEach((component) => {
            app.component(component.name, component);
        });
    }
}

export default Vuetify3Plus;
