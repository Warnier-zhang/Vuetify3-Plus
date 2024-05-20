<template>
    <ckeditor
        :model-value="modelValue"
        @update:modelValue="emit('update:modelValue', $event)"
        :editor="editor"
        :config="editorConfig"
        @ready="onEditorReady">
    </ckeditor>

    <v-input
        class="px-4"
        :model-value="modelValue"
        :rules="$attrs.rules">
    </v-input>
</template>

<script setup>
// Vue
import {ref} from 'vue';

// CKEditor 5
// 预打包的编辑器无法安装新插件！！！
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// 自定义打包编辑器
import {ClassicEditor} from '@ckeditor/ckeditor5-editor-classic';
import {Essentials} from '@ckeditor/ckeditor5-essentials';
import {Autoformat} from '@ckeditor/ckeditor5-autoformat';
import {Bold, Italic} from '@ckeditor/ckeditor5-basic-styles';
import {BlockQuote} from '@ckeditor/ckeditor5-block-quote';
import {Heading} from '@ckeditor/ckeditor5-heading';
import {Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload, PictureEditing} from '@ckeditor/ckeditor5-image';
import {Indent} from '@ckeditor/ckeditor5-indent';
import {Link} from '@ckeditor/ckeditor5-link';
import {List} from '@ckeditor/ckeditor5-list';
import {MediaEmbed} from '@ckeditor/ckeditor5-media-embed';
import {Paragraph} from '@ckeditor/ckeditor5-paragraph';
import {PasteFromOffice} from '@ckeditor/ckeditor5-paste-from-office';
import {Table, TableToolbar} from '@ckeditor/ckeditor5-table';
import {TextTransformation} from '@ckeditor/ckeditor5-typing';
// 额外添加的插件
import {SimpleUploadAdapter} from '@ckeditor/ckeditor5-upload';
import {ImageResize} from '@ckeditor/ckeditor5-image';
import viewToPlainText from '@ckeditor/ckeditor5-clipboard/src/utils/viewtoplaintext';
import {CKEditor5UploadAdapter} from './CKEditor5UploadAdapter';

defineOptions({
    name: 'CCKEditor5',
    inheritAttrs: false,
})

defineExpose({
    getHtml,
    getText
});

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
    adapter: {
        type: String,
        validator(value) {
            return ['simple', 'ckeditor5'].includes(value);
        },
        default: 'ckeditor5',
    },
});

function CKEditor5UploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new CKEditor5UploadAdapter(loader, props.uploadFileUrl, props.browseFileUrl);
    };
}

const editor = ClassicEditor;

// 与@ckeditor/ckeditor5-build-classic保持一致
const editorConfig = ref({
    language: 'en',
    plugins: [
        Essentials,
        Autoformat,
        Bold,
        Italic,
        BlockQuote,
        Heading,
        Image,
        ImageCaption,
        ImageStyle,
        ImageToolbar,
        ImageUpload,
        Indent,
        Link,
        List,
        // 仅支持dailymotion、spotify、youtube、vimeo、instagram、twitter、googleMaps、flickr、facebook等外链
        // MediaEmbed,
        Paragraph,
        PasteFromOffice,
        PictureEditing,
        Table,
        TableToolbar,
        TextTransformation,
        // 额外添加的插件
        // SimpleUploadAdapter,
        ImageResize,
    ],
    extraPlugins: [],
    toolbar: {
        items: [
            'undo', 'redo',
            '|', 'heading',
            '|', 'bold', 'italic',
            '|', 'link', 'uploadImage', 'insertTable', 'blockQuote',
            // 'mediaEmbed',
            '|', 'bulletedList', 'numberedList', 'outdent', 'indent'
        ]
    },
    image: {
        toolbar: [
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
            '|',
            'toggleImageCaption',
            'imageTextAlternative'
        ]
    },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells'
        ]
    },
    simpleUpload: {
        uploadUrl: props.uploadFileUrl,
        withCredentials: true,
        headers: {},
    },
});
if (props.adapter === 'simple') {
    editorConfig.value.plugins.push(SimpleUploadAdapter);
} else if (props.adapter === 'ckeditor5') {
    editorConfig.value.extraPlugins.push(CKEditor5UploadAdapterPlugin);
}

const editorInstance = ref(null);

function onEditorReady(editor) {
    editorInstance.value = editor;
}

function getHtml() {
    let html = null;
    if (editorInstance.value) {
        html = editorInstance.value.getData();
    }
    return html;
}

function getText() {
    let text = null;
    if (editorInstance.value) {
        text = viewToPlainText(editorInstance.value.editing.view.document.getRoot());
    }
    return text;
}
</script>

<style>
.ck-editor__editable_inline {
    min-height: 300px;
}
</style>
