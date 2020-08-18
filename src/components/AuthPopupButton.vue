<template>
  <div>
    <el-popover placement="left" title="权限设置" width="330" trigger="click">
      <div id="auth-panel-container">
        <el-divider content-position="left">分享链接</el-divider>
        <el-input label="链接"	id="url_input" :value="url" :disabled="false"><el-button slot="append" @click="copyURL" icon="el-icon-document-copy"></el-button></el-input>
        <el-divider content-position="left">访问者权限</el-divider>
        <div id="auth-open-panel">
          <el-switch class="auth-switch" v-model="self_auth_read" @change="updateSelfAuthRead" active-color="#67C23A" inactive-color="#909399" inactive-text="阅读" :disabled="!belong_to_creator"></el-switch>
          <el-switch class="auth-switch" v-model="self_auth_edit" @change="updateSelfAuthEdit" active-color="#67C23A" inactive-color="#909399" inactive-text="编辑" :disabled="!belong_to_creator"></el-switch>
          <el-switch class="auth-switch" v-model="self_auth_comment" @change="updateSelfAuthComment" active-color="#67C23A" inactive-color="#909399" inactive-text="评论" :disabled="!belong_to_creator"></el-switch>
        </div>
        <div id="auth-teammate-panel" v-if="belong_to_team===true">
          <el-divider content-position="left">团队成员权限</el-divider>
          <el-switch class="auth-switch" v-model="team_auth_read" @change="updateTeamAuthRead" active-color="#67C23A" inactive-color="#909399" inactive-text="阅读" :disabled="!belong_to_creator"></el-switch>
          <el-switch class="auth-switch" v-model="team_auth_edit" @change="updateTeamAuthEdit" active-color="#67C23A" inactive-color="#909399" inactive-text="编辑" :disabled="!belong_to_creator"></el-switch>
          <el-switch class="auth-switch" v-model="team_auth_comment" @change="updateTeamAuthComment" active-color="#67C23A" inactive-color="#909399" inactive-text="评论" :disabled="!belong_to_creator"></el-switch>
        </div>
      </div>
      <el-button slot="reference" class="action-button"  type="warning" plain icon="el-icon-lock">设置权限</el-button>
    </el-popover>
  </div>
</template>

<script>
import Config from "@/config"
export default {
  name: "AuthPopupButton",
  props: {
    doc_id:{
      type: Number,
      default: -1,
    },
    belong_to_team: {
      type: Boolean,
      default: true,
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
    updateSelfAuthRead(val){
      this.self_auth_read = val;
      if(val===true)
        this.team_auth_read = true;
      if(val===false){
        this.self_auth_edit = false;
        this.self_auth_comment = false;
      }
      this.updateAuth();
    },
    updateSelfAuthEdit(val){
      this.self_auth_edit = val;
      if(val===true){
        this.team_auth_edit = val;
        this.self_auth_read = val;
        this.team_auth_read = val;
      }
      this.updateAuth();
    },
    updateSelfAuthComment(val){
      this.self_auth_comment = val;
      if(val===true){
        this.team_auth_comment = val;
        this.self_auth_read = val;
        this.team_auth_read = val;
      }
      this.updateAuth();
    },
    updateTeamAuthRead(val){
      this.team_auth_read = val;
      if(val===false){
        this.team_auth_edit = val;
        this.team_auth_comment = val;
        this.updateSelfAuthRead(false);
        return;
      }
      this.updateAuth();
    },
    updateTeamAuthEdit(val){
      this.team_auth_edit = val;
      if(val===true)
        this.team_auth_read = true;
      if(val===false)
        this.self_auth_edit = false;
     this.updateAuth();
    },
    updateTeamAuthComment(val){
      this.team_auth_comment = val;
      if(val===true)
        this.team_auth_read = true;
      if(val===false)
        this.self_auth_comment = false;
      this.updateAuth();
    },
    updateAuth(){
      this.$forceUpdate();
      this.$axios.post("/doc/edit_permission/",{
        doc_id: this.doc_id,
        auth:{read:this.self_auth_read,edit:this.self_auth_edit,comment:this.self_auth_comment},
        team_auth: this.belong_to_team?{read:this.team_auth_read,edit:this.team_auth_edit,comment:this.team_auth_comment}:null,
      },Config.axiosHeaders).then((response) => {
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
      team_auth_read: this.init_team_auth.read,
      team_auth_edit: this.init_team_auth.edit,
      team_auth_comment: this.init_team_auth.comment,
      self_auth_read: this.init_self_auth.read,
      self_auth_edit: this.init_self_auth.edit,
      self_auth_comment: this.init_self_auth.comment,
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