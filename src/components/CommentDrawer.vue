<template>
  <div class="CommentDrawer">
    <el-drawer title="评论" v-loading="loading" :visible.sync="drawer" :direction="direction">
      <!-- <div class="DrawerContainer" v-if="loading===fe"></div> -->
      <div id="comment-container">
        <div class="comment-list-container">
          <div class="comment-list-item" v-for="item in comments" :key="item.comment">
            <CommentCard v-on:reply-made-pass="obtainData" :doc_id="doc_id" :comment="item" />
          </div>
        </div>
        <CommentCreateWindow v-on:reply-made="obtainData" class="container-input" :doc_id="this.doc_id" :reply_to="null" />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import CommentCard from "./CommentCard";
import CommentCreateWindow from "./CommentCreateWindow";
import config from "@/config";
export default {
  inject: ["reload"],
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
  created() {
  },
  methods: {
    openDrawer() {
      this.drawer = true;
      this.loading = true;
      this.obtainData();
      this.loading = false;
    },
    obtainData() {
      this.$axios
        .post("/comment/get/", { doc_id: this.doc_id }, config.axiosHeaders)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.success === true) {
              this.comments = [];
              var index = 0;
              for(index= 0; index < response.data.comments.length ; index++){
                this.comments.push(response.data.comments[index]);
              }
              this.loading = false;
              // this.$forceUpdate();
              console.log(this.comments);
            } else {
              this.$notify({
                title: "通信失败!",
                type: "warning",
                message: response.data.exc,
                duration: 5000,
              });
              this.drawer = false;
            }
          } else {
            this.$notify({
              title: "通信失败!",
              type: "warning",
              message: response.status,
              duration: 5000,
            });
            this.drawer = false;
          }
        })
        .catch((error) => {
          this.drawer = false;
          this.$notify({
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
#comment-container {
  height: 95vh;
  overflow-y: hidden;
}
.container-input {
  height: 15%;
  max-height: 18%;
}
.comment-list-container {
  height: 70%;
  max-height: 70%;
  overflow-y: scroll;
}
</style>>