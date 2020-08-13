<template>
  <div class="changelog-container-outer">
    <div class="changelog-container-inner">
      <div class="changelog-info-row" ref="changelogrow">
        <div class="changelog-avatar" :span="5">
          <el-avatar shape="circle" :size="50" :src="changelogData.avatar"></el-avatar>
        </div>
        <div class="changelog-info" :span="19">
          <div class="changelog-creator">{{changelogData.username}}</div>
          <div class="changelog-time">于{{changelogData.change_time}}进行了编辑</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangelogCard",
  props: {
    asReply: {
      type: Boolean,
      default: false,
    },
    changelog: {
      type: Object,
      default: () => {
        return {
            id: "-1",
            change_time: "2020/09/07 12:00",
            username: "username",
            avatar:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597314932665&di=d7bec76eeee1e537282d7ffbfea49908&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Fface%2F149d49a05a1b89c8e12825ab2d8bb5a02a6ddaa3.jpg",
        };
      },
    },
  },
  data() {
    return {
      changelogData: this.$props.changelog,
    };
  },
};
</script>

<style>
.changelog-container-inner {
  margin: 10px;
}
.changelog-container-outer {
  margin: 10px;
  border: 1px;
  border-color: rgb(255, 255, 255);
  border-style: solid;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgb(172, 171, 171);
}
.changelog-info-row {
  width: 100%;
  height: 50px;
  text-align: left;
  vertical-align: middle;
  margin-left: 5px;
  margin-right: 5px;
}
.changelog-avatar {
  width: 50px;
  display: inline-block;
  vertical-align: middle;
}
.changelog-info {
  margin-left: 5px;
  vertical-align: middle;
  display: inline-block;
}
.changelog-creator {
  text-align: left;
  font-weight: 700;
  font-size: medium;
  color: rgb(121, 126, 133);
  margin: 5px;
}
.changelog-time {
  text-align: left;
  font-weight: 500;
  font-size: x-small;
  color: slategray;
  margin: 5px;
}

</style>