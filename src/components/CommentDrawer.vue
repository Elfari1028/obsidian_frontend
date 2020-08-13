<template>
  <div class="CommentDrawer">
    <el-drawer
      title="评论"
      v-loading="loading"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <div class="DrawerContainer" v-if="loading===true"></div>
      <div class="container-active" v-else>
        <div class="comment-list" v-for="item in comments" :key="item.primary">
            <CommentCard :comment="item"/>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import CommentCard from './CommentCard';
export default {
  name: "CommentDrawer",
  components:{CommentCard},
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
    openDrawer() {
      this.drawer = true;
      this.loading = true;
      this.setDemoData();
      this.loading=false;
      // axios
      //   .post("", { doc_id: this.docID })
      //   .then(function (response) {
      //     const res = response.data;
      //     if (res.success === true) {
      //       this.comments = response.data.list;
      //       this.loading = false;
      //     } else {
      //       this.$notify({
      //         title: "通信失败!",
      //         type: "warning",
      //         message: res.exc,
      //         duration: 5000,
      //       });
      //       this.drawer = false;
      //     }
      //   })
      //   .catch(function (error) {
      //     this.drawer = false;
      //     this.$notify({
      //       title: "访问出错!",
      //       type: "danger",
      //       message: error,
      //       duration: 5000,
      //     });
      //   });
      this.comments = [{
          primary: {
            com_id: "-1",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nisi sapien, porttitor ut imperdiet bibendum, consequat commodo massa. Vivamus a eleifend neque, ac malesuada neque. Nam eget eros gravida, ullamcorper tortor sed, viverra diam. Integer semper ante est, sed fringilla ante pellentesque ac. Phasellus sodales enim purus, eu fringilla quam sodales nec.",
            create_time: "2020/09/07 12:00",
            username: "username",
            avatar:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597314932665&di=d7bec76eeee1e537282d7ffbfea49908&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Fface%2F149d49a05a1b89c8e12825ab2d8bb5a02a6ddaa3.jpg",
          },
          reply: null,
        },{
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
        },{
          primary: {
            com_id: "-1",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nisi sapien, porttitor ut imperdiet bibendum, consequat commodo massa. Vivamus a eleifend neque, ac malesuada neque. Nam eget eros gravida, ullamcorper tortor sed, viverra diam. Integer semper ante est, sed fringilla ante pellentesque ac. Phasellus sodales enim purus, eu fringilla quam sodales nec.",
            create_time: "2020/09/07 12:00",
            username: "username",
            avatar:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597314932665&di=d7bec76eeee1e537282d7ffbfea49908&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Fface%2F149d49a05a1b89c8e12825ab2d8bb5a02a6ddaa3.jpg",
          },
          reply: null
        },{
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
        } ];
    },
    setDemoData() {},
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          console.log(_);
          done();
        })
        .catch((_) => {
          console.log(_);});
    },
  },
};
</script>

<style>
.container-active{
  height: 90vh;
  overflow-y: scroll;
}
</style>>