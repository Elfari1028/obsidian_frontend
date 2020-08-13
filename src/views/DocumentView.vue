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
            <div id="doc-title">{{doc_title}}</div>
            <el-button id="edit-button" size="small" type="plain" icon="el-icon-edit"></el-button>
            <br/>
            <DocEditor id="doc-editor" :docID="doc_id" />
          </el-main>
          <el-aside width="250px" id="aside_right">
            <div id="bench_toolbar">
              <div id="toolbar_title">文档操作</div> 
              <el-divider></el-divider>
              <el-button id="action-button"  type="success" icon="el-icon-lock" @click="updateList">保存文档</el-button>
              <br/>
            <el-button id="action-button"  type="warning" icon="el-icon-star-off" @click="updateList">收藏文档</el-button>
              <br/>
            <el-button id="action-button"  type="primary"  icon="el-icon-chat-line-square" @click="openCommentDrawer">评论面板</el-button>        
              <br/>
              <el-button id="action-button" type="plain" plain icon="el-icon-refresh" @click="updateList">刷新文档</el-button>
              <br/>
              <el-button id="action-button"  type="plain" plain icon="el-icon-time" @click="openChangelogDrawer">编辑记录</el-button>
              <br/>
              <el-button id="action-button" type="warning" plain icon="el-icon-share" @click="updateList">分享链接</el-button>
              <br/>
              <el-button id="action-button"  type="warning" plain icon="el-icon-lock" @click="updateList">设置权限</el-button>
              <br/>
              <el-button id="action-button"  type="danger" plain icon="el-icon-delete" @click="updateList">删除文件</el-button>
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
export default {
  name: "DocumentView",
  components: {
    AsideMenu,
    MenuBar,
    DocEditor,
    CommentDrawer: CommentDrawer,
    ChangelogDrawer: ChangelogDrawer,
  },
  data() {
    return {
      doc_id: "",
      doc_title:"Lorem Ipsum",
    };
  },
  methods: {
    openCommentDrawer() {
      this.$refs.commentDrawer.openDrawer();
    },
    openChangelogDrawer() {
      this.$refs.changelogDrawer.openDrawer();
    },
  },
  created() {
    console.log(this.$route.path);
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

#action-button {
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