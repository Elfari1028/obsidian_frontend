<template>
  <div class="ChangelogDrawer">
    <el-drawer
      title="编辑记录"
      v-loading="loading"
      :visible.sync="drawer"
      :direction="direction"
      size='400px'
    >
      <div class="changlog-loading-container" v-if="loading===true"> <img style="max-width: 100%; height:auto" src="@/assets/loading/loading.gif"/> </div>
      <div class="container-active" v-else>
        <!-- <div class="changelog-list" v-for="item in changelogs" :key="item.primary">
            <ChangelogCard :changelog="item"/>
        </div>-->

        <el-timeline>
          <el-timeline-item hide-timestamp	
            v-for="(activity, index) in changelogs"
            :key="index"
            :timestamp="activity.time"
          >
          <ChangelogCard :changelog="activity"/>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import ChangelogCard from './ChangelogCard';
import Config from '@/config'
export default {
  name: "ChangelogDrawer",
  components: {ChangelogCard},
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
      changelogs: [],
    };
  },
  methods: {
    openDrawer() {
      this.drawer = true;
      this.loading = true;
      this.obtainData();

    },
    obtainData(){
      this.$axios
        .post("/doc/get_history/", { doc_id: this.doc_id },Config.axiosHeaders)
        .then((response) =>{
          const res = response.data;
          if (res.success === true) {
            this.changelogs = [];
            var index = 0;
            for(index = 0 ; index < res.history.length ; index++){
              this.changelogs.push(res.history[index]);
            }
            this.loading=false;
          } else {
            this.$notify({
              title: "通信失败!",
              type: "warning",
              message: res.exc,
              duration: 5000,
            });
            this.drawer = false;
          }
        })
        .catch((error)=> {
          this.drawer = false;
          this.$notify({
            title: "访问出错!",
            type: "danger",
            message: error,
            duration: 5000,
          });
        });
    }
  },
};
</script>

<style>
.container-active {
  height: 90vh;
  overflow-y: scroll;
}
:focus{
    outline: none !important ; 
    outline-width:  0px;
  outline-color: transparent;
  outline-style: none;
}
</style>>