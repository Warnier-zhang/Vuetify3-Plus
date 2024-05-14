// Components
// Form
import CPassword from '@/components/form/CPassword.vue';
import CCaptcha from '@/components/form/CCaptcha.vue';
import CEmail from '@/components/form/CEmail.vue';
import CDatePicker from '@/components/form/CDatePicker.vue';
import CDatetimePicker from '@/components/form/CDatetimePicker.vue';
import CCascader from '@/components/form/CCascader.vue';
import CSelect from '@/components/form/selection/CSelect.vue';
import CAutocomplete from '@/components/form/selection/CAutocomplete.vue';
import CChipGroup from '@/components/form/selection/CChipGroup.vue';
import CFileUpload from '@/components/form/CFileUpload.vue';

// Feedback
import CMessage from '@/components/feedback/CMessage';
import CModal from '@/components/feedback/CModal';
import CLoading from '@/components/feedback/CLoading';


// Composables
import {useDate} from '@/composables/date';
import {useForm} from '@/composables/form';
import {useLang} from '@/composables/lang';
import {useArrays} from '@/composables/arrays';
import {useMath} from '@/composables/math';
import {useResize} from '@/composables/resize';
import {useTimer} from '@/composables/timer';

export {
    // Components
    // Form
    CPassword,
    CCaptcha,
    CEmail,
    CDatePicker,
    CDatetimePicker,
    CCascader,
    CSelect,
    CAutocomplete,
    CChipGroup,
    CFileUpload,

    // Feedback
    CMessage,
    CModal,
    CLoading,

    // Composables
    useDate,
    useForm,
    useLang,
    useArrays,
    useMath,
    useResize,
    useTimer,
}

const components = [
    // Form
    CPassword,
    CCaptcha,
    CEmail,
    CDatePicker,
    CDatetimePicker,
    CCascader,
    CSelect,
    CAutocomplete,
    CChipGroup,
    CFileUpload,
];
const Vuetify3Plus = {
    install: (app) => {
        components.forEach((component) => {
            app.component(component.name, component);
        });
    }
}

export default Vuetify3Plus;
