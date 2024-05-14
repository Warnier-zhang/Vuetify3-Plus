// Vue
import {ref, unref, watch} from 'vue';

// Composables
import {useElementSize} from '@vueuse/core';

export function useResize() {
    const els = ref(null);

    function autoResize(el, name, ratio) {
        if (els.value === null) {
            els.value = {};
        }
        els.value[name] = {
            el,
            size: useElementSize(el),
            ratio
        };
    }

    watch(
        els,
        (value) => {
            if (value) {
                Object.keys(value).forEach((name) => {
                    let width = unref(value[name].size.width);
                    if (width > 0) {
                        let height = width * value[name].ratio;
                        if (height !== unref(value[name].size.height)) {

                            // 使用autoResize的组件必须暴露setSize！！！
                            value[name].el.setSize({
                                width,
                                height
                            });
                        }
                    }
                });
            }
        },
        {
            immediate: true,
            deep: true
        }
    );

    return {autoResize};
}
