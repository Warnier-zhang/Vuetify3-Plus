// MDI
import '@mdi/font/css/materialdesignicons.css';

// Vuetify 3
import 'vuetify/styles';
import {createVuetify} from 'vuetify';
import {VTreeview} from 'vuetify/labs/VTreeview';

const vuetify = createVuetify({
    components: {
        VTreeview
    },
});

export default vuetify;
