<template>
    <div>
        <v-breadcrumbs :items="['控件', '增删改查表格']"></v-breadcrumbs>

        <v-list-subheader>CCrudTable:</v-list-subheader>
        <v-row>
            <v-col cols="12">
                <CCrudTable
                    title="文件资源管理器"
                    :columns="columns"
                    fixed-index
                    load-items-url="/api/file-explorer/files/search"
                    add-item-url="/api/file-explorer/files/save"
                    update-item-url="/api/file-explorer/files/save"
                    remove-item-url="/api/file-explorer/files/delete"
                    show-refresh-btn
                    show-export-btn
                    show-icon-btn
                    row-key="id"
                    row-title="name">
                    <template v-slot:item.more-operations="{ item }">
                        <v-btn
                            @click="onDownloadClick(item)"
                            color="primary"
                            variant="tonal"
                            size="x-small"
                            icon="mdi-download">
                        </v-btn>
                    </template>

                    <template v-slot:item.thumbnail="{ item, value }">
                        <CImg
                            v-if="item.type && item.type.indexOf('image/') !== -1"
                            class="my-3"
                            width="200"
                            :src="`/api/file-explorer/files/download?id=${item.id}&random=${Math.random()}`"
                            :aspect-ratio="16/9"
                            cover>
                        </CImg>
                    </template>

                    <template v-slot:item.type="{ item, value }">
                        <v-chip size="small">
                            {{ value }}
                        </v-chip>
                    </template>

                    <template v-slot:filter="{ conditions }">
                        <v-container>
                            <v-row>
                                <v-col
                                    class="py-0"
                                    cols="12"
                                    sm="6">
                                    <v-text-field
                                        v-model="conditions.name"
                                        label="名称"
                                        variant="outlined"
                                        density="compact"
                                        clearable>
                                    </v-text-field>
                                </v-col>

                                <v-col
                                    class="py-0"
                                    cols="12"
                                    sm="6">
                                    <CDatePicker
                                        v-model="conditions.uploadDate"
                                        label="上传日期"
                                        variant="outlined"
                                        density="compact"
                                        clearable>
                                    </CDatePicker>
                                </v-col>
                            </v-row>
                        </v-container>
                    </template>

                    <template v-slot:editor="{ editedItem, type }">
                        <v-container>
                            <v-row>
                                <v-col
                                    class="py-0"
                                    cols="6">
                                    <v-text-field
                                        v-model="editedItem.name"
                                        label="名称"
                                        variant="outlined"
                                        density="compact"
                                        readonly>
                                    </v-text-field>
                                </v-col>

                                <v-col
                                    class="py-0"
                                    cols="6">
                                    <v-text-field
                                        v-model="editedItem.type"
                                        label="类型"
                                        variant="outlined"
                                        density="compact"
                                        readonly>
                                    </v-text-field>
                                </v-col>

                                <v-col
                                    class="py-0"
                                    cols="6">
                                    <CFileUpload
                                        v-model="editedItem.id"
                                        label="旧文件"
                                        upload-file-url="/api/file-explorer/files/upload"
                                        browse-file-url="/api/file-explorer/files/download"
                                        variant="outlined"
                                        density="compact"
                                        readonly>
                                    </CFileUpload>
                                </v-col>

                                <v-col
                                    class="py-0"
                                    cols="6">
                                    <CFileUpload
                                        v-model="editedItem.replacement"
                                        label="上传新文件"
                                        upload-file-url="/api/file-explorer/files/upload"
                                        browse-file-url="/api/file-explorer/files/download"
                                        variant="outlined"
                                        density="compact"
                                        clearable>
                                    </CFileUpload>
                                </v-col>
                            </v-row>
                        </v-container>
                    </template>
                </CCrudTable>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
// Vue
import {ref} from 'vue';

// Composables
import {useLang} from '@/composables/lang';
import {useForm} from '@/composables/form';

const {createRules} = useForm();

const columns = ref([
    {title: 'ID', key: 'id', sortable: false, fixed: true, width: 200},
    {title: '名称', key: 'name', sortable: false, fixed: true, width: 200},
    {title: '缩略图', key: 'thumbnail', sortable: false, renderable: true},
    {title: '类型', key: 'type', sortable: false, renderable: true},
    {title: '路径', key: 'path', sortable: false},
    {title: '上传时间', key: 'uploadTime', sortable: true},
]);

const {FileUtils} = useLang();

function onDownloadClick(file) {
    FileUtils.download(file.name, file.type, `/api/file-explorer/files/download?id=${file.id}`);
}
</script>

<style scoped>

</style>
