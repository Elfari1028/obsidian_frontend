<template>
  <!-- <div class="comment-container-outer"> -->
    <el-card class="comment-container-outer">
    <div class="comment-container-inner">
      <div class="comment-info-row" ref="commentrow">
        <div class="comment-avatar" :span="5">
          <el-avatar shape="circle" :size="50" :src="commentData.comment.avatar"></el-avatar>
        </div>
        <div class="comment-info" :span="19">
          <div class="comment-creator">{{commentData.comment.username}}</div>
          <div class="comment-time">{{commentData.comment.create_time}}</div>
        </div>
      </div>
      <div class="comment-frame">
        <div class="comment-reply" v-if="asReply===false&&commentData.reply!=null">
          <CommentCard :comment="{comment:commentData.reply,reply:null}" :asReply="true" />
        </div>
        <div class="comment-body">{{commentData.comment.content}}</div>
      </div>
      <el-popover placement="left" title="回复评论" width="330" v-model="visible">
        <CommentCreateWindow :doc_id="doc_id" :reply_to="this.comment.comment"/>
        <div slot="reference"  class="reply-button"><el-button v-if="asReply===false"  type="primary">回复</el-button></div>
      </el-popover>
    </div>
    </el-card>
  <!-- </div> -->
</template>

<script>
import CommentCreateWindow from "./CommentCreateWindow";
export default {
  name: "CommentCard",
  components: {CommentCreateWindow},
  props: {
    doc_id: {type:Number,default:-1},
    asReply: {
      type: Boolean,
      default:false,
    },
    comment: Object,
  },
  mounted: function () {
  
  },
  methods: {
    onClickReply() {
      this.visible=true;
    },
  },
  data() {
    return {
      commentData: this.$props.comment,
      visible:false,
    };
  },
};
</script>

<style>
.comment-container-inner {
  margin: 10px;
}
.comment-container-outer {
  margin: 10px;
  /* border: 1px;
  border-color: rgb(255, 255, 255);
  border-style: solid;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgb(172, 171, 171); */
}
.comment-info-row {
  width: 100%;
  height: 75px;
  text-align: left;
  vertical-align: middle;
  margin-left: 5px;
  margin-right: 5px;
}
.comment-avatar {
  width: 50px;
  display: inline-block;
  vertical-align: middle;
}
.comment-info {
  margin-left: 5px;
  vertical-align: middle;
  display: inline-block;
}
.comment-creator {
  text-align: left;
  font-weight: 700;
  font-size: medium;
  color: rgb(121, 126, 133);
  margin: 5px;
}
.comment-time {
  text-align: left;
  font-weight: 500;
  font-size: x-small;
  color: slategray;
  margin: 5px;
}
.comment-body {
  text-align: justify;
  margin: 5px;
}
.reply-button {
  text-align: end;
}
</style>