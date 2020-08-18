<template>
  <div class="CommentDrawer">
    <el-drawer title="评论" v-loading="loading" :visible.sync="drawer" :direction="direction">
      <div class="DrawerContainer" v-if="loading===true"></div>

      <div class="container-active" v-else>
        <div class="comment-list" v-for="item in comments" :key="item.primary">
          <CommentCard :comment="item" />
        </div>
        <el-button  @click="onClickReply" type="primary">回复</el-button>
        <CreateCommentPopup ref="comment_popup" />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import CommentCard from "./CommentCard";
import CreateCommentPopup from "./CreateCommentPopup";
import config from "@/config";
export default {
  name: "CommentDrawer",
  components: { CommentCard,"CreateCommentPopup":CreateCommentPopup },
  props: {
    docID: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      drawer: false,
      loading: true,
      direction: "rtl",
      comments: [],
    };
  },
  methods: {
    onClickReply() {
       this.$refs.comment_popup.openDialog();
      // console.log(this.$refs.comment_popup);
      // CreateCommentPopup.openDialog();
    },
    openDrawer() {
      this.drawer = true;
      this.loading = true;
      this.setDemoData();
      this.loading = false;
      let ref = this;
      this.$axios
        .post("/comment/get/", { doc_id: this.docID }, config.axiosHeaders)
        .then( (response)=> {
          if (response.status === 200) {
            if (response.data.success === true) {
              ref.comments = response.data.comments;
              ref.loading = false;
            } else {
              ref.$notify({
                title: "通信失败!",
                type: "warning",
                message: response.data.exc,
                duration: 5000,
              });
              ref.drawer = false;
            }
          }
          else {
             ref.$notify({
                title: "通信失败!",
                type: "warning",
                message: response.status,
                duration: 5000,
              });
              ref.drawer = false;
          }
        })
        .catch((error)=> {
          ref.drawer = false;
          ref.$notify({
            title: "访问出错!",
            type: "danger",
            message: error,
            duration: 5000,
          });
        });
    },
    setDemoData() {},
  },
};
</script>

<style>
.container-active {
  height: 90vh;
  overflow-y: scroll;
}
</style>>