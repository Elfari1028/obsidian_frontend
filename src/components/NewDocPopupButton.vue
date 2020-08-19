<template>
  <div id="NewDocPopupButton">
    <el-popover placement="left" title="新建文档" width="330" v-model="visible">
      <div id="auth-panel-container">
        <el-divider content-position="left">标题</el-divider>
        <el-input placeholder="在这里输入标题" :value="title" @input="update_title" :disabled="false"></el-input>
        <el-divider content-position="left">选择模板</el-divider>
        <el-select v-model="template_select" style="width:100%">
          <el-option
            id="option-box"
            v-for="template in this.template_list"
            :key="template.template_id"
            :label="template.title"
            :value="template.template_id"
          >
            <span style="float: left">{{template.title}}</span>
            <br />
            <span style="float: left; color: #8492a6; font-size: 13px">{{template.intro}}</span>
          </el-option>
        </el-select>
        <div id="auth-teammate-panel" v-if="belong_to_team===true">
          <el-divider content-position="left">团队成员权限</el-divider>
          <el-switch
            class="auth-switch"
            v-model="team_auth.read"
            @change="onReadChange"
            active-color="#67C23A"
            inactive-color="#909399"
            inactive-text="阅读"
          ></el-switch>
          <el-switch
            class="auth-switch"
            v-model="team_auth.edit"
            @change="onEditChange"
            active-color="#67C23A"
            inactive-color="#909399"
            inactive-text="编辑"
          ></el-switch>
          <el-switch
            class="auth-switch"
            v-model="team_auth.comment"
            @change="onCommentChange"
            active-color="#67C23A"
            inactive-color="#909399"
            inactive-text="评论"
          ></el-switch>
        </div>
        <br />
        <el-button
          id="create-button"
          size="medium"
          type="success"
          round
          icon="el-icon-check"
          @click="createDocument"
        >新建文档</el-button>
      </div>
      <el-button slot="reference" size="small" type="info" round icon="el-icon-plus">新建文档</el-button>
    </el-popover>
  </div>
</template>

<script>
import Config from "@/config";
export default {
  name: "NewDocPopupButton",
  components: {},
  props: {
    belong_to_team: {
      type: Boolean,
      default: false,
    },
    team_id: {
      type: Number,
      default: -1,
    },
  },
  methods: {
    onReadChange(val){
      this.team_auth.read=val;
      if(val===false){
        this.team_auth.edit=false;
        this.team_auth.comment=false;
      }
    },
    onEditChange(val){
      this.team_auth.edit=val;
      if(val===true){
        this.team_auth.read=true;
      }
    },
    onCommentChange(val){
      this.team_auth.comment=val;
      if(val===true){
        this.team_auth.comment=true;
      }
    },
    createDocument() {
      let referer = this;
      console.log({       
          title: referer.title,
          template:
            referer.template_select === 0 ? null : referer.template_select,
          team_auth: referer.belong_to_team ? referer.team_auth : null,
          team: referer.belong_to_team ? referer.team_id : null,
      });
      this.$axios.post(
        "/doc/create_doc/",
        {
          title: referer.title,
          template:
            referer.template_select === 0 ? null : referer.template_select,
          team_auth: referer.belong_to_team ? referer.team_auth : null,
          team: referer.belong_to_team ? referer.team_id : null,
        },
        Config.axiosHeaders
      ).then((response) => {
          if (response.status === 200) {
            if (response.data.success === true){
              let doc_id = response.data.doc;
              referer.$router.push({
                   name: 'DocumentView',params:{doc_id:doc_id},
                });
            }
            else
              referer.$notify({
                title: "操作失败！",
                message: "错误信息:" + response.data.exc,
              });
          } else {
            referer.$notify({
              title: "网络异常，连接失败！",
              message: "错误代码：" + response.status,
            });
          }
        })
        .catch((error) => {
          referer.$notify({
            title: "网络异常，连接失败！",
            message: "错误代码：" + error.response.status,
          });
        });
        this.visible = false;
    },
    update_title(text) {
      this.title = text;
    },
    getobj() {
      return {
        template_id: 0,
        title: "示例模板",
        intro: "用于工作计划安排，预置了标题。",
      };
    },
    setEmptyTemplateList() {
      this.template_list = [
        { template_id: 0, title: "空白模板", intro: "创建一个空白文档" },
      ];
    },
  },
  created() {
    let referer = this;
    this.$axios
      .get("/doc/list_all_templates/", Config.axiosHeaders)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.success === true) {
            referer.template_list = response.data.list;
            referer.template_list.unshift({
              template_id: 0,
              title: "空白模板",
              intro: "创建一个空白文档",
            });
            return;
          } else {
            referer.methods.setEmptyTemplateList();
            referer.$notify({
              title: "获取模板列表失败！",
              type: "error",
              message: "错误信息:" + response.data.exc,
            });
          }
        } else {
          referer.methods.setEmptyTemplateList();
          referer.$notify({
            title: "网络异常，获取模板列表失败！",
            type: "error",
            message: "错误代码：" + response.status,
          });
        }
      })
      .catch((error) => {
        referer.setEmptyTemplateList();
        referer.$notify({
          title: "网络异常，获取模板列表失败！",
          type: "error",
          message: "错误代码：" + error,
        });
      });
    console.log(referer.template_list);
  },
  data() {
    return {
      title: "",
      visible: false,
      template_list: [
        { template_id: 0, title: "空白模板", intro: "创建一个空白文档" },
      ],
      team_auth: { read: true, edit: false, comment: true, share:true },
    };
  },
};
</script>

<style>
.el-input {
  width: 330px;
}
.action-button {
  margin-top: 10px;
  margin-bottom: 10px;
}
.auth-switch {
  margin: 10px;
}
#auth-panel-container {
  margin: 10px;
}

.el-switch__label--left.is-active {
  z-index: 1111;
  color: #000 !important;
}
.el-select-dropdown__wrap {
  margin-bottom: 0px !important;
  /* margin-right: -17px; */
}
#option-box {
  overflow-y: visible;
  height: auto;
}
#create-button {
  float: right;
  margin-top: 20px;
}
#select-area {
  width: 330;
}
#NewDocPopupButton {
  display: inline-block;
  margin-left: 10px;
}
</style>