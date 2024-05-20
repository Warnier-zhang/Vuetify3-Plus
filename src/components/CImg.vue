<template>
    <v-hover>
        <template v-slot:default="{ isHovering, props }">
            <div v-bind="props">
                <v-img v-bind="$attrs">
                    <template v-slot:default>
                        <div class="d-flex flex-row fill-height justify-center align-center">
                            <v-btn
                                v-show="isHovering"
                                @click="preview($attrs.src)"
                                size="x-small"
                                icon="mdi-eye">
                            </v-btn>
                        </div>
                    </template>
                </v-img>
            </div>
        </template>
    </v-hover>
</template>

<script setup>
defineOptions({
    name: 'CImg'
});

// Vue
import {inject} from 'vue';

const $viewerApi = inject('$viewerApi');

function preview(url) {
    $viewerApi({
        images: [url],
    });
}
</script>

<style scoped>

</style>
