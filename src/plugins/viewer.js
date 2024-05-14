// v-viewer
import 'viewerjs/dist/viewer.css';
import VueViewer from 'v-viewer';

VueViewer.setDefaults({
    title: false,
    button: true,
    navbar: false,
});

export function registerViewer(app) {
    app.use(VueViewer);
    app.provide('$viewerApi', app.config.globalProperties.$viewerApi);
}
