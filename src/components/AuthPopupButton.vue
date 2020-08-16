<template>
  <div>
    <el-popover placement="left" title="权限设置" width="330" trigger="click">
      <div id="auth-panel-container">
        <el-divider content-position="left">访问者权限</el-divider>
        <div id="auth-open-panel">
          <el-switch class="auth-switch" v-model="self_auth.read"  active-color="#67C23A" inactive-color="#909399" inactive-text="阅读" disabled="belong_to_creator===false?true:false"></el-switch>
          <el-switch class="auth-switch" v-model="self_auth.write" active-color="#67C23A" inactive-color="#909399" inactive-text="编辑"  disabled="belong_to_creator"></el-switch>
          <el-switch class="auth-switch" v-model="self_auth.comment" active-color="#67C23A" inactive-color="#909399" inactive-text="评论" disabled="belong_to_creator===false"></el-switch>
        </div>
        <div id="auth-teammate-panel" v-if="belong_to_team===true">
          <el-divider content-position="left">团队成员权限</el-divider>
          <el-switch class="auth-switch" v-model="team_auth.read" active-color="#67C23A" inactive-color="#909399" inactive-text="阅读" disabled="belong_to_creator"></el-switch>
          <el-switch class="auth-switch" v-model="team_auth.write" active-color="#67C23A" inactive-color="#909399" inactive-text="编辑" disabled="belong_to_creator"></el-switch>
          <el-switch class="auth-switch" v-model="team_auth.comment" active-color="#67C23A" inactive-color="#909399" inactive-text="评论" disabled="belong_to_creator"></el-switch>
        </div>
      </div>
      <el-button slot="reference" class="action-button"  type="warning" plain icon="el-icon-lock" @click="updateList">设置权限</el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "AuthPopupButton",
  props: {
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
  created(){
  },
  data() {
    return {
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