<template>
    <div>
        <v-breadcrumbs :items="['控件', '反馈（2）']"></v-breadcrumbs>

        <v-list-subheader>CMessage:</v-list-subheader>
        <v-row>
            <v-col cols="2">
                <v-btn
                    color="success"
                    @click="() => { CMessage.success('success'); }">
                    success
                </v-btn>
            </v-col>

            <v-col cols="2">
                <v-btn
                    color="info"
                    @click="() => { CMessage.info('info'); }">
                    info
                </v-btn>
            </v-col>

            <v-col cols="2">
                <v-btn
                    color="warning"
                    @click="() => { CMessage.warning('warning'); }">
                    warning
                </v-btn>
            </v-col>

            <v-col cols="2">
                <v-btn
                    color="error"
                    @click="() => { CMessage.error('error'); }">
                    error
                </v-btn>
            </v-col>
        </v-row>

        <v-list-subheader>CModal:</v-list-subheader>
        <v-row>
            <v-col cols="2">
                <v-btn @click="onAlertClick">
                    alert
                </v-btn>
            </v-col>

            <v-col cols="2">
                <v-btn @click="onConfirmClick">
                    confirm
                </v-btn>
            </v-col>

            <v-col cols="2">
                <v-btn @click="onPromptClick">
                    prompt
                </v-btn>
            </v-col>
        </v-row>

        <v-list-subheader>CLoading:</v-list-subheader>
        <v-row>
            <v-col cols="2">
                <v-btn @click="onOpenClick">
                    open
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import CMessage from '@/components/feedback/CMessage';
import CModal from '@/components/feedback/CModal';
import CLoading from '@/components/feedback/CLoading';

function onAlertClick() {
    CModal.alert({
        title: '上传文件',
        message: '文件大小超过50MB！',
    });
}

function onConfirmClick() {
    CModal.confirm({
        title: '退出',
        message: '确定退出当前账号？',
        onOkClick() {
            CMessage.success('退出成功！');
        },
        onCancelClick() {
            CMessage.error('取消退出！');
        },
    });
}

function onPromptClick() {
    CModal.prompt({
        title: '短信验证',
        message: '请输入手机短信收到的验证码：',
        onOkClick(input) {
            CMessage.success(`验证码是${input}，验证成功！`);
        },
        onCancelClick() {
            CMessage.error('验证失败！');
        },
    });
}

function onOpenClick() {
    for (let i = 1; i <= 10; i++) {
        setTimeout(() => {
            console.log(`打开${i} ${new Date().getTime()}`);
            CLoading.open();
            setTimeout(() => {
                console.log(`命令关闭${i} ${new Date().getTime()}`);
                CLoading.close();
            }, 1000);
        }, i * 1000);
    }
}
</script>

<style scoped>

</style>
