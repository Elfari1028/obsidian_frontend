<template>
    <div class="navigate_bar">
		<!-- 搜索结果 -->
		<el-drawer
			:title="'“'+searchKeywords+'”'+'搜索结果'"
			:visible.sync="visible"
			direction="rtl"
			z-index="0"
			size="450px"
			>
		
			<SearchResult></SearchResult>
		
		</el-drawer>
		
        <el-row>
            <el-col :span="6" :offset="0">
                <div class="navigate_bar_title">
                    <img src="../assets/icon/obsidian2.png" style="vertical-align: middle" alt="" width="40" height="40"/>
                    黑曜石文档
                </div>
            </el-col>
            <el-col v-if="!(hide===1)" :span="4" :offset="10">
				
				<el-input v-model="searchKeywords" placeholder="搜索当前页面" @keyup.enter.native="submitSearch"></el-input>
				
            </el-col>
            <el-col v-if="!(hide===1)" :span="1">
                <i class="el-icon-message-solid notice"></i>
            </el-col>
            <el-col v-if="!(hide===1)" :span="2">
                <div class="menubar_username">{{this.username}}</div>
            </el-col>
            <el-col v-if="!(hide===1)" :span="1">
            </el-col>
        </el-row>

    </div>
</template>

<script>
    /**
     * 使用时请绑定 :hide="1" 以隐藏右侧通知等功能
     */
    import {updateStatus} from "@/utils/axiosUtils";
	import SearchResult from "./SearchResult.vue"

    export default {
        name: "MenuBar",
        components: {SearchResult},
        props: {
            hide: Number,
			test: String,
			docList: Array
        },
        data() {
            return {
                searchInput: "",
                searchKeywords: "",
				visible: false
            };
        },
        created() {
            updateStatus()
        },
        computed: {
            username(){
                return this.$store.getters.getUsername
            }
        },
        methods: {
            submitSearch: function () {
                console.log('submit!');
                console.log(this.searchKeywords);
				this.visible = true
				
            },
        },
        watch: {
            $route() {
                this.username = this.$store.getters.getUsername;
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
    }

    .menubar_username {
        line-height: 40px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>