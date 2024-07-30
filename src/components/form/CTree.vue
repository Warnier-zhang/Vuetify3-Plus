<template>
    <v-text-field
        v-bind="$attrs"
        :model-value="title"
        :title="title"
        readonly
        @click:clear="onResetClick">
        <v-menu
            v-model="showMenu"
            activator="parent"
            :close-on-back="false"
            :close-on-content-click="false">
            <v-card :title="`选择${$attrs.label}`">
                <template v-slot:append>
                    <v-icon
                        @click="onClearAllClick"
                        size="small">
                        mdi-delete-sweep
                    </v-icon>
                </template>

                <v-card-text
                    class="py-0"
                    style="max-width: 302px;">
                    <v-text-field
                        v-model="nodeTitle"
                        placeholder="过滤"
                        variant="outlined"
                        density="compact"
                        prepend-inner-icon="mdi-filter"
                        hide-details
                        clearable
                        @click:clear="nodeTitle = null">
                    </v-text-field>

                    <div
                        class="mt-2 overflow-y-auto"
                        style="max-height: 200px;">
                        <v-treeview
                            class="py-0"
                            v-model:selected="selectedNodeIds"
                            return-object
                            :search="nodeTitle"
                            selectable
                            :select-strategy="multiple ? 'classic' : 'single-leaf'"
                            open-all
                            open-strategy="multiple"
                            :items="nodes"
                            :item-value="itemId"
                            :item-title="itemTitle"
                            :item-children="itemChildren"
                            density="compact">
                        </v-treeview>
                    </div>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="onCancelClick">
                        取消
                    </v-btn>

                    <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="onOKClick">
                        确定
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-menu>
    </v-text-field>
</template>

<script setup>
// 基于Vuetify 3.6.13

// Composables
import {useArrays} from '@/composables/arrays';
import {useItems} from '@/components/items';

// Vue
import {inject, ref, watch} from 'vue';

// Utilities
import {buildTree} from '@/utils/tree';
import cloneDeep from 'lodash/cloneDeep';

defineOptions({
    name: 'CTree',
    inheritAttrs: false
});

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    modelValue: [String, Number, Array],
    url: {
        type: String,
        default: null
    },
    simple: {
        type: Boolean,
        default: false
    },
    items: {
        type: Array,
        default: () => []
    },
    itemId: {
        type: String,
        default: 'id'
    },
    itemParent: {
        type: String,
        default: 'pid'
    },
    itemTitle: {
        type: String,
        default: 'title'
    },
    itemChildren: {
        type: String,
        default: 'children'
    },
    multiple: {
        type: Boolean,
        default: false
    },
});

const {isNotEmpty, isEmpty} = useArrays();
const $http = inject('$http');

const nodes = ref([]);
const {items: data} = useItems($http, props.url);
watch(
    () => props.items,
    (value) => {
        if (isNotEmpty(value)) {
            data.value = value;
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
        if (isNotEmpty(value)) {
            nodes.value = cloneDeep(value);
            if (props.simple) {
                buildTree(nodes.value, {
                    idField: props.itemId,
                    parentField: props.itemParent,
                    childrenField: props.itemChildren,
                });
            }
        }
    },
    {
        immediate: true,
        deep: true,
    }
);

const showMenu = ref(false);
const selectedNodeIds = ref([]);
watch(
    () => props.modelValue,
    (modelValue) => {
        selectedNodeIds.value = convertValue(modelValue);
    },
    {
        immediate: true,
        deep: true,
    }
);

const title = ref(null);
watch(
    [
        selectedNodeIds,
        nodes,
    ],
    ([selectedNodeIds, nodes]) => {
        if (isNotEmpty(selectedNodeIds) && isNotEmpty(nodes)) {
            // TODO：属性'return-object'未生效
            let selectedNodeTitles = [];
            for (let node of nodes) {
                for (let leaf of node[props.itemChildren]) {
                    if (selectedNodeIds.includes(leaf[props.itemId])) {
                        selectedNodeTitles.push(`${node[props.itemTitle]} (${leaf[props.itemTitle]})`);
                        if (!props.multiple) {
                            break;
                        }
                    }
                }
            }
            title.value = selectedNodeTitles.join('，');
        } else {
            title.value = null;
        }
    },
    {
        immediate: true,
        deep: true,
    }
);

const nodeTitle = ref(null);

function onOKClick() {
    emit('update:modelValue', selectedNodeIds.value);
    showMenu.value = false;
    nodeTitle.value = null;
}

function onCancelClick() {
    selectedNodeIds.value = convertValue(props.modelValue);
    showMenu.value = false;
    nodeTitle.value = null;
}

function onClearAllClick() {
    selectedNodeIds.value = convertValue(null);
    nodeTitle.value = null;
}

function onResetClick() {
    selectedNodeIds.value = convertValue(null);
    nodeTitle.value = null;
    emit('update:modelValue', selectedNodeIds.value);
}

function convertValue(rawValue) {
    let value;
    if (rawValue) {
        if (Array.isArray(rawValue)) {
            value = props.multiple ? rawValue : rawValue[0];
        } else {
            value = props.multiple ? [rawValue] : rawValue;
        }
    } else {
        value = props.multiple ? [] : null;
    }
    return value;
}
</script>

<style scoped>

</style>
