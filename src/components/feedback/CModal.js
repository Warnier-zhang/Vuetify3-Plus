// Vue
import {createApp} from 'vue';

// Vuetify
import vuetify from '@/plugins/vuetify';

import Modal from './Modal.vue';

// Utility
import {createGlobalNode, removeGlobalNode} from '@/utils/nodes';

let app = null, vm = null;

const CModal = {
    alert(options) {
        this.createModal({
            ...options,
            visible: true,
            type: 'alert',
            showCancelButton: false,
        });
    },

    confirm(options) {
        this.createModal({
            ...options,
            visible: true,
            type: 'confirm',
        });
    },

    prompt(options) {
        this.createModal({
            ...options,
            visible: true,
            type: 'prompt',
        });
    },

    createModal(options) {
        if (app !== null) {
            if (vm !== null) {
                vm.$forceUpdate();
            }
            return;
        }
        const el = createGlobalNode('c-modal');

        function onClose() {
            if (app != null) {
                app.unmount(el);
                removeGlobalNode(el);
                app = null;
                vm = null;
            }
        }

        app = createApp(Modal, {
            ...options,
            onClose,
        });
        app.use(vuetify);
        vm = app.mount(el);
    }
};
export default CModal;
