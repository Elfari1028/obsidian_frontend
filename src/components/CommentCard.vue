<template>
  <div class="comment-container-outer">
    <div class="comment-container-inner">
      <div class="comment-info-row" ref="commentrow">
        <div class="comment-avatar" :span="5">
          <el-avatar shape="circle" :size="50" :src="commentData.primary.avatar"></el-avatar>
        </div>
        <div class="comment-info" :span="19">
          <div class="comment-creator">{{commentData.primary.username}}</div>
          <div class="comment-time">{{commentData.primary.create_time}}</div>
        </div>
      </div>
      <div class="comment-frame">
        <div class="comment-reply" v-if="asReply===false&&commentData.reply!=null">
          <CommentCard :comment="{primary:commentData.reply,reply:null}" :asReply="true" />
        </div>
        <div class="comment-body">{{commentData.primary.content}}</div>
      </div>
      <div class="reply-button">
        <el-button v-if="asReply===false" @click="onClickReply" type="primary">回复</el-button>
      </div>
    </div>
    <CreateCommentPopup v-if="asReply===false" ref="comment_popup" />
  </div>
</template>

<script>
import CreateCommentPopup from "./CreateCommentPopup";
export default {
  name: "CommentCard",
  components: {"CreateCommentPopup":CreateCommentPopup},
  props: {
    asReply: {
      type: Boolean,
      default: false,
    },
    comment: {
      type: Object,
      default: () => {
        return {
          primary: {
            com_id: "-1",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nisi sapien, porttitor ut imperdiet bibendum, consequat commodo massa. Vivamus a eleifend neque, ac malesuada neque. Nam eget eros gravida, ullamcorper tortor sed, viverra diam. Integer semper ante est, sed fringilla ante pellentesque ac. Phasellus sodales enim purus, eu fringilla quam sodales nec.",
            create_time: "2020/09/07 12:00",
            username: "username",
            avatar:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597314932665&di=d7bec76eeee1e537282d7ffbfea49908&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Fface%2F149d49a05a1b89c8e12825ab2d8bb5a02a6ddaa3.jpg",
          },
          reply: {
            com_id: "-1",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nisi sapien, porttitor ut imperdiet bibendum, consequat commodo massa. Vivamus a eleifend neque, ac malesuada neque. Nam eget eros gravida, ullamcorper tortor sed, viverra diam. Integer semper ante est, sed fringilla ante pellentesque ac. Phasellus sodales enim purus, eu fringilla quam sodales nec.",
            create_time: "2020/09/07 12:00",
            username: "username",
            avatar:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597314932665&di=d7bec76eeee1e537282d7ffbfea49908&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Fface%2F149d49a05a1b89c8e12825ab2d8bb5a02a6ddaa3.jpg",
          },
        };
      },
    },
  },
  mounted: function () {
  
  },
  methods: {
    onClickReply() {
       this.$refs.comment_popup.openDialog();
      // console.log(this.$refs.comment_popup);
      // CreateCommentPopup.openDialog();
    },
  },
  data() {
    return {
      commentData: this.$props.comment,
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
  border: 1px;
  border-color: rgb(255, 255, 255);
  border-style: solid;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgb(172, 171, 171);
}
.comment-info-row {
  width: 100%;
  height: 75px;
  text-align: left;
  vertical-align: middle;
  margin-left: 5px;
  margin-right: px;
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