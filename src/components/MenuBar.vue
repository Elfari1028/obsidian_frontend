<template>
    <div class="navigate_bar">
        <div class="navigate_bar_title">
            <img src="../assets/icon/obsidian2.png" style="vertical-align: middle" alt="" width="40" height="40"/>
            黑曜石文档
        </div>
        <div style="display: flex;position: absolute;right: 0">
            <div class="navigate_bar_function_item" style="max-width: 400px">
                <el-input v-model="searchKeywords"
                          placeholder="输入关键词"
                          @keyup.enter.native="submitSearch">
                    <el-button slot="append" icon="el-icon-search" @click="submitSearch"></el-button>
                </el-input>
            </div>
            <span style="width: 16px"></span>
            <NoticeBox class="navigate_bar_function_item"/>
            <span style="width: 10px"></span>
            <div class="menubar_username navigate_bar_function_item">
                <el-avatar :size="'small'"
                           :src="avatarUrl"
                           style="font-size: 30px;vertical-align: middle;margin-right: 10px"></el-avatar>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     * 使用时请绑定 :hide="1" 以隐藏右侧通知等功能
     */
    import {updateStatus} from "@/utils/axiosUtils";
    import NoticeBox from "@/components/NoticeBox";

    export default {
        name: "MenuBar",
        components: {NoticeBox},
        props: {
            hide: Number,
        },
        data() {
            return {
                searchInput: "",
                searchKeywords: "",
            };
        },
        created() {
            updateStatus()
        },
        computed: {
            username(){
                return this.$store.getters.getUsername
            },
            avatarUrl(){
                return this.$store.getters.getUserAvatar
            }
        },
        methods: {
            submitSearch: function () {
                console.log('submit!');
                console.log(this.searchKeywords);
                console.log(this.avatarUrl)
            },
        },
        watch: {
            $route() {
                this.username = this.$store.getters.getUsername;
                this.avatarUrl = this.$store.getters.getUserAvatar;
            }
        }
    };
</script>

<style>
    .navigate_bar_function_item{
    }

    .notice {
        font-size: 25px;
        vertical-align: middle;
        height: 40px;
        line-height: 40px !important;
    }

    .navigate_bar {
        display: flex;
        position: fixed;
        background: rgba(200, 200, 200, 0.5);
        border: 0;
        width: 100%;
        z-index: 3;
        padding-top: 5px;
        padding-bottom: 5px;
        box-shadow: 2px 2px 5px 1px rgba(200, 200, 200, 0.7);
    }

    .navigate_bar_title {
        font-family: tahoma, arial, 'Hiragino Sans GB', NSimSun, "Microsoft YaHei", SimSun, sans-serif;
        color: black;
        font-weight: 200;
        font-size: 20px;
        max-height: 40px;
        overflow: visible;
        word-break: keep-all;
        vertical-align: center;
        float: left;
        margin-left: 50px;
    }

    .menubar_username {
        min-width: 80px;
        line-height: 40px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>