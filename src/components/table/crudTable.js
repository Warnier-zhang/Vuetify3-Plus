// Components
import CMessage from '@/components/feedback/CMessage';
import CModal from '@/components/feedback/CModal';

// Composables
import {useLang} from '@/composables/lang';

const {AsyncTask, Arrays} = useLang();

// Vue
import {onBeforeUnmount, onMounted, ref, toValue, watch} from 'vue';

// Utilities
import cloneDeep from 'lodash/cloneDeep';
import * as XLSX from 'xlsx';

export const crudTableProps = {
    title: {
        type: String,
        default: null
    },
    showIndex: {
        type: Boolean,
        default: true
    },
    fixedIndex: {
        type: Boolean,
        default: false,
    },
    showOperation: {
        type: Boolean,
        default: true
    },
    showIconBtn: {
        type: Boolean,
        default: false
    },
    showAddBtn: {
        type: Boolean,
        default: true
    },
    showRefreshBtn: {
        type: Boolean,
        default: false
    },
    showFilterBtn: {
        type: Boolean,
        default: true
    },
    showExportBtn: {
        type: Boolean,
        default: false
    },
    showUpdateBtn: {
        type: Boolean,
        default: true
    },
    showDeleteBtn: {
        type: Boolean,
        default: true
    },
    loadItemsUrl: {
        type: String,
        default: null,
    },
    loadItemsImmediate: {
        type: Boolean,
        default: true,
    },
    filterCondition: {
        type: Object,
        default: {}
    },
    addItemUrl: {
        type: String,
        default: null,
    },
    updateItemUrl: {
        type: String,
        default: null,
    },
    removeItemUrl: {
        type: String,
        default: null,
    },
    rowKey: {
        type: String,
        default: null,
    },
    rowTitle: {
        type: String,
        default: null,
    },
    sortMode: {
        type: String,
        validator(value) {
            return ['client', 'server'].includes(value);
        },
        default: 'server',
    },
    sortKey: {
        type: String,
        default: null,
    },
    sortOrder: {
        type: String,
        default: null,
    },
    widthPadding: {
        type: Number,
        default: -1,
    },
    heightPadding: {
        type: Number,
        default: -1,
    },
};

export const crudTableEvents = [
    'load',
    'after-load',
    'add',
    'after-add',
    'update',
    'after-update',
    'remove',
    'after-remove'
];

