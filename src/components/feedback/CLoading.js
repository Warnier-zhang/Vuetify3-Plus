// Vue
import {createApp, nextTick, ref, h} from 'vue';

// Vuetify
import vuetify from '@/plugins/vuetify';

import Loading from './Loading.vue';

// Utility
import {createGlobalNode, removeGlobalNode} from '@/utils/nodes';

let app = null, count = 0, vm = null;
const loadingRef = ref(null);

const CLoading = {
    open(options) {
        nextTick(() => {
            count++;
            if (app !== null) {
                return;
            }
            let el = createGlobalNode('c-loading');

            function onClose() {
                if (app !== null) {
                    app.unmount(el);
                    removeGlobalNode(el);
                    app = null;
                    vm = null;
                }
            }

            app = createApp(() => h(Loading, {
                ...options,
                visible: true,
                onClose,
                ref: loadingRef,
            }));
            app.use(vuetify);
            vm = app.mount(el);
        });
    },

    close() {
        if (app !== null) {
            count--;
            if (loadingRef.value != null) {
                if (count === 0) {
                    loadingRef.value.close();
                }
            }
        }
    }
};
export default CLoading;
