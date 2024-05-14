<template>
    <div>
        <v-breadcrumbs :items="['控件', '表单（10）']"></v-breadcrumbs>

        <v-row>
            <v-col cols="2">
                <v-list-subheader>CPassword:</v-list-subheader>

                <CPassword
                    v-model="password"
                    variant="outlined"
                    density="compact"
                    clearable>
                </CPassword>
            </v-col>

            <v-col cols="2">
                <v-list-subheader>CCaptcha:</v-list-subheader>

                <CCaptcha
                    v-model="captcha"
                    url="/demos/captcha.jpg"
                    variant="outlined"
                    density="compact"
                    clearable>
                </CCaptcha>
            </v-col>

            <v-col cols="2">
                <v-list-subheader>CEmail:</v-list-subheader>

                <CEmail
                    v-model="email"
                    variant="outlined"
                    density="compact"
                    clearable>
                </CEmail>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="2">
                <v-list-subheader>CDatePicker:</v-list-subheader>

                <CDatePicker
                    v-model="date"
                    label="日期"
                    variant="outlined"
                    density="compact"
                    clearable>
                </CDatePicker>
            </v-col>

            <v-col cols="2">
                <v-list-subheader>CDatetimePicker:</v-list-subheader>

                <CDatetimePicker
                    v-model="time"
                    pick-second
                    label="日期时间"
                    variant="outlined"
                    density="compact"
                    clearable>
                </CDatetimePicker>
            </v-col>
        </v-row>

        <v-list-subheader>CCascader:</v-list-subheader>
        <v-row>
            <v-col cols="2">
                <CCascader
                    v-model="productId"
                    label="商品"
                    url="/demos/products1.json"
                    variant="outlined"
                    density="compact"
                    :multiple="true"
                    clearable>
                </CCascader>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="2">
                <v-list-subheader>CSelect:</v-list-subheader>

                <CSelect
                    v-model="productId2"
                    v-model:title="productTitle2"
                    label="商品"
                    url="/demos/products2.json"
                    variant="outlined"
                    density="compact"
                    clearable>
                </CSelect>

                value: {{ productId2 }}<br/>
                title: {{ productTitle2 }}
            </v-col>

            <v-col cols="2">
                <v-list-subheader>CAutocomplete:</v-list-subheader>

                <CAutocomplete
                    v-model="productId2"
                    v-model:title="productTitle2"
                    label="商品"
                    url="/demos/products2.json"
                    variant="outlined"
                    density="compact"
                    clearable>
                </CAutocomplete>

                value: {{ productId2 }}<br/>
                title: {{ productTitle2 }}
            </v-col>
        </v-row>

        <v-list-subheader>CChipGroup:</v-list-subheader>
        <v-row>
            <v-col cols="12">
                <CChipGroup
                    v-model="productId2"
                    url="/demos/products2.json"
                    selected-class="text-warning"
                    column
                    chip-size="small"
                    chip-variant="outlined"
                    :chip-filter="true">
                </CChipGroup>
            </v-col>
        </v-row>

        <v-list-subheader>CFileUpload:</v-list-subheader>
        <v-row>
            <v-col cols="2">
                <CFileUpload
                    v-model="fileId"
                    label="上传文件"
                    upload-file-url="/api/file-explorer/files/upload"
                    browse-file-url="/api/file-explorer/files/download"
                    variant="outlined"
                    density="compact"
                    clearable>
                </CFileUpload>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
// Vue
import {ref} from 'vue';

const fileId = ref(null);

const date = ref(null);
const time = ref(null);

const productId = ref(null);
const productId2 = ref(null);
const productTitle2 = ref(null);

const email = ref(null);
const password = ref(null);
const captcha = ref(null);
</script>

<style scoped>

</style>
