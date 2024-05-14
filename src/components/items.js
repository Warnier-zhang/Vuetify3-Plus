// Vue
import {ref, toValue, watch} from 'vue';

import CMessage from '@/components/feedback/CMessage';

// Composables
import {useLang} from '@/composables/lang';

const {AsyncTask, Arrays} = useLang();

export function useItems($http, url) {
    const items = ref([]);

    async function loadItems() {
        let [error, response] = await AsyncTask($http.get(toValue(url)));
        if (error) {
            CMessage.error(error.message);
            console.log(error);
            return;
        }
        if (response.errorCode === 1) {
            items.value = Arrays.isNotEmpty(response.data) ? response.data : [];
        } else {
            CMessage.error(response.msg);
        }
    }

    watch(
        () => toValue(url),
        (value) => {
            if (value) {
                loadItems();
            }
        },
        {
            immediate: true,
            deep: true,
        }
    );

    return {
        items,
    };
}
