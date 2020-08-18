<template>
  <div class="CommentDrawer">
    <el-drawer title="评论" v-loading="loading" :visible.sync="drawer" :direction="direction">
      <div class="DrawerContainer" v-if="loading===true"></div>
      <div id="comment-container" v-else>
        <div class="comment-list-container">
        <div class="comment-list-item" v-for="item in comments" :key="item.primary">
          <CommentCard :doc_id="doc_id" :comment="item" />
        </div>
        </div>
        <CommentCreateWindow class="container-input" :doc_id="this.doc_id" :reply_to="null" />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import CommentCard from "./CommentCard";
import CommentCreateWindow from "./CommentCreateWindow";
import config from "@/config";
export default {
  name: "CommentDrawer",
  components: { CommentCard, CommentCreateWindow },
  props: {
    doc_id: {
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
      this.obtainData();
      this.loading = false;
    },
    obtainData() {
      let ref = this;
      this.$axios
        .post("/comment/get/", { doc_id: this.doc_id }, config.axiosHeaders)
        .then((response) => {
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
          } else {
            ref.$notify({
              title: "通信失败!",
              type: "warning",
              message: response.status,
              duration: 5000,
            });
            ref.drawer = false;
          }
        })
        .catch((error) => {
          ref.drawer = false;
          ref.$notify({
            title: "访问出错!",
            type: "danger",
            message: error,
            duration: 5000,
          });
        });
    },
  },
};
</script>

<style>
#comment-container{
  height: 95%;
  overflow-y:hidden;
}
.container-input {
  height: 15%;
  max-height: 18%;
}
.comment-list-container{
  height: 70%;
  max-height: 70%;
  overflow-y: scroll;
}
</style>>