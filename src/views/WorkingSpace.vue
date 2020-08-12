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
                <el-aside width="200px" id="aside_left">
                    <AsideMenu/>
                </el-aside><!--左边栏-->
                <el-main :style="{height: spaceHeight}">
                    <el-scrollbar style="height: 100%">
                        <el-card class="doc_item" v-for="(doc,index) in docList" :key="index"
                                 @click="toDocument(doc.doc_id)">
                            <div slot="header" style="height: 10px">
                                <i class="el-icon-document" style="float: left"></i>
                                <span class="card_header_font">{{doc.title}}</span>
                                <el-dropdown trigger="click" style="float: right">
                                <span class="el-dropdown-link" style="font-weight: bold;cursor: pointer">
                                    ···
                                </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item @click.native="toDocument(doc.doc_id)">打开</el-dropdown-item>
                                        <el-dropdown-item @click.native="delDocument(doc.doc_id)"
                                                          style="color: #ff0000">删除
                                        </el-dropdown-item>
                                        <el-dropdown-item @click.native="shareDocument(doc.doc_id)">分享
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                            <span class="card_body_font card_body">
                            {{doc.workspace}}
                        </span>
                            <span class="card_time_font card_body">
                            最后修改于：{{doc.time}}
                        </span>
                        </el-card>
                    </el-scrollbar>
                </el-main><!--主体-->
                <el-aside width="250px" id="aside_right">
                    <div id="bench_toolbar">
                        <el-button size="small" type="info" round icon="el-icon-plus">
                            新建文档
                        </el-button>
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
        name: "WorkingSpace",
        components: {AsideMenu, MenuBar},
        data() {
            return {
                isScreenWide: false,
                dialogVisible: false,
                shareUrl: '',
                spaceHeight: window.innerHeight - 80 + 'px',
                docList: [
                    {
                        doc_id: 3321,
                        title: 'TITLE_DEBUG',
                        team_id: 55443,
                        workspace: 'TEAM_DEBUG',
                        time: '2020/8/10 20:03:02'
                    },
                    {
                        doc_id: 3321,
                        title: 'TITLE_DEBUG',
                        team_id: 55443,
                        workspace: 'TEAM_DEBUG',
                        time: '2020/8/10 20:03:02'
                    },
                    {
                        doc_id: 3321,
                        title: 'TITLE_DEBUG',
                        team_id: 55443,
                        workspace: 'TEAM_DEBUG',
                        time: '2020/8/10 20:03:02'
                    },
                    {
                        doc_id: 3321,
                        title: 'TITLE_DEBUG',
                        team_id: 55443,
                        workspace: 'TEAM_DEBUG',
                        time: '2020/8/10 20:03:02'
                    },
                    {
                        doc_id: 3321,
                        title: 'TITLE_DEBUG',
                        team_id: 55443,
                        workspace: 'TEAM_DEBUG',
                        time: '2020/8/10 20:03:02'
                    },
                    {
                        doc_id: 3321,
                        title: 'TITLE_DEBUG',
                        team_id: 55443,
                        workspace: 'TEAM_DEBUG',
                        time: '2020/8/10 20:03:02'
                    },
                    {
                        doc_id: 3321,
                        title: 'TITLE_DEBUG',
                        team_id: 55443,
                        workspace: 'TEAM_DEBUG',
                        time: '2020/8/10 20:03:02'
                    },
                    {
                        doc_id: 3321,
                        title: 'TITLE_DEBUG',
                        team_id: 55443,
                        workspace: 'TEAM_DEBUG',
                        time: '2020/8/10 20:03:02'
                    },
                    {
                        doc_id: 3321,
                        title: 'TITLE_DEBUG',
                        team_id: 55443,
                        workspace: 'TEAM_DEBUG',
                        time: '2020/8/10 20:03:02'
                    },
                    {
                        doc_id: 3321,
                        title: 'TITLE_DEBUG',
                        team_id: 55443,
                        workspace: 'TEAM_DEBUG',
                        time: '2020/8/10 20:03:02'
                    },
                    {
                        doc_id: 3321,
                        title: 'TITLE_DEBUG',
                        team_id: 55443,
                        workspace: 'TEAM_DEBUG',
                        time: '2020/8/10 20:03:02'
                    },
                    {
                        doc_id: 3321,
                        title: 'TITLE_DEBUG',
                        team_id: 55443,
                        workspace: 'TEAM_DEBUG',
                        time: '2020/8/10 20:03:02'
                    },
                    {
                        doc_id: 3321,
                        title: 'TITLE_DEBUG',
                        team_id: 55443,
                        workspace: 'TEAM_DEBUG',
                        time: '2020/8/10 20:03:02'
                    },
                    {
                        doc_id: 3321,
                        title: 'TITLE_DEBUG',
                        team_id: 55443,
                        workspace: 'TEAM_DEBUG',
                        time: '2020/8/10 20:03:02'
                    }
                ]
            }
        },
        methods: {
            toDocument(doc_id) {
                console.log(doc_id)
                this.$router.push({
                    path: ''
                })
            },
            delDocument(doc_id) {
                console.log(doc_id)
                this.$axios.post('', JSON.stringify({doc_id: doc_id})).then(res => {
                    if (res.data.success) {
                        this.$alert("文件已移入回收站")
                    } else {
                        this.$alert(res.data.exec)
                    }
                })
            },
            shareDocument(doc_id) {
                console.log(doc_id)
                this.$axios.post('', JSON.stringify({doc_id: doc_id})).then(res => {
                    if (res.data.success) {
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
            }
        },
        created() {
            console.log(this.$route.path)
            this.$axios.get('').then(res => {
                console.log(res)
                this.docList = [];
                const list = res.data.list
                for (let i = 0; i < list.length; i++) {
                    this.docList.push(list[i])
                }
            })
        },
        mounted() {
            window.onresize = () => {
                return (() => {
                    this.spaceHeight = window.innerHeight - 80 + 'px'
                    if (!this.isScreenWide && window.innerWidth > 1500) {
                        this.isScreenWide = !this.isScreenWide
                        $(".doc_item").css("width","30%")
                    }
                    if (this.isScreenWide && window.innerWidth <= 1500) {
                        this.isScreenWide = !this.isScreenWide
                        $(".doc_item").css("width","45%")
                    }
                })()
            }
        }
    }
</script>

<style scoped>
    #bench_toolbar{
        padding: 20px 0;
    }

    .main_page {
        min-width: 1200px;
    }

    #aside_left {
        border-right: 1px solid #DEDFE6;
        height: auto;
        padding: 10px;
    }

    #aside_right{
        border-left: 1px solid #DEDFE6;
        height: auto;
        padding: 10px;
    }

    .doc_item {
        display: block;
        float: left;
        width: 45%;
        height: 100px;
        margin: 10px;
    }

    .card_header_font {
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