<template>
    <el-dropdown trigger="click" @command="handleCommand">
        <el-button type="info">
            <i class='el-icon-s-fold'></i>
            对当前文件排序
        </el-button>

        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='titleUp'>按名称升序<i class='el-icon-caret-top'></i></el-dropdown-item>
            <el-dropdown-item command='titleDown'>按名称降序<i class='el-icon-caret-bottom'></i></el-dropdown-item>
            <el-dropdown-item command='timeUp'>按时间升序<i class='el-icon-caret-top'></i></el-dropdown-item>
            <el-dropdown-item command='timeDown'>按时间降序<i class='el-icon-caret-bottom'></i></el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    export default {
        name: "DocumentSorter",
        props:{
            docList: Object
        },
        methods:{
            sortDocList: function (list, method) {
                if (method === 'titleDown') {
                    list.sort(function(a,b){
                        var x = a.title.toLowerCase()
                        var y = b.title.toLowerCase()
                        if (x > y) {return -1}
                        if (x < y) {return 1}
                        return 0
                    })
                } else if (method === 'titleUp') {
                    list.sort(function(a,b){
                        var x = a.title.toLowerCase()
                        var y = b.title.toLowerCase()
                        if (x < y) {return -1}
                        if (x > y) {return 1}
                        return 0
                    })
                }

                if (method === 'timeDown') {
                    list.sort(function(a,b){
                        var x = new Date(a.time)
                        var y = new Date(b.time)
                        if (x < y) {return -1}
                        if (x > y) {return 1}
                        return 0
                    })
                } else if (method === 'timeUp') {
                    list.sort(function(a,b){
                        var x = new Date(a.time)
                        var y = new Date(b.time)
                        if (x > y) {return -1}
                        if (x < y) {return 1}
                        return 0
                    })
                }
            },
            handleCommand: function (command) {
                this.sortDocList(this.docList, command)
                this.$emit("sortResult", this.docList);
            }
        }
    }
</script>

<style scoped>

</style>