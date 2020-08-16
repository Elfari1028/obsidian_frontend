<template>
  <div>
    <el-popover placement="top-start" title="left-start" width="200" trigger="click">
      <div id="auth-panel-container">
        <el-divider content-position="left">非团队成员权限</el-divider>
        <div id="auth-open-panel">
          <el-switch class="auth-switch" v-model="value1" active-text inactive-text="阅读"></el-switch>
          <el-switch class="auth-switch" v-model="value1" active-text inactive-text="编辑"></el-switch>
          <el-switch class="auth-switch" v-model="value1" active-text inactive-text="评论"></el-switch>
        </div>
        <div id="auth-teammate-panel" :v-if="belong_to_team===true">
          <el-switch class="auth-switch" v-model="value1" active-text inactive-text="阅读"></el-switch>
          <el-switch class="auth-switch" v-model="value1" active-text inactive-text="编辑"></el-switch>
          <el-switch class="auth-switch" v-model="value1" active-text inactive-text="评论"></el-switch>
        </div>
      </div>
      <el-button slot="reference">设置权限</el-button>
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
    self_read: {
      type: Boolean,
      default: false,
    },
    self_edit: {
      type: Boolean,
      default: false,
    },
    self_comment: {
      type: Boolean,
      default: false,
    },
    team_read: {
      type: Boolean,
      default: false,
    },
    team_edit: {
      type: Boolean,
      default: false,
    },
    team_comment: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value1: true,
      value2: true,
    };
  },
};
</script>