<template>
    <div>
        <el-container>
            <el-header style="padding: 0">
                <MenuBar :docList='searchList' :docType='docType'/>
            </el-header>

            <el-container>

                <!-- 左边栏 -->
                <el-aside width="225px" id="aside_left">
                    <AsideMenu/>
                </el-aside>

                <!-- 主界面 -->
                <el-main v-if='!isTrashCan' :style="{height: spaceHeight}">

                    <el-scrollbar style="height: 100%">
                        <DocumentCard v-for="(doc,index) in docList" :key="index" :doc="doc" :doc-type="'isDefault'"/>
                    </el-scrollbar>

                </el-main><!--主体-->

                <!-- 回收站 -->
                <el-main v-if='isTrashCan' :style="{height: spaceHeight}">
                    <el-scrollbar style="height: 100%">
                        <DocumentCard v-for="(doc,index) in trashList" :key="index" :doc="doc" :doc-type="'isTrash'"/>
                    </el-scrollbar>
                </el-main>

                <!-- 右边栏 -->
                <el-aside width="250px" id="aside_right">
                    <div id="bench_toolbar">
                        <div id="toolbar_title">{{Team_name}}</div>

                        <el-divider></el-divider>

                        <el-popover
                                placement="left"
                                trigger="click"
                        >

                            <MemberCard :Team_id='Team_id'></MemberCard>

                            <el-button slot="reference">团队成员</el-button>
                        </el-popover>
                        <br><br>
                        <el-popover
                                placement="left"
                                trigger="click"
                        >

                            <GroupManage :Team_id='Team_id'></GroupManage>

                            <el-button slot="reference">团队管理</el-button>
                        </el-popover>

                        <el-divider></el-divider>

                        <DocumentSorter :doc-list="isTrashCan?trashList:docList" :sortResult="handleSort"/>

                        <br><br>

                        <el-button id="trashCanButton" type="info" @click='switchTrashCan'>
                            <i class='el-icon-delete-solid'></i>
                            切换到团队回收站
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
    import MemberCard from "@/components/MemberCard.vue"
    import GroupManage from "@/components/GroupManage.vue"
    import $ from 'jquery'
    import DocumentSorter from "@/components/DocumentSorter";
    import DocumentCard from "@/components/DocumentCard";

    export default {
        name: "TeamSpace",
        components: {DocumentCard, DocumentSorter, AsideMenu, MenuBar, MemberCard, GroupManage},
        inject: ['reload'],
        data() {
            return {
                Team_id: -1,
                Team_name: '火锅小分队',
                isScreenWide: false,
                dialogVisible: false,
                isTrashCan: false,
                shareUrl: '',
                spaceHeight: window.innerHeight - 80 + 'px',
                searchList: [],
                docType: 'isDefault',
                docList: [
                    {
                        doc_id: 3321,
                        title: '团队空间b',
                        team_id: 55443,
                        workspace: 'TEAM_DEBUG',
                        time: '2020/8/10 20:03:02'
                    },
                    {
                        doc_id: 3321,
                        title: '团队空间a',
                        team_id: 55443,
                        workspace: 'TEAM_DEBUG',
                        time: '2020/8/01 20:03:02'
                    },
                    {
                        doc_id: 3321,
                        title: '团队空间j',
                        team_id: 55443,
                        workspace: 'TEAM_DEBUG',
                        time: '2020/9/10 20:03:02'
                    },
                    {
                        doc_id: 3321,
                        title: '团队空间f',
                        team_id: 55443,
                        workspace: 'TEAM_DEBUG',
                        time: '2020/8/10 20:04:02'
                    },
                    {
                        doc_id: 3321,
                        title: '团队空间w',
                        team_id: 55443,
                        workspace: 'TEAM_DEBUG',
                        time: '2020/8/11 20:03:02'
                    },
                ],
                trashList: [
                    {
                        doc_id: 3321,
                        title: '团队回收站adsv',
                        team_id: 55443,
                        workspace: 'TEAM_DEBUG',
                        time: '2020/8/10 21:03:02'
                    },
                    {
                        doc_id: 3321,
                        title: '团队回收站kds',
                        team_id: 55443,
                        workspace: 'TEAM_DEBUG',
                        time: '2020/8/10 20:03:02'
                    },
                    {
                        doc_id: 3321,
                        title: '团队回收站sds',
                        team_id: 55443,
                        workspace: 'TEAM_DEBUG',
                        time: '2020/8/10 20:03:03'
                    },
                ]
            }
        },
        methods: {
            loadDocList: function () {
                var _this = this
                console.log('正在获取团队文件')
                this.$axios
                    .post('doc/list_all_team_docs', JSON.stringify({
                        team_id: _this.Team_id
                    }))
                    .then(response => {
                        var res = response.data
                        _this.docList = res.doc_list

                        if (res.success === false) {
                            _this.$message.error(res.exc)
                        }
                    })
                    .catch(err => {
                        _this.$message.error('获取团队文件出了点问题')
                        console.log(err)
                    })
            },
            loadTrashList: function () {
                var _this = this
                console.log('正在获取团队回收站文件')
                this.$axios
                    .post('bin/get-team-docs', JSON.stringify({
                        team_id: _this.Team_id
                    }))
                    .then(response => {
                        var res = response.data
                        _this.trashList = res.doc_list

                        if (res.success === false) {
                            _this.$message.error(res.exc)
                        }
                    })
                    .catch(err => {
                        _this.$message.error('获取团队回收站文件出了点问题')
                        console.log(err)
                    })
            },
            switchTrashCan: function () {
                if (!this.isTrashCan) {
                    //获取回收站文件

                    this.loadTrashList()
                    this.searchList = this.trashList
                    this.docType = "isTrash"
                } else {
                    //获取团队文件

                    this.loadDocList()
                    this.searchList = this.docList
                    this.docType = "isDefault"
                }

                this.isTrashCan = !this.isTrashCan

                document.getElementById('trashCanButton').innerHTML = this.isTrashCan == true ? "<i class='el-icon-menu'></i>切换到团队主页面" : "<i class='el-icon-delete-solid'></i>切换到团队回收站"
            },
            handleSort(data) {
                this.docList = data
            },
        },
        created() {
            this.Team_id = this.$route.params.Team_id

            //获取团队名称
            var _this = this
            console.log('正在获取团队名称')
            this.$axios
                .post('teamwork/get_team_name/', JSON.stringify({
                    team_id: _this.Team_id
                }))
                .then((response) => {
                    var res = response.data
                    _this.Team_name = res.team_name

                    if (res.success === false) {
                        _this.$message.error(res.exc)
                    }
                })
                .catch(err => {
                    _this.$message.error('获取团队名称出了点问题')
                    console.log(err)
                })

            //获取团队文件
            this.loadDocList()

            this.searchList = this.docList
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
        },
        beforeRouteUpdate(to, from, next) {
            console.log(to, from, next)
            next()
            this.reload()
        },
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

    #aside_left {
        border-right: 1px solid #DEDFE6;
        height: auto;
        padding: 10px;
    }

</style>