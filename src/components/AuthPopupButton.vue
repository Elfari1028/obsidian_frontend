<template>
  <div>
    <el-popover placement="left" title="权限设置" width="330" trigger="click">
      <div id="auth-panel-container">
        <el-divider content-position="left">分享链接</el-divider>
        <el-input label="链接"	id="url_input" :value="url" :disabled="false"><el-button slot="append" @click="copyURL" icon="el-icon-document-copy"></el-button></el-input>
        <el-divider content-position="left">访问者权限</el-divider>
        <div id="auth-open-panel">
          <el-switch class="auth-switch" v-model="self_auth.read" @change="updateAuth" active-color="#67C23A" inactive-color="#909399" inactive-text="阅读" :disabled="!belong_to_creator"></el-switch>
          <el-switch class="auth-switch" v-model="self_auth.write" @change="updateAuth" active-color="#67C23A" inactive-color="#909399" inactive-text="编辑" :disabled="!belong_to_creator"></el-switch>
          <el-switch class="auth-switch" v-model="self_auth.comment" @change="updateAuth" active-color="#67C23A" inactive-color="#909399" inactive-text="评论" :disabled="!belong_to_creator"></el-switch>
        </div>
        <div id="auth-teammate-panel" v-if="belong_to_team===true">
          <el-divider content-position="left">团队成员权限</el-divider>
          <el-switch class="auth-switch" v-model="team_auth.read" @change="updateAuth" active-color="#67C23A" inactive-color="#909399" inactive-text="阅读" :disabled="!belong_to_creator"></el-switch>
          <el-switch class="auth-switch" v-model="team_auth.write" @change="updateAuth" active-color="#67C23A" inactive-color="#909399" inactive-text="编辑" :disabled="!belong_to_creator"></el-switch>
          <el-switch class="auth-switch" v-model="team_auth.comment" @change="updateAuth" active-color="#67C23A" inactive-color="#909399" inactive-text="评论" :disabled="!belong_to_creator"></el-switch>
        </div>
      </div>
      <el-button slot="reference" class="action-button"  type="warning" plain icon="el-icon-lock" @click="updateList">设置权限</el-button>
    </el-popover>
  </div>
</template>

<script>
import config from "@/config"
export default {
  name: "AuthPopupButton",
  props: {
    doc_id:{
      type: Number,
      default: -1,
    },
    belong_to_team: {
      type: Boolean,
      default: false,
    },
    belong_to_creator:{
      type:Boolean,
      default:true,
    },
    init_self_auth:{
      type: Object,
      default(){
        return {
        read: true,
        edit: false,
        comment: false,
      };},
    },
    init_team_auth:{
      type: Object,
      default(){return{
        read: true,
        edit: false,
        comment: false,
    };},
    },
  },
  methods:{
    getURL() {
      return window.location.href;
    },
    copyURL(){
      var copyText = document.getElementById("url_input");
      copyText.select();
      copyText.setSelectionRange(0, 99999); 
      document.execCommand("Copy");
      this.$message.success("已复制到粘贴板!");
    },
    updateAuth(){
      this.$axios.post("/doc/edit_permission/",{
        doc_id: this.doc_id,
        auth:this.self_auth,
        team_auth: this.belong_to_team?this.team_auth:null,
      },config.axiosHeaders).then((response) => {
          if (response.status === 200) {
            if (response.data.success === true) return;
            else
              this.$notify({
                title: "操作失败！",
                message: "错误信息:" + response.data.exc,
              });
          } else {
            this.$notify({
              title: "网络异常，连接失败！",
              message: "错误代码：" + response.status,
            });
          }
        })
        .catch((error) => {
          this.$notify({
            title: "网络异常，连接失败！",
            message: "错误代码：" + error.response.status,
          });
        });
    },
  },
  created(){
  },
  data() {
    return {
      url: this.getURL(),
      team_auth:{
        read: true,
        edit: false,
        comment: false,
      },
      self_auth:{
        read: true,
        edit: false,
        comment: false,
      }
    };
  },
};
</script>

<style>
.action-button {
  margin-top: 10px;
  margin-bottom: 10px;
}
.auth-switch {
  margin: 10px;
}
#auth-panel-container{
  margin: 10px;
}

.el-switch__label--left.is-active{
  z-index: 1111;
  color: #000 !important;
}
</style>