export function useCrudTable($http, props, attrs, emit) {
    const refs = ref(null);

    function setRefs(name, el) {
        if (refs.value === null) {
            refs.value = {};
        }
        refs.value[name] = el;
    }

    onBeforeUnmount(() => {
        refs.value = null;
    });

    const columns = ref([]);
    watch(
        () => attrs.columns,
        (value) => {
            if (Arrays.isNotEmpty(value)) {
                columns.value = value.map((column) => {
                    return {
                        ...column,
                        minWidth: column.width ? column.width : null,
                        maxWidth: column.width ? column.width : null,
                    };
                });

                // 序号
                let hasIndex = columns.value.find(column => column.key === 'index');
                if (!hasIndex && props.showIndex) {
                    columns.value.unshift({
                        title: '序号',
                        key: 'index',
                        sortable: false,
                        editable: false,
                        exportable: false,
                        fixed: props.fixedIndex,
                        width: props.fixedIndex ? 50 : null,
                        minWidth: props.fixedIndex ? 50 : null,
                        maxWidth: props.fixedIndex ? 50 : null,
                    });
                }

                // 操作
                // TODO：固定列到右侧
                let hasOperation = columns.value.find(column => column.key === 'operation');
                if (!hasOperation && props.showOperation) {
                    columns.value.push({
                        title: '操作',
                        key: 'operation',
                        sortable: false,
                        editable: false,
                        exportable: false,
                    });
                }
            } else {
                columns.value = [];
            }
        },
        {
            immediate: true,
            deep: true,
        }
    );

    /**
     * 排序
     */
    const sortBys = ref([]);

    function onColumnSort(sortBys) {
        if (Arrays.isNotEmpty(sortBys)) {
            if (props.sortMode === 'client') {
                let sortOrder = sortBys[0].order ? sortBys[0].order : 'asc';
                Arrays.sortBy(data.value, sortBys[0].key, sortOrder);
            } else if (props.sortMode === 'server') {
                load();
            }
        } else {
            clearSort();
        }
    }

    function toSortState() {
        let sortState = null;
        if (Arrays.isNotEmpty(sortBys.value)) {
            sortState = {};
            for (let sortBy of sortBys.value) {
                sortState[sortBy.key] = sortBy.order;
            }
        }
        return sortState;
    }

    function clearSort() {
        if (Arrays.isNotEmpty(sortBys.value)) {
            sortBys.value = [];
        }
    }

    const total = ref(0);

    watch(
        () => attrs.total,
        (value) => {
            total.value = value;
        },
        {
            immediate: true,
        }
    );

    const data = ref([]);

    watch(
        () => attrs.data,
        (value) => {
            if (Arrays.isNotEmpty(value)) {
                data.value = value;
                if (props.disablePagination) {
                    total.value = value.length;
                }
            } else {
                data.value = [];
                total.value = 0;
            }
        },
        {
            immediate: true,
            deep: true,
        }
    );

    watch(
        data,
        (value) => {
            // 排序
            let key, order;
            if (Arrays.isEmpty(sortBys.value)) {
                // 默认排序
                if (props.sortKey && props.sortOrder) {
                    key = props.sortKey;
                    order = props.sortOrder;
                    sortBys.value = [
                        {key, order},
                    ];
                }
            } else {
                if (Arrays.isNotEmpty(sortBys.value)) {
                    key = sortBys.value[0].key;
                    order = sortBys.value[0].order;
                }
            }
            if (props.sortMode === 'client') {
                Arrays.sortBy(data.value, key, order);
            }
        },
        {
            immediate: true,
            deep: true,
        }
    );

    function onRefreshClick() {
        reload();
    }

    function reload() {
        load();
    }

    /**
     * 查询代码
     */
    const codesHolder = ref({});

    function loadAllCodes() {
        toValue(columns).forEach((column) => {
            if (column.type === 'code') {
                loadCodes(column.key, column.codes, column.url);
            }
        });
    }

    async function loadCodes(key, codes, url) {
        codesHolder.value[key] = [];

        if (Arrays.isNotEmpty(codes)) {
            codesHolder.value[key] = codes;
        } else if (url) {
            let [error, response] = await AsyncTask($http.post(url));
            if (error) {
                CMessage.error(error.message);
                console.log(error);
                return;
            }
            if (response.errorCode === 1) {
                codesHolder.value[key] = response.data && response.data.length > 0 ? response.data : [];
            } else {
                codesHolder.value[key] = [];

                CMessage.error(response.msg);
                console.log(response.msg);
            }
        }
    }

    function getCodeNameForColumn(column, value) {
        let name = value;
        if (codesHolder.value[column.key]) {
            for (let item of codesHolder.value[column.key]) {
                if (item[column.codeValue] === value) {
                    name = item[column.codeName];
                    break;
                }
            }
        }
        return name;
    }

    /**
     * 导出
     */
    function onExportClick() {
        exportExcel();
    }

    function exportExcel() {
        let headers = toValue(columns).filter((column) => column.exportable !== false && column.hidden !== true);
        let rows = data.value.map((item) => {
            let row = {};
            headers.forEach((header) => {
                row[header.key] = header.excelValue ?
                    header.excelValue(item) :
                    header.type === 'code' ? getCodeNameForColumn(header, item[header.key]) : item[header.key];
            });
            return row;
        });
        const sheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, sheet, props.title ? props.title : '导出Excel');
        XLSX.utils.sheet_add_aoa(
            sheet,
            [
                headers.map((header) => {
                    return header.title;
                })
            ],
            {origin: "A1"}
        );
        XLSX.writeFile(workbook, `${props.title ? props.title : '导出Excel'}.xlsx`, {compression: true});
    }

    /**
     * 查询
     */
    const showFilter = ref(false);

    const conditions = ref(Object.assign({}, props.filterCondition));

    const page = ref(1);

    const size = ref(10);

    function load() {
        loadAllCodes();

        // 过滤
        if (showFilter.value) {
            showFilter.value = false;

            // 首页；
            page.value = 1;
        }

        let params = {};
        params['conditions'] = cloneDeep(conditions.value);
        if (props.sortMode === 'server') {
            params['sortState'] = toSortState();
        }
        if (!props.disablePagination) {
            params['page'] = page.value;
            params['size'] = size.value;
        }
        if (props.loadItemsUrl) {
            loadItems(params);
        } else {
            emit("load", params);
        }
        if (props.sortMode === 'client') {
            clearSort();
        }
    }

    async function loadItems(params) {
        let [error, response] = await AsyncTask($http.post(props.loadItemsUrl, params));
        if (error) {
            CMessage.error(error.message);
            console.log(error);
            return;
        }
        if (response.errorCode === 1) {
            if (response.data && Arrays.isNotEmpty(response.data.items)) {
                data.value = response.data.items;
                total.value = response.data.total;
            } else {
                data.value = [];
                total.value = 0;
            }
        } else {
            CMessage.error(response.msg);
            console.log(response.msg);
        }
        emit('after-load', {
            items: data.value,
            total: total.value,
            ...params
        });
    }

    /**
     * 表格大小
     */
    const width = ref(null);
    const height = ref(null);

    function onResize() {
        if (props.widthPadding > 0) {
            width.value = window.innerWidth - props.widthPadding;
        }
        if (props.heightPadding > 0) {
            height.value = window.innerHeight - props.heightPadding - 64 - 1;
            if (!props.disablePagination) {
                height.value -= 62;
            }
        }
    }

    onMounted(() => {
        onResize();
        if (props.loadItemsImmediate) {
            load();
        }
    });

    /**
     * 新增、更新
     */
    const showEditor = ref(false);
    const editorTitle = ref(null);
    const editorType = ref(null);
    const editedItem = ref({});

    function openEditor(item, title, type) {
        editedItem.value = cloneDeep(item);
        editorTitle.value = title;
        editorType.value = type;
        showEditor.value = true;
    }

    function closeEditor() {
        showEditor.value = false;
        editorTitle.value = null;
        editorType.value = null;
        refs.value.editorForm.resetValidation();
        // editedItem.value = {};
    }

    function onAddClick(title) {
        let defaultItem = {};
        toValue(columns).forEach((column) => {
            if (column.editable !== false) {
                defaultItem[column.key] = column.default ? column.default() : null;
            }
        });
        openEditor(defaultItem, title ? title : '新增', 'add');
    }

    function onUpdateClick(item, title) {
        openEditor(item, title ? title : '编辑', 'update')
    }

    async function save() {
        const {valid} = await refs.value.editorForm.validate();
        if (valid) {
            let eventName;
            if (editorType.value === 'add') {
                eventName = 'add';
                conditions.value = Object.assign({}, props.filterCondition);
                clearSort();
            } else if (editorType.value === 'update') {
                eventName = 'update';
            }
            if (props.addItemUrl || props.updateItemUrl) {
                if (props.addItemUrl && editorType.value === 'add') {
                    addItem();
                } else if (props.updateItemUrl && editorType.value === 'update') {
                    updateItem();
                }
            } else {
                emit(eventName, {
                    editedItem: cloneDeep(editedItem.value),
                    conditions: cloneDeep(conditions.value),
                    sortState: toSortState()
                });
            }
            closeEditor();
        }
    }

    async function addItem() {
        let item = convertEditedItem();
        let [error, response] = await AsyncTask($http.post(props.addItemUrl, item));
        if (error) {
            CMessage.error(error.message);
            console.log(error);
            return;
        }
        if (response.errorCode === 1) {
            CMessage.success(response.msg);
            load();
        } else {
            CMessage.error(response.msg);
            console.log(response.msg);
        }
        emit('after-add');
    }

    async function updateItem() {
        let item = convertEditedItem();
        let [error, response] = await AsyncTask($http.post(props.updateItemUrl, item));
        if (error) {
            CMessage.error(error.message);
            console.log(error);
            return;
        }
        if (response.errorCode === 1) {
            CMessage.success(response.msg);
            load();
        } else {
            CMessage.error(response.msg);
            console.log(response.msg);
        }
        emit('after-update');
    }

    function convertEditedItem() {
        let item = cloneDeep(editedItem.value);
        toValue(columns).forEach((column) => {
            if (item[column.key] && column.converter) {
                item[column.key] = column.converter(item[column.key]);
            }
        });
        return item;
    }

    /**
     * 删除
     */
    function onRemoveClick(item) {
        CModal.confirm({
            title: '删除',
            message: `确定要删除<span class="font-weight-bold">${item[props.rowTitle]}</span>吗？`,
            onOkClick() {
                remove(item[props.rowKey]);
            },
        });
    }

    function remove(id) {
        if (!id) {
            CMessage.error('请重新选择一条记录！');
            return;
        }
        if (props.removeItemUrl) {
            removeItem(id);
        } else {
            emit('remove', {
                id,
                conditions: cloneDeep(conditions.value),
                sortState: toSortState(),
            });
        }
    }

    async function removeItem(id) {
        let [error, response] = await AsyncTask($http.delete(props.removeItemUrl, {
            params: {
                id
            }
        }));
        if (error) {
            CMessage.error(error.message);
            console.log(error);
            return;
        }
        if (response.errorCode === 1) {
            CMessage.success(response.msg);
            load();
        } else {
            CMessage.error(response.msg);
            console.log(response.msg);
        }
        emit('after-remove');
    }

    return {
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
        page,
        size,
        load,
        reload,
        showFilter,
        conditions,
        onUpdateClick,
        onRemoveClick,
        setRefs,
        showEditor,
        editorTitle,
        editorType,
        editedItem,
        closeEditor,
        save
    };
}
