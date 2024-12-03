<template>
    <v-hover v-if="file.id">
        <template v-slot:default="{ isHovering, props }">
            <v-img
                v-bind="props"
                class="rounded"
                :src="`${browseFileUrl}?id=${file.thumbnail}`"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                :aspect-ratio="16/9"
                cover>
                <div class="fill-height d-flex flex-column justify-space-between">
                    <div class="text-subtitle-1 font-weight-bold text-no-wrap text-truncate pa-3 text-white">
                        {{ file.name }}
                    </div>

                    <div v-if="isHovering"
                         class="align-self-end d-flex justify-end mb-3">
                        <v-btn
                            v-if="!attrs.readonly && attrs.readonly !== ''"
                            @click="onDeleteClick"
                            class="mr-3"
                            size="x-small"
                            icon="mdi-delete">
                        </v-btn>

                        <v-btn
                            v-if="file.type && file.type.indexOf('image/') !== -1"
                            @click="onViewClick(`${browseFileUrl}?id=${file.id}`)"
                            class="mr-3"
                            size="x-small"
                            icon="mdi-eye">
                        </v-btn>

                        <v-btn
                            @click="onDownloadClick(`${browseFileUrl}?id=${file.id}`)"
                            class="mr-3"
                            size="x-small"
                            icon="mdi-download">
                        </v-btn>
                    </div>
                </div>
            </v-img>
        </template>
    </v-hover>

    <v-file-input
        v-else
        v-model="upload"
        v-bind="attrs"
        @click:clear="onDeleteClick"
        prepend-icon="">
    </v-file-input>
</template>

<script setup>
// Vue
import {computed, inject, ref, useAttrs, watch} from 'vue';

import CMessage from '@/components/feedback/CMessage';

// Composables
import {useLang} from '@/composables/lang';

defineOptions({
    name: 'CFileUpload',
    inheritAttrs: false,
});

const $http = inject('$http');

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: null,
    },
    uploadFileUrl: {
        type: String,
        default: null,
    },
    browseFileUrl: {
        type: String,
        default: null,
    },
});
const attrs = computed(() => {
    let {modelValue, ...attrs} = useAttrs() || {};
    return attrs;
});

const file = ref({
    id: null,
    name: null,
    // url: null,
    thumbnail: null,
    type: null,
});
watch(
    () => props.modelValue,
    (value) => {
        file.value.id = value;
    },
    {
        immediate: true,
    }
);
watch(
    () => file.value.id,
    (value) => {
        emit('update:modelValue', value);
        if (value) {
            fetchFileInfo(value);
        }
    },
    {
        immediate: true,
    }
);

function fetchFileInfo(fileId) {
    $http.head(`${props.browseFileUrl}?id=${fileId}`, {skipResultHandler: true})
        .then(({headers}) => {
            if (headers['file-info']) {
                let fileInfo = JSON.parse(decodeURIComponent(headers['file-info']));
                file.value.name = fileInfo.name;
                file.value.thumbnail = fileInfo.thumbnail;
                file.value.type = fileInfo.type;
            }
        })
        .catch((error) => {
            console.log(error);
            CMessage.error(error.message);
        });
}

const upload = ref(null);
watch(
    upload,
    (value) => {
        if (value) {
            uploadFile();
        }
    },
    {
        immediate: true,
    }
);

function uploadFile() {
    let formData = new window.FormData();
    formData.append("upload", upload.value);
    $http.post(props.uploadFileUrl, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
        .then((response) => {
            if (response.errorCode === 1) {
                file.value.id = response.data.id;
            } else {
                file.value.id = null;
            }
        })
        .catch((error) => {
            console.log(error);
            CMessage.error(error.message);
            file.value.id = null;
        })
        .finally(() => {
            upload.value = null;
        });
}

function onDeleteClick() {
    file.value = {
        id: null,
        name: null,
        thumbnail: null,
        type: null,
    };
    upload.value = null;
}

const $viewerApi = inject('$viewerApi');

function onViewClick(url) {
    $viewerApi({
        images: [url],
    });
}

const {FileUtils} = useLang();

function onDownloadClick(url) {
    FileUtils.download(file.value.name, file.value.type, url);
}
</script>

<style scoped>

</style>
