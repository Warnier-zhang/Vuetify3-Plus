<template>
    <div>
        <v-breadcrumbs :items="['控件', '统计（7）']"></v-breadcrumbs>

        <v-list-subheader>CStat1:</v-list-subheader>
        <v-row>
            <v-col cols="2">
                <CStat1
                    title="245k"
                    subtitle="Sales"
                    text="Calculated in last 7 days"
                    color="red"
                    variant="outlined">
                </CStat1>
            </v-col>

            <v-col cols="2">
                <CStat1
                    color="red"
                    title="245k"
                    subtitle="Sales"
                    text="Calculated in last 7 days"
                    variant="tonal">
                </CStat1>
            </v-col>

            <v-col cols="2">
                <CStat1
                    color="red"
                    title="245k"
                    subtitle="Sales"
                    text="Calculated in last 7 days"
                    variant="text">
                </CStat1>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="2">
                <v-list-subheader>CStat2:</v-list-subheader>

                <CStat2
                    title="245k"
                    subtitle="Sales"
                    icon="mdi-trending-up"
                    color="red"
                    text="Calculated in last 7 days">
                </CStat2>
            </v-col>

            <v-col cols="2">
                <v-list-subheader>CStat2:</v-list-subheader>

                <CStat2
                    @click="()=>{CMessage.info('Clickable');}"
                    title="245k"
                    subtitle="Sales"
                    color="red"
                    text="Calculated in last 7 days">
                    <template v-slot:icon>
                        <v-chip
                            size="small"
                            prepend-icon="mdi-trending-up">
                            <span class="font-weight-bold">+15%</span>
                        </v-chip>
                    </template>
                </CStat2>
            </v-col>

            <v-col cols="2">
                <v-list-subheader>CStat3:</v-list-subheader>

                <CStat3
                    title="245k"
                    subtitle="Sales"
                    color="red"
                    expected="999"
                    actual="245">
                </CStat3>
            </v-col>

            <v-col cols="2">
                <v-list-subheader>CStat4:</v-list-subheader>

                <CStat4
                    title="245k"
                    subtitle="Sales"
                    text="Calculated in last 7 days"
                    emphasis="+15%"
                    color="red">
                </CStat4>
            </v-col>
        </v-row>

        <v-list-subheader class="mb-6">CStat5:</v-list-subheader>
        <v-row>
            <v-col cols="2">
                <CStat5
                    title="245k"
                    subtitle="Sales"
                    text="Calculated in last 7 days"
                    icon="mdi-trending-up"
                    color="red">
                </CStat5>
            </v-col>
        </v-row>

        <v-list-subheader>CStat6:</v-list-subheader>
        <v-row>
            <v-col cols="2">
                <CStat6
                    title="245k"
                    subtitle="Sales"
                    icon="mdi-trending-up"
                    color="red">
                </CStat6>
            </v-col>

            <v-col cols="2">
                <CStat6
                    title="245k"
                    subtitle="Sales"
                    icon="mdi-trending-up"
                    color="orange"
                    variant="flat">
                </CStat6>
            </v-col>

            <v-col cols="2">
                <CStat6
                    title="245k"
                    subtitle="Sales"
                    icon="mdi-trending-up"
                    color="yellow"
                    variant="tonal">
                </CStat6>
            </v-col>

            <v-col cols="2">
                <CStat6
                    title="245k"
                    subtitle="Sales"
                    icon="mdi-trending-up"
                    color="green"
                    variant="outlined">
                </CStat6>
            </v-col>

            <v-col cols="2">
                <CStat6
                    title="245k"
                    subtitle="Sales"
                    icon="mdi-trending-up"
                    color="blue"
                    variant="text">
                </CStat6>
            </v-col>

            <v-col cols="2">
                <CStat6
                    title="245k"
                    subtitle="Sales"
                    icon="mdi-trending-up"
                    color="purple"
                    variant="plain">
                </CStat6>
            </v-col>
        </v-row>

        <v-list-subheader>CStat7:</v-list-subheader>
        <v-row>
            <v-col cols="3">
                <CStat7
                    title="Google Drive"
                    subtitle="Automate your file upload workflow"
                    icon="mdi-google-drive"
                    avatar
                    color="grey"
                    btn-text="Connected"
                    btn-color="red"
                    @click="()=>{CMessage.success('Connected')}">
                </CStat7>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import CMessage from '@/components/feedback/CMessage';
</script>

<style scoped>

</style>
