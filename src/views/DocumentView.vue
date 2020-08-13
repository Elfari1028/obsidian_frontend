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
        <el-main>
          <div id="view-container">
            <div id="view-body">
              <DocEditor :docID="doc_id" />
            </div>
            <div id="view-side">
              <div class="action-button comments">
                <el-button type="primary" @click="openCommentDrawer">查看评论</el-button>
              </div>
              <div class="action-button changelogs">
                <el-button type="primary" @click="openChangelogDrawer">查看编辑记录</el-button>
              </div>
            </div>
          </div>
        </el-main>
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
    "CommentDrawer": CommentDrawer,
    "ChangelogDrawer": ChangelogDrawer,
  },
  data() {
    return {
      doc_id: "",
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
#view-container {
  width: 100%;
  text-align: start;
}
#view-body {
  width: 85%;
  min-width: 400px;
  margin-left: 30px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
}
#view-side {
  width: 10%;
  margin-left: 30px;
  display: inline-block; 
  vertical-align: top;
}
.action-button {
  vertical-align: top;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>