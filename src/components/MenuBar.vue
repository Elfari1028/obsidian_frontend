<template>
    <div class="navigate_bar">
        <el-row>
            <el-col :span="6" :offset="0">
                <div class="navigate_bar_title">
                    <img src="../assets/icon/logo.png" style="vertical-align: middle" alt="" width="40" height="40"/>
                    黑曜石文档
                </div>
            </el-col>
            <el-col v-if="!(hide===1)" :span="4" :offset="10">
                <el-input v-model="searchKeywords" placeholder="输入关键词" @keyup.enter.native="submitSearch"></el-input>
            </el-col>
            <el-col v-if="!(hide===1)" :span="2">
                <i class="el-icon-message-solid notice"></i>
            </el-col>
            <el-col v-if="!(hide===1)" :span="2">
                <!--                avatar -->
            </el-col>
        </el-row>
    </div>
</template>

<script>
    /**
     * 使用时请绑定 :hide="1" 以隐藏右侧通知等功能
     */
    import {updateStatus} from "@/utils/axiosUtils";

    export default {
        name: "MenuBar",
        components: {},
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
        computed: {}
        ,
        methods: {
            submitSearch: function () {
                console.log('submit!');
                console.log(this.searchKeywords);
            },
        },
        watch: {
            $route() {
                //this.isLogin = this.$store.getters.getLoginStatus;
                //this.userName = this.$store.getters.getUserName;
            }
        }
    };
</script>

<style>
    .notice {
        font-size: 25px;
        vertical-align: middle;
        height: 40px;
        line-height: 40px !important;
    }

    .navigate_bar {
        position: fixed;
        background: rgba(200, 200, 200, 0.5);
        border: 0;
        width: 100%;
        z-index: 3;
        padding-top: 5px;
        padding-bottom: 5px;
        box-shadow: 2px 2px 2px 2px rgba(200, 200, 200, 0.7);
    }

    .navigate_bar_title {
        font-family: tahoma, arial, 'Hiragino Sans GB', STXingkai, "Microsoft YaHei", SimSun, sans-serif;
        font-size: 25px;
        max-height: 40px;
        overflow: visible;
        word-break: keep-all;
    }
</style>