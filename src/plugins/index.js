// Plugins
// Vuetify 3
import vuetify from './vuetify';

// Vuetify3 Plus
import Vuetify3Plus from '../lib';

// Axios
import {registerAxios} from './axios';

// Highcharts
import {registerHighcharts} from './highcharts';

// v-viewer
import {registerViewer} from './viewer';

// CKEditor 5
import {registerCKEditor} from './ckeditor';

export function registerPlugins(app) {
    app.use(vuetify);
    app.use(Vuetify3Plus);
    registerAxios(app);
    registerHighcharts(app);
    registerViewer(app);
    registerCKEditor(app);
}
