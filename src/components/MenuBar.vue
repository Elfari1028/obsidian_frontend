<template>
    <div class="navigate_bar">
		<!-- 搜索结果 -->
		<el-drawer
			:title="spaceType+'“'+searchKeywords+'”的搜索结果'"
			:visible.sync="visible"
			direction="rtl"
			z-index="2"
			size="450px"
			>

			<SearchResult :docList='resultList' :docType='docType'></SearchResult>

		</el-drawer>
        <div class="navigate_bar_title">
            <img src="../assets/icon/obsidian2.png" style="vertical-align: middle" alt="" width="40" height="40"/>
            黑曜石文档
        </div>
        <div style="display: flex;position: absolute;right: 0">
            <div class="navigate_bar_function_item" style="max-width: 400px">
                <el-input v-model="searchKeywords"
                          placeholder="搜索当前页面"
                          @keyup.enter.native="submitSearch">
                    <el-button slot="append" icon="el-icon-search" @click="submitSearch"></el-button>
                </el-input>
            </div>
            <span style="width: 16px"></span>
            <NoticeBox class="navigate_bar_function_item"/>
            <span style="width: 10px"></span>
            <div class="menubar_username navigate_bar_function_item" @click="toUserCenter">
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
	import SearchResult from "./SearchResult.vue"
    import NoticeBox from "@/components/NoticeBox";

    export default {
        name: "MenuBar",
        components: {NoticeBox, SearchResult},
        props: {
            hide: Number,
			test: String,
			docList: Array,
			docType: String,
        },
        data() {
            return {
                searchKeywords: "",
                visible: false,
                resultList: [],
                spaceType: ''
            };
        },
        created() {
            updateStatus()

            if (this.docType === 'isDefault') {
                this.spaceType = '工作台中'
            } else if (this.docType === 'isCollection') {
                this.spaceType = '收藏夹中'
            } else if (this.docType === 'isTrash') {
                this.spaceType = '回收站中'
            } else if (this.docType === 'isHistory') {
                this.spaceType = '浏览历史中'
            }
        },
        computed: {
            username() {
                return this.$store.getters.getUsername
            },
            avatarUrl() {
                return this.$store.getters.getUserAvatar
            }
        },
        methods: {
            toUserCenter() {
                this.$router.push({
                    name: 'UserCenter'
                })
            },
            submitSearch: function () {
                console.log('正在搜索' + this.searchKeywords);
                this.resultList = []

                for (let i = 0; i < this.docList.length; i++) {
                    if (this.docList[i].title.indexOf(this.searchKeywords) != -1) {
                        this.resultList.push(this.docList[i])
                    }
                }

                this.visible = true
            },
        },
        watch: {
            $route() {
                this.username = this.$store.getters.getUsername;
                this.avatarUrl = this.$store.getters.getUserAvatar;
            },
            docType() {
                if (this.docType === 'isDefault') {
                    this.spaceType = '工作台中'
                } else if (this.docType === 'isCollection') {
                    this.spaceType = '收藏夹中'
                } else if (this.docType === 'isTrash') {
                    this.spaceType = '回收站中'
                } else if (this.docType === 'isHistory') {
                    this.spaceType = '浏览历史中'
                }
            }
        }
    };
</script>

<style>
    .navigate_bar_function_item {
    }

    .navigate_bar {
        display: flex;
        position: fixed;
        background: rgb(220, 220, 220);
        border: 0;
        width: 100%;
        z-index: 3;
        padding-top: 5px;
        padding-bottom: 5px;
        box-shadow: 2px 2px 5px 1px rgb(200, 200, 200);
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