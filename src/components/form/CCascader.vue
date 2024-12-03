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
            :disabled="$attrs.readonly"
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
                        v-model="tabTitle"
                        placeholder="过滤"
                        variant="outlined"
                        density="compact"
                        prepend-inner-icon="mdi-filter"
                        hide-details
                        @change="onFilter"
                        clearable
                        @click:clear="tabTitle = null">
                    </v-text-field>

                    <v-tabs
                        v-model="tab"
                        center-active
                        fixed-tabs
                        show-arrows>
                        <v-tab
                            v-for="item in data"
                            :key="item[itemId]"
                            :value="item[itemId]">
                            {{ item[itemTitle] }}
                        </v-tab>
                    </v-tabs>

                    <v-window v-model="tab">
                        <v-window-item
                            v-for="item in data"
                            :key="item[itemId]"
                            :value="item[itemId]"
                            style="max-height: 200px;overflow-y: auto;">
                            <v-radio-group
                                v-if="!multiple"
                                v-model="value"
                                hide-details>
                                <v-radio
                                    v-for="option in item[itemChildren]"
                                    :key="option[itemId]"
                                    :label="option[itemTitle]"
                                    :value="option[itemId]">
                                </v-radio>
                            </v-radio-group>

                            <v-checkbox
                                v-else
                                v-for="option in item[itemChildren]"
                                :key="option[itemId]"
                                v-model="value"
                                :label="option[itemTitle]"
                                :value="option[itemId]"
                                density="compact"
                                hide-details>
                            </v-checkbox>
                        </v-window-item>
                    </v-window>
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
// Composables
import {useArrays} from '@/composables/arrays';
import {useItems} from '@/components/items';

// Vue
import {computed, inject, ref, watch} from 'vue';

defineOptions({
    name: 'CCascader',
    inheritAttrs: false
});

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    modelValue: [String, Number, Array],
    url: {
        type: String,
        default: null
    },
    items: {
        type: Array,
        default: () => []
    },
    itemId: {
        type: String,
        default: 'id'
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

const value = ref(null);
watch(
    () => props.modelValue,
    (modelValue) => {
        value.value = convertValue(modelValue);
    },
    {
        immediate: true,
        deep: true,
    }
)

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

function convertValueToArray(rawValue) {
    let value = [];
    if (rawValue) {
        value = Array.isArray(rawValue) ? rawValue : [rawValue];
    }
    return value;
}

function onOKClick() {
    emit('update:modelValue', value.value);
    showMenu.value = false;
    tabTitle.value = null;
}

function onCancelClick() {
    tabTitle.value = null;
    value.value = convertValue(props.modelValue);
    showMenu.value = false;
}

function onClearAllClick() {
    tabTitle.value = null;
    value.value = convertValue(null);
}

function onResetClick() {
    tabTitle.value = null;
    value.value = convertValue(null);
    emit('update:modelValue', value.value);
}

const {isNotEmpty, isEmpty} = useArrays();

const $http = inject('$http');
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

const tab = ref(null);
const showMenu = ref(false);
watch(
    showMenu,
    (showMenu) => {
        tab.value = null;

        let values = convertValueToArray(value.value);
        if (showMenu && isNotEmpty(values) && isNotEmpty(data.value)) {
            for (let item of data.value) {
                if (isNotEmpty(item[props.itemChildren])) {
                    for (let option of item[props.itemChildren]) {
                        // 默认选中最后1类
                        if (option[props.itemId] === values[values.length - 1]) {
                            tab.value = item[props.itemId];
                            break;
                        }
                    }
                }
            }
        }
    },
    {
        immediate: true
    }
);

const tabTitle = ref(null);

function onFilter() {
    if (showMenu.value && isNotEmpty(data.value)) {
        for (let item of data.value) {
            if (item[props.itemTitle].includes(tabTitle.value)) {
                tab.value = item[props.itemId];
                break;
            } else if (isNotEmpty(item[props.itemChildren])) {
                for (let option of item[props.itemChildren]) {
                    if (option[props.itemTitle].includes(tabTitle.value)) {
                        tab.value = item[props.itemId];
                        break;
                    }
                }
            }
        }
    }
}

const title = computed(() => {
    let titles = [];

    let values = convertValueToArray(value.value);
    for (let item of data.value) {
        if (isNotEmpty(item[props.itemChildren])) {
            for (let option of item[props.itemChildren]) {
                if (values.includes(option[props.itemId])) {
                    titles.push(`${item[props.itemTitle]} (${option[props.itemTitle]})`);
                    if (!props.multiple) {
                        break;
                    }
                }
            }
        }
    }
    if (isEmpty(titles)) {
        titles = values;
    }
    return titles.join('，');
});
</script>

<style scoped>

</style>
