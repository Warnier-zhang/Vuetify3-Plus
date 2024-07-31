<template>
    <v-card flat>
        <v-toolbar flat>
            <v-toolbar-title class="flex-1-1">
                <slot name="title">
                    {{ title }}
                </slot>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <template v-if="showAddBtn">
                <v-btn
                    v-if="showIconBtn"
                    @click="onAddClick()"
                    color="primary"
                    variant="tonal"
                    size="x-small"
                    icon="mdi-plus-thick">
                </v-btn>

                <v-btn
                    v-else
                    @click="onAddClick()"
                    color="primary"
                    variant="tonal"
                    size="small">
                    <template v-slot:prepend>
                        <v-icon>mdi-plus-thick</v-icon>
                    </template>
                    新增
                </v-btn>
            </template>

            <template v-if="showFilterBtn">
                <v-btn
                    v-if="showIconBtn"
                    @click="showFilter = true"
                    class="ml-4"
                    color="primary"
                    variant="tonal"
                    size="x-small"
                    icon="mdi-filter">
                </v-btn>

                <v-btn
                    v-else
                    @click="showFilter = true"
                    class="ml-4"
                    color="primary"
                    variant="tonal"
                    size="small">
                    <template v-slot:prepend>
                        <v-icon>mdi-filter</v-icon>
                    </template>
                    过滤
                </v-btn>
            </template>

            <template v-if="showRefreshBtn">
                <v-btn
                    v-if="showIconBtn"
                    @click="onRefreshClick()"
                    class="ml-4"
                    color="primary"
                    variant="tonal"
                    size="x-small"
                    icon="mdi-refresh">
                </v-btn>

                <v-btn
                    v-else
                    @click="onRefreshClick()"
                    class="ml-4"
                    color="primary"
                    variant="tonal"
                    size="small">
                    <template v-slot:prepend>
                        <v-icon>mdi-refresh</v-icon>
                    </template>
                    刷新
                </v-btn>
            </template>

            <template v-if="showExportBtn">
                <v-btn
                    v-if="showIconBtn"
                    @click="onExportClick"
                    class="ml-4"
                    color="primary"
                    variant="tonal"
                    size="x-small"
                    icon="mdi-download">
                </v-btn>

                <v-btn
                    v-else
                    @click="onExportClick"
                    class="ml-4"
                    color="primary"
                    variant="tonal"
                    size="small">
                    <template v-slot:prepend>
                        <v-icon>mdi-download</v-icon>
                    </template>
                    导出
                </v-btn>
            </template>

            <slot
                name="more-operations"
                :items="data">
            </slot>
        </v-toolbar>

        <v-card-text class="pa-0">
            <slot name="top"></slot>

            <v-data-table-server
                class="text-no-wrap"
                :headers="columns.filter((column) => !column.hidden)"
                :items-length="total"
                :items="data"
                v-model:page="page"
                v-model:items-per-page="size"
                :items-per-page-options="[
                    {value: 10, title: '10'},
                    {value: 20, title: '20'},
                    {value: 50, title: '50'},
                    {value: 100, title: '100'},
                    {value: -1, title: '全部'},
                ]"
                items-per-page-text="每页数目："
                v-model:sort-by="sortBys"
                @update:page="load"
                @update:items-per-page="load"
                @update:sort-by="onColumnSort"
                :item-value="rowKey"
                v-resize="onResize"
                :width="width"
                :height="height"
                fixed-header
                no-data-text="没有数据">
                <template
                    v-for="column in columns"
                    v-slot:[`item.${column.key}`]="{index, item}">
                    <CLabel
                        v-if="column.type === 'code'"
                        :value="item[column.key]"
                        :items="codesHolder[column.key]"
                        :item-title="column.codeName"
                        :item-value="column.codeValue">
                        <template
                            v-if="column.renderable"
                            v-slot:default="{label}">
                            <slot
                                :name="`item.${column.key}`"
                                :item="item"
                                :value="label">
                            </slot>
                        </template>
                    </CLabel>

                    <slot
                        v-else-if="column.renderable"
                        :name="`item.${column.key}`"
                        :item="item"
                        :value="item[column.key]">
                    </slot>

                    <template v-else-if="column.key === 'index'">
                        {{ index + 1 }}
                    </template>

                    <template v-else-if="column.key === 'operation'">
                        <template v-if="showUpdateBtn">
                            <v-btn
                                v-if="showIconBtn"
                                @click="onUpdateClick(item)"
                                color="primary"
                                variant="tonal"
                                size="x-small"
                                icon="mdi-pencil">
                            </v-btn>

                            <v-btn
                                v-else
                                @click="onUpdateClick(item)"
                                color="primary"
                                variant="tonal"
                                size="small">
                                <template v-slot:prepend>
                                    <v-icon>mdi-pencil</v-icon>
                                </template>
                                编辑
                            </v-btn>
                        </template>

                        <template v-if="showDeleteBtn">
                            <v-btn
                                v-if="showIconBtn"
                                @click="onRemoveClick(item)"
                                :class="[showUpdateBtn ? 'ml-4' : '']"
                                color="primary"
                                variant="tonal"
                                size="x-small"
                                icon="mdi-delete">
                            </v-btn>

                            <v-btn
                                v-else
                                @click="onRemoveClick(item)"
                                :class="[showUpdateBtn ? 'ml-4' : '']"
                                color="primary"
                                variant="tonal"
                                size="small">
                                <template v-slot:prepend>
                                    <v-icon>mdi-delete</v-icon>
                                </template>
                                删除
                            </v-btn>
                        </template>

                        <div :class="['d-inline-block', showUpdateBtn || showDeleteBtn ? 'ml-4' : '']">
                            <slot
                                name="item.more-operations"
                                :item="item">
                            </slot>
                        </div>
                    </template>

                    <template v-else>
                        {{ item[column.key] }}
                    </template>
                </template>

                <template
                    v-if="disablePagination"
                    v-slot:bottom>
                </template>
            </v-data-table-server>
        </v-card-text>
    </v-card>

    <v-dialog
        v-model="showFilter"
        persistent
        no-click-animation
        width="600"
        z-index="1800">
        <v-card>
            <v-card-title>
                过滤
            </v-card-title>

            <v-card-text>
                <v-form ref="filterForm">
                    <slot
                        name="filter"
                        :conditions="conditions">
                    </slot>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="showFilter = false">
                    取消
                </v-btn>

                <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="load">
                    确定
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog
        v-model="showEditor"
        persistent
        no-click-animation
        width="600"
        z-index="1800">
        <v-card>
            <v-card-title>
                {{ editorTitle }}
            </v-card-title>

            <v-card-text>
                <v-form :ref="(el) => setRefs('editorForm', el)">
                    <slot
                        name="editor"
                        :type="editorType"
                        :editedItem="editedItem">
                    </slot>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="closeEditor">
                    取消
                </v-btn>

                <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="save">
                    保存
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
// Components
import CLabel from '@/components/CLabel.vue';

// Vue
import {inject, useAttrs} from 'vue';

// CURD Table
import {crudTableEvents, crudTableProps, useCrudTable} from './crudTable';

defineOptions({
    name: 'CCrudTable',
    inheritAttrs: false
});

const props = defineProps({
    ...crudTableProps,
    disablePagination: {
        type: Boolean,
        default: false,
    },
});

const attrs = useAttrs();

const emit = defineEmits(crudTableEvents);

const $http = inject('$http');

const {
    setRefs,
    onResize,
    width,
    height,
    onAddClick,
    onRefreshClick,
    onExportClick,
    columns,
    total,
    data,
    sortBys,
    onColumnSort,
    codesHolder,
    reload,
    page,
    size,
    load,
    showFilter,
    conditions,
    onUpdateClick,
    onRemoveClick,
    showEditor,
    editorTitle,
    editorType,
    editedItem,
    closeEditor,
    save
} = useCrudTable(
    $http,
    props,
    attrs,
    emit
);

// Expose methods of Child Components
defineExpose({
    reload,
    onAddClick,
    onUpdateClick,
});
</script>

<style scoped>

</style>
