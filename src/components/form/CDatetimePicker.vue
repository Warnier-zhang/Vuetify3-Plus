<template>
    <v-text-field
        v-model="value"
        v-bind="$props"
        type="datetime-local"
        :step="pickSecond ? 1 : 60">
    </v-text-field>
</template>

<script setup>
// Utilities
import {format, parse, parseISO} from "date-fns";

// Vue
import {computed, ref, watch} from 'vue';

defineOptions({
    name: 'CDatetimePicker'
});

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    modelValue: {
        type: String,
        default: null
    },
    pickSecond: {
        type: Boolean,
        default: false
    },
    dateFormat: {
        type: String,
        default: 'yyyy-MM-dd'
    },
    timeFormat: {
        type: String,
        default: null
    }
});

const timeFormat = computed(() => {
    return props.timeFormat ? props.timeFormat : props.pickSecond ? 'HH:mm:ss' : 'HH:mm';
});

const value = ref(props.modelValue);
watch(
    () => props.modelValue,
    (modelValue) => {
        if (modelValue) {
            let datetime = parse(modelValue, `${props.dateFormat} ${timeFormat.value}`, new Date());
            value.value = `${format(datetime, props.dateFormat)}T${format(datetime, timeFormat.value)}`;
        } else {
            value.value = null;
        }
    },
    {
        immediate: true,
    }
);
watch(
    value,
    (value) => {
        emit('update:modelValue', value ? format(parseISO(value), `${props.dateFormat} ${timeFormat.value}`) : null);
    },
    {
        immediate: true,
    }
);
</script>

<style scoped>

</style>
