<template>
    <div>
        <v-breadcrumbs :items="['控件', 'ECharts图表（8）']"></v-breadcrumbs>

        <v-row>
            <v-col cols="3">
                <v-list-subheader>CLineChart:</v-list-subheader>

                <CLineChart
                    url="/demos/chart-data1.json"
                    title="浏览器份额排行榜"
                    subtitle="2024"
                    x-axis-title="浏览器"
                    y-axis-title="市占率"
                    y-axis-unit="%"
                    :smooth="true"
                    :steped="false"
                    :aspect-ratio="1">
                </CLineChart>
            </v-col>

            <v-col cols="3">
                <v-list-subheader>CLineChart:</v-list-subheader>

                <CLineChart
                    url="/demos/chart-data2.json"
                    title="2014、2024年浏览器份额排行榜"
                    subtitle="近十年"
                    x-axis-title="浏览器"
                    y-axis-title="市占率"
                    y-axis-unit="%"
                    show-legend
                    :show-point="false"
                    multiple
                    :aspect-ratio="1">
                </CLineChart>
            </v-col>

            <v-col cols="3">
                <v-list-subheader>CAreaChart:</v-list-subheader>

                <CAreaChart
                    url="/demos/chart-data1.json"
                    title="浏览器份额排行榜"
                    subtitle="2024"
                    x-axis-title="浏览器"
                    y-axis-title="市占率"
                    y-axis-unit="%"
                    :aspect-ratio="1">
                </CAreaChart>
            </v-col>

            <v-col cols="3">
                <v-list-subheader>CAreaChart:</v-list-subheader>

                <CAreaChart
                    url="/demos/chart-data2.json"
                    title="2014、2024年浏览器份额排行榜"
                    subtitle="近十年"
                    x-axis-title="浏览器"
                    y-axis-title="市占率"
                    y-axis-unit="%"
                    show-legend
                    multiple
                    :aspect-ratio="1"
                    item-x="x">
                </CAreaChart>
            </v-col>

            <v-col cols="3">
                <v-list-subheader>CColumnChart:</v-list-subheader>

                <CColumnChart
                    url="/demos/chart-data1.json"
                    title="浏览器份额排行榜"
                    subtitle="2024"
                    x-axis-title="浏览器"
                    y-axis-title="市占率"
                    y-axis-unit="%"
                    :aspect-ratio="1">
                </CColumnChart>
            </v-col>

            <v-col cols="3">
                <v-list-subheader>CColumnChart:</v-list-subheader>

                <CColumnChart
                    url="/demos/chart-data2.json"
                    title="2014、2024年浏览器份额排行榜"
                    subtitle="近十年"
                    x-axis-title="浏览器"
                    y-axis-title="市占率"
                    y-axis-unit="%"
                    show-legend
                    multiple
                    :stacked="false"
                    :aspect-ratio="1"
                    item-x="x">
                </CColumnChart>
            </v-col>

            <v-col cols="3">
                <v-list-subheader>CBubbleChart:</v-list-subheader>

                <CBubbleChart
                    url="/demos/chart-data1.json"
                    title="浏览器份额排行榜"
                    subtitle="2024"
                    x-axis-title="浏览器"
                    y-axis-title="市占率"
                    y-axis-unit="%"
                    :exponent="0.1"
                    :aspect-ratio="1">
                </CBubbleChart>
            </v-col>

            <v-col cols="3">
                <v-list-subheader>CBubbleChart:</v-list-subheader>

                <CBubbleChart
                    url="/demos/chart-data2.json"
                    title="2014、2024年浏览器份额排行榜"
                    subtitle="近十年"
                    x-axis-title="浏览器"
                    y-axis-title="市占率"
                    y-axis-unit="%"
                    :exponent="0.1"
                    show-legend
                    multiple
                    :aspect-ratio="1">
                </CBubbleChart>
            </v-col>

            <v-col cols="3">
                <v-list-subheader>CPieChart:</v-list-subheader>

                <CPieChart
                    url="/demos/chart-data1.json"
                    title="浏览器份额排行榜"
                    subtitle="2024"
                    item-value="y"
                    value-unit="%"
                    :aspect-ratio="1">
                </CPieChart>
            </v-col>

            <v-col cols="3">
                <v-list-subheader>CDonutChart:</v-list-subheader>

                <CDonutChart
                    url="/demos/chart-data1.json"
                    title="浏览器份额排行榜"
                    subtitle="2024"
                    item-value="y"
                    value-unit="%"
                    :rounded="false"
                    :aspect-ratio="1">
                </CDonutChart>
            </v-col>

            <v-col cols="3">
                <v-list-subheader>CHalfDonutChart:</v-list-subheader>

                <CHalfDonutChart
                    url="/demos/chart-data1.json"
                    title="浏览器份额排行榜"
                    subtitle="2024"
                    item-value="y"
                    value-unit="%"
                    :aspect-ratio="1">
                </CHalfDonutChart>
            </v-col>

            <v-col cols="3">
                <v-list-subheader>CCoxcombChart:</v-list-subheader>

                <CCoxcombChart
                    url="/demos/chart-data1.json"
                    title="浏览器份额排行榜"
                    subtitle="2024"
                    item-value="y"
                    value-unit="%"
                    :aspect-ratio="1">
                </CCoxcombChart>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>
