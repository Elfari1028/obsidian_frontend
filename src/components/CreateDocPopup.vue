<template>
    <div class="CreateDocPopup">
        <el-dialog title="创建新文档" :visible.sync="dialogVisible" width="30%">
            <el-input type="text" placeholder="标题"></el-input>
            <br/>
            <br/>
            <el-row>
                <el-button type="success" @click="submitNewDocument() ; dialogVisible = false;">提交</el-button>
                <el-button type="danger" @click="submitNewDocument() ; dialogVisible = false;">取消</el-button>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        name: "CreateDocPopup",
        created: function () {
            this.$axios
                .get("")
                .then((response) => {
                    const res = response.data;
                    if (res.success === true) {
                        this.templates = response.data.list;
                    } else {
                        this.$notify({
                            title: "通信失败!",
                            type: "warning",
                            message: res.exc,
                            duration: 5000,
                        });
                    }
                })
                .catch((error) => {
                    this.$notify({
                        title: "访问出错!",
                        type: "danger",
                        message: error,
                        duration: 5000,
                    });
                });
        },
        methods: {
            openDialog() {
                this.dialogVisible = true;
            },
            closeDialog() {
                this.dialogVisible = false;
            },
            submitNewDocument() {
                this.$notify({
                    title: "It works!",
                    type: "success",
                    message:
                        "We've laid the ground work for you. It's time for you to build something epic!",
                    duration: 5000,
                });
            },
        },
        data() {
            return {
                dialogVisible: false,
                templates: [],
            };
        },
    };
</script>

<style>
</style>
