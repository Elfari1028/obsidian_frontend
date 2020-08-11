<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleSelect">
            <el-tab-pane label="最近使用" name="1">最近使用</el-tab-pane>
            <el-tab-pane label="我的文档" name="2">我的文档</el-tab-pane>
            <el-tab-pane label="我的收藏" name="3">我的收藏</el-tab-pane>
        </el-tabs>
        <div class="bench_main">

        </div>
    </div>
</template>

<script>
    export default {
        name: "WorkBench",
        data() {
            return {
                activeName: '1'
            }
        },
        methods: {
            handleSelect() {

            }
        }
    }
</script>

<style scoped>

</style>