<template>
    <div>
        <v-breadcrumbs :items="['控件', '其他（5）']"></v-breadcrumbs>
        <v-row>
            <v-col cols="2">
                <v-list-subheader>CImg:</v-list-subheader>

                <CImg src="/demos/bear.jpg"></CImg>
            </v-col>

            <v-col cols="2">
                <v-list-subheader>CAnchor:</v-list-subheader>

                <CAnchor
                    text="百度"
                    href="https://www.baidu.com/"
                    hint="百度一下，你就知道"
                    show-hint>
                </CAnchor>
            </v-col>

            <v-col cols="2">
                <v-list-subheader>CLabel:</v-list-subheader>

                <CLabel
                    :value="21"
                    url="/demos/products2.json">
                </CLabel>
            </v-col>

            <v-col cols="2">
                <v-list-subheader>CSpinner:</v-list-subheader>

                <CSpinner
                    class="ml-2"
                    size="1em">
                </CSpinner>

                <CSpinner
                    class="ml-2"
                    size="2em"
                    :thickness="2">
                </CSpinner>

                <CSpinner
                    class="ml-2"
                    size="3em"
                    :thickness="10">
                </CSpinner>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6">
                <v-list-subheader class="pl-1">CCKEditor5:</v-list-subheader>

                <CCKEditor5
                    ref="ckeditor"
                    v-model="html"
                    upload-file-url="/api/file-explorer/files/upload"
                    browse-file-url="/api/file-explorer/files/download">
                </CCKEditor5>
            </v-col>

            <v-col cols="6">
                <v-list-subheader class="pl-1">HTML渲染结果:</v-list-subheader>

                <div
                    class="ck-content"
                    v-html="html">
                </div>
            </v-col>

            <v-col cols="2">
                <v-btn
                    color="primary"
                    block
                    @click="print">
                    打印
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
// Vue
import {ref} from "vue";

const html = ref('');

const ckeditor = ref(null);

function print() {
    console.log(`HTML: ` + ckeditor.value.getHtml());
    console.log(`Text: ` + ckeditor.value.getText());
}
</script>

<style scoped>

</style>
