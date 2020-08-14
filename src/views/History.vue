<template>
    <div class="main_page">
        <el-dialog
                title="分享文件"
                :visible.sync="dialogVisible"
                width="500px">
            <el-input v-model="shareUrl" readonly="true" id="url_input">
                <template slot="prepend">URL:</template>
                <el-button slot="append" icon="el-icon-document" @click="copyUrl()"></el-button>
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-container>
            <el-header style="padding: 0">
                <MenuBar/>
            </el-header>
            <el-container>
                <el-aside width="225px" id="aside_left">
                    <AsideMenu/>
                </el-aside><!--左边栏-->
                <el-main :style="{height: spaceHeight}" v-loading="isLoading" :disabled="isLoading">
                    <el-scrollbar style="height: 100%">
                        <el-card class="doc_item" v-for="(doc,index) in docList" :key="index">
                            <div slot="header" style="height: 10px">
                                <i class="el-icon-document" style="float: left"></i>
                                <span class="card_header_font" @click="toDocument(doc.doc_id)">{{doc.title}}</span>
                                <el-dropdown trigger="click" style="float: right">
                                    <span class="el-dropdown-link" style="font-weight: bold;cursor: pointer">
                                        <i class="el-icon-more"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item @click.native="toDocument(doc.doc_id)">打开
                                        </el-dropdown-item>
                                        <el-dropdown-item @click.native="shareDocument(doc.doc_id)">分享
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                            <div style="cursor: pointer" @click="toDocument(doc.doc_id)">
                                <span class="card_body_font card_body">
                                    {{doc.workspace}}
                                </span>
                                <span class="card_time_font card_body">
                                    最后修改于：{{doc.time}}
                                </span>
                            </div>
                        </el-card>
                    </el-scrollbar>
                </el-main><!--主体-->
                <el-aside width="250px" id="aside_right">
                    <div id="bench_toolbar">
                        <div id="toolbar_title">最近浏览</div>
                        <el-divider></el-divider>
                        <el-button size="mini" type="info" round
                                   icon="el-icon-refresh"
                                   @click="updateList">刷新</el-button>

						<br><br>
							
						<el-dropdown trigger="click" @command="handleCommand">
							<el-button type="info">
								<i class='el-icon-s-fold'></i>
								对当前文件排序
							</el-button>
							
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command='titleUp'>按名称升序<i class='el-icon-caret-top'></i></el-dropdown-item>
								<el-dropdown-item command='titleDown'>按名称降序<i class='el-icon-caret-bottom'></i></el-dropdown-item>
								<el-dropdown-item command='timeUp'>按时间升序<i class='el-icon-caret-top'></i></el-dropdown-item>
								<el-dropdown-item command='timeDown'>按时间降序<i class='el-icon-caret-bottom'></i></el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
						
                    </div>
                </el-aside>
            </el-container>
        </el-container>
    </div>

</template>

<script>
    import MenuBar from "@/components/MenuBar";
    import AsideMenu from "@/components/AsideMenu";
    import $ from 'jquery'

    export default {
        name: "History",
        components: {AsideMenu, MenuBar},
        data() {
            return {
                isScreenWide: false,
                dialogVisible: false,
                isLoading: false,
                shareUrl: '',
                spaceHeight: window.innerHeight - 80 + 'px',
                docList: []
            }
        },
        methods: {
            updateList() {
                this.isLoading = true
                this.$axios.get('').then(res => {
                    console.log(res)
                    this.docList = []
                    const list = res.data.list
                    for (let i = 0; i < list.length; i++) {
                        this.docList.push(list[i])
                    }
                    this.isLoading = false
                }).catch(err => {
                    console.log(err)
                    this.docList = []
                    this.$message('网络出了些问题')
                    for (let i = 0; i < 16; i++) {
                        this.docList.push({
                            doc_id: 3321,
                            title: 'TITLE_DEBUG' + i,
                            team_id: 55443,
                            workspace: 'TEAM_DEBUG',
                            time: '2020/8/10 20:03:' + i
                        })
                    }
                    this.isLoading = false;
                })
            },
            toDocument(doc_id) {
                console.log(doc_id)
                this.$router.push({
                    path: ''
                })
            },
            shareDocument(doc_id) {
                console.log(doc_id)
                this.$axios.post('', JSON.stringify({doc_id: doc_id})).then(res => {
                    if (res.data.success === 0) {
                        this.shareUrl = res.data.url;
                        this.dialogVisible = true;
                    }
                }).catch(err => {
                    console.log(err)
                    this.shareUrl = 'TEST_URL'
                    this.dialogVisible = true;
                })
            },
            copyUrl() {
                const e = document.getElementById('url_input');
                e.select();
                document.execCommand("Copy");

                this.$message({
                    message: "链接已复制成功",
                    type: 'warning'
                });
            },
			sortDocList: function (list, method) {
				if (method === 'titleDown') {
					list.sort(function(a,b){
						var x = a.title.toLowerCase()
						var y = b.title.toLowerCase()
						if (x > y) {return -1}
						if (x < y) {return 1}
						return 0
					})
				} else if (method === 'titleUp') {
					list.sort(function(a,b){
						var x = a.title.toLowerCase()
						var y = b.title.toLowerCase()
						if (x < y) {return -1}
						if (x > y) {return 1}
						return 0
					})
				}
				
				if (method === 'timeDown') {
					list.sort(function(a,b){
						var x = new Date(a.time)
						var y = new Date(b.time)
						if (x < y) {return -1}
						if (x > y) {return 1}
						return 0
					})
				} else if (method === 'timeUp') {
					list.sort(function(a,b){
						var x = new Date(a.time)
						var y = new Date(b.time)
						if (x > y) {return -1}
						if (x < y) {return 1}
						return 0
					})
				}
			},
			handleCommand: function (command) {
				this.sortDocList(this.docList, command)
			}
        },
        created() {
            console.log(this.$route.path)
            this.updateList()
        },
        mounted() {
            window.onresize = () => {
                return (() => {
                    this.spaceHeight = window.innerHeight - 80 + 'px'
                    if (!this.isScreenWide && window.innerWidth > 1500) {
                        this.isScreenWide = !this.isScreenWide
                        $(".doc_item").css("width", "30%")
                    }
                    if (this.isScreenWide && window.innerWidth <= 1500) {
                        this.isScreenWide = !this.isScreenWide
                        $(".doc_item").css("width", "45%")
                    }
                })()
            }
        }
    }
</script>

<style scoped>
    #toolbar_title {
        display: inline;
        margin: 10px;
        color: dimgray;
        font-size: 16px;
        width: 50%;
    }

    #bench_toolbar {
        margin-top: 10px;
    }

    .main_page {
        min-width: 1200px;
    }

    #aside_left {
        border-right: 1px solid #DEDFE6;
        height: auto;
        padding: 10px;
    }

    #aside_right {
        border-left: 1px solid #DEDFE6;
        height: auto;
        padding: 10px;
    }

    .doc_item {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: block;
        float: left;
        width: 45%;
        height: 100px;
        margin: 10px;
    }

    .card_header_font {
        cursor: pointer;
        font-size: 16px;
        color: dimgray;
    }

    .card_body {
        display: block;
        margin: 5px;
    }

    .card_time_font {
        font-size: 10px;
        color: dimgray;
    }

    .card_body_font {
        color: dimgray;
    }
</style>

<style>
    .el-card__body {
        padding: 8px 5px !important;
    }

    .el-card__header {
        padding: 15px !important;
    }

    body .el-scrollbar__wrap {
        overflow-x: hidden;
    }
</style>