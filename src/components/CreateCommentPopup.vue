<template>
  <div class="CreateCommentPopup">
    <el-dialog title="发表评论" :visible.sync="dialogVisible" width="30%">
      <el-input type="textarea" v-model="content" placeholder="回复内容"></el-input>
      <br />
      <br />
      <el-row>
        <el-button type="success" @click="submitNewDocument() ; dialogVisible = false;">提交</el-button>
        <el-button type="danger" @click="closeDialog() ; dialogVisible = false;">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CreateCommentPopup",
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    submitNewDocument() {
        axios
      .post("",{comment:""})
      .then(function (response) {
        const res = response.data;
        if (res.success === true) {
          this.$notify({
            title: "通信失败!",
            type: "warning",
            message: res.exc,
            duration: 5000,
          });
        } else {
          this.$notify({
            title: "通信失败!",
            type: "warning",
            message: res.exc,
            duration: 5000,
          });
        }
      })
      .catch(function (error) {
        this.$notify({
          title: "访问出错!",
          type: "danger",
          message: error,
          duration: 5000,
        });
      });
    },
  },
  data() {
    return {
      dialogVisible: false,
      comments:"",
      content:"",
    };
  },
};
</script>

<style>
</style>
