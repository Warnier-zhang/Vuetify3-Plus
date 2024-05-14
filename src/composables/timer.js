// Vue
import {ref, onBeforeUnmount} from 'vue';

/**
 * 定时器
 */
export function useTimer() {
    const timer = ref(null);

    function createTimer(task, period) {
        task();
        destroyTimer();
        timer.value = setInterval(task, period);
    }

    function destroyTimer() {
        if (timer.value != null) {
            clearInterval(timer.value);
        }
    }

    onBeforeUnmount(() => {
        destroyTimer();
    });

    return {createTimer, destroyTimer};
}
