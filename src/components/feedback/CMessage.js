// Vue
import {createApp, render} from 'vue';

// Vuetify
import vuetify from '@/plugins/vuetify';

import Message from './Message.vue';

// Utility
import {createGlobalNode, removeGlobalNode} from '@/utils/nodes';

const CMessage = {
    success(message) {
        this.createMessage({
            visible: true,
            type: 'success',
            message
        });
    },

    info(message) {
        this.createMessage({
            visible: true,
            type: 'info',
            message
        });
    },

    warning(message) {
        this.createMessage({
            visible: true,
            type: 'warning',
            message
        });
    },

    error(message) {
        this.createMessage({
            visible: true,
            type: 'error',
            message
        });
    },

    createMessage(options) {
        // render(h(Message, props), document.querySelector('#app'));\
        let app = null;
        let el = createGlobalNode('c-message');

        function onClose() {
            if (app != null) {
                app.unmount(el);
                removeGlobalNode(el);
                app = null;
            }
        }

        app = createApp(Message, {
            ...options,
            timeout: 1500,
            onClose
        });
        app.use(vuetify);
        app.mount(el);
    }
};
export default CMessage;
