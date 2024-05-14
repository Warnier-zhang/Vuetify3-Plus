<template>
    <v-dialog
        v-model="showDialog"
        persistent
        max-width="300">
        <v-card :title="title">
            <v-card-text
                v-if="type === 'alert' || type === 'confirm'"
                v-html="message">
            </v-card-text>

            <v-card-text v-else-if="type === 'prompt'">
                <div class="text-caption mb-1" v-html="message"></div>

                <v-text-field
                    v-if="inputType === 'box'"
                    v-model="input"
                    variant="outlined"
                    density="compact"
                    hide-details
                    clearable>
                </v-text-field>

                <v-textarea
                    v-else-if="inputType === 'area'"
                    v-model="input"
                    rows="3"
                    variant="outlined"
                    hide-details
                    clearable>
                </v-textarea>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    v-if="showCancelButton && type !== 'alert'"
                    color="primary"
                    variant="text"
                    @click="onCancelClick">
                    {{ cancelText }}
                </v-btn>

                <v-btn
                    v-if="showOkButton"
                    color="primary"
                    variant="text"
                    @click="onOkClick">
                    {{ okText }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
// Vue
import {ref, watch} from 'vue';

defineOptions({
    name: 'Message',
    inheritAttrs: false
});

const emit = defineEmits(['okClick', 'cancelClick', 'close']);

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: null,
        validator: (value) => ['alert', 'confirm', 'prompt'].includes(value)
    },
    inputType: {
        type: String,
        default: 'box',
        validator: (value) => ['box', 'area'].includes(value)
    },
    title: {
        type: String,
        default: null
    },
    message: {
        type: String,
        default: null
    },
    showOkButton: {
        type: Boolean,
        default: true,
    },
    okText: {
        type: String,
        default: '确定',
    },
    showCancelButton: {
        type: Boolean,
        default: true,
    },
    cancelText: {
        type: String,
        default: '取消',
    },
});

const showDialog = ref(false);
watch(
    () => props.visible,
    (value) => {
        showDialog.value = value;
    },
    {
        immediate: true,
    }
);
watch(
    showDialog,
    (value) => {
        if (!value) {
            emit('close');
        }
    }
);
const input = ref(null);

function onOkClick() {
    showDialog.value = false;
    if (props.type === 'prompt') {
        emit('okClick', input.value);
    } else {
        emit('okClick');
    }
}

function onCancelClick() {
    showDialog.value = false;
    emit('cancelClick');
}
</script>

<style scoped>

</style>
