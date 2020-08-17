<template>
  <div>
    <el-container>
      <el-header style="padding: 0">
        <MenuBar />
      </el-header>
      <el-container>
        <el-aside width="225px" id="aside_left">
          <AsideMenu />
        </el-aside>
        <el-container>
          <el-main id="doc-container">
            <div id="doc-title">  <el-input :value="doc_title_input" v-if="edit_mode===true" @input="update_title_input"></el-input> <div v-if="edit_mode===false">{{doc_title}}</div></div>
           
            <el-button id="edit-button" size="small" type="plain" v-if="edit_mode===false" icon="el-icon-edit" @click="edit_mode=true"></el-button>   
            <el-button id="edit-button" size="small" type="plain" v-if="edit_mode===true" icon="el-icon-check" @click="update_title"></el-button>
            <el-button id="edit-button" size="small" type="plain" v-if="edit_mode===true" icon="el-icon-close" @click="cancel_update_title"></el-button>
            <br/>
            <DocEditor id="doc-editor" :docID="doc_id" />
          </el-main>
          <el-aside width="250px" id="aside_right">
            <div id="bench_toolbar">
              <div id="toolbar_title">文档操作</div> 
              <el-divider></el-divider>
              <el-button class="action-button"  type="success" icon="el-icon-lock" @click="updateList">保存文档</el-button>
              <br/>
            <el-button class="action-button"  type="warning" icon="el-icon-star-off" @click="updateList">收藏文档</el-button>
              <br/>
            <el-button class="action-button"  type="primary"  icon="el-icon-chat-line-square" @click="openCommentDrawer">评论面板</el-button>        
              <br/>
              <el-button class="action-button" type="plain" plain icon="el-icon-refresh" @click="updateList">刷新文档</el-button>
              <br/>
              <el-button class="action-button"  type="plain" plain icon="el-icon-time" @click="openChangelogDrawer">编辑记录</el-button>
              <br/>
              <AuthPopupButton />
              <el-button class="action-button"  type="danger" plain icon="el-icon-delete" @click="updateList">删除文件</el-button>
              <br/>
            </div>
          </el-aside>
        </el-container>
      </el-container>
      <ChangelogDrawer :docID="doc_id" ref="changelogDrawer" />
      <CommentDrawer :docID="doc_id" ref="commentDrawer" />
    </el-container>
  </div>
</template>

<script>
import MenuBar from "@/components/MenuBar";
import AsideMenu from "@/components/AsideMenu";
import DocEditor from "@/components/DocEditor";
import CommentDrawer from "@/components/CommentDrawer";
import ChangelogDrawer from "@/components/ChangelogDrawer";
import AuthPopupButton from "@/components/AuthPopupButton";
import config from "@/config"
export default {
  name: "DocumentView",
  components: {
    AsideMenu,
    MenuBar,
    DocEditor,
    CommentDrawer: CommentDrawer,
    ChangelogDrawer: ChangelogDrawer,
    AuthPopupButton,
  },
  data() {
    return {
      doc_id: "",
      doc_title:"Lorem Ipsum",
      doc_title_input: this.doc_title,
      edit_mode: false,
    };
  },
  methods: {
    openCommentDrawer() {
      this.$refs.commentDrawer.openDrawer();
    },
    openChangelogDrawer() {
      this.$refs.changelogDrawer.openDrawer();
    },
    update_title(){
      this.$axios.post("/doc/modify_title/",{doc_id:this.doc_id,new_title:this.doc_title_input},config.axiosHeaders).then((response) => {
          if (response.status === 200) {
            if (response.data.success === true) {
              this.doc_title = this.doc_title_input;   
              this.$message.confirm("修改成功！");
              return; 
            }
            else{
              this.doc_title_input = this.doc_title;
              this.$notify({
                title: "操作失败！",
                type:"error",
                message: "错误信息:" + response.data.exc,
              });
            }
          } else {
            this.doc_title_input = this.doc_title;
            this.$notify({
              title: "网络异常，连接失败！",
              type:"error",
              message: "错误代码：" + response.status,
            });
          }
        })
        .catch((error) => {
          this.doc_title_input = this.doc_title;
          this.$notify({
            title: "网络异常，连接失败！",
            type:"error",
            message: "错误代码：" + error.response.status,
          });
        });
        this.edit_mode = false;
    },
    cancel_update_title(){
      this.doc_title_input = this.doc_title;
      this.edit_mode = false;
    },
    update_title_input(text){
      this.doc_title_input=text;
      // console.log(text);
    }
  },
  created() { 
    this.doc_id=this.$route.params.doc_id;
    this.doc_title_input = this.doc_title;
  },
};
</script>

<style scoped>
#aside_left {
  border-right: 1px solid #dedfe6;
  height: auto;
  padding: 10px;
}
#doc-container {
  text-align: start;
}
#toolbar_title {
  display: inline;
  margin: 10px;
  color: dimgray;
  font-size: 16px;
  width: 50%;
}

#bench_toolbar {
  margin-top: 10px;
}

.action-button {
  margin-top: 10px;
  margin-bottom: 10px;
}

#aside_right {
    border-left: 1px solid #DEDFE6;
    height: auto;
    padding: 10px;
}
#doc-title{
    margin-left:15px;
    text-align: left;
    font-size: 35px;
    vertical-align:middle;
    text-align: right;
    display: inline-block;
}
#edit-button{
    display: inline-block;
    vertical-align:middle;
    text-align: right;
    margin-left: 15px;
}
#doc-editor{
    margin-top:15px;
}
</style>