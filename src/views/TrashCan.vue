<template>
    <div class="main_page">
        <el-container>
            <el-header style="padding: 0">
                <MenuBar :docList='docList' docType='isTrash'/>
            </el-header>
            <el-container>
                <el-aside width="225px" id="aside_left">
                    <AsideMenu/>
                </el-aside><!--左边栏-->
                <el-main :style="{height: spaceHeight}" v-loading="isLoading" :disabled="isLoading">
                    <el-scrollbar style="height: 100%">
                        <DocumentCard v-for="(doc,index) in docList" :key="index" :doc="doc" :doc-type="'isTrash'"/>
                        <div v-if="docList.length===0 && !isLoading" class="list_empty_notice">回收站空空如也</div>
                    </el-scrollbar>
                </el-main><!--主体-->
                <el-aside width="250px" id="aside_right">
                    <div id="bench_toolbar">
                        <div id="toolbar_title">回收站</div>
                        <el-divider></el-divider>
                        <el-button size="small" type="info" circle
                                   icon="el-icon-refresh"
                                   @click="updateList"></el-button>
                        <el-button size="small" type="danger" @click="emptyTrash"
                                   round icon="el-icon-delete">清空
                        </el-button>

                        <br><br>

                        <DocumentSorter :doc-list="docList" :sortResult="handleSort"/>
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
    import DocumentCard from "@/components/DocumentCard";
    import DocumentSorter from "@/components/DocumentSorter";

    export default {
        name: "TrashCan",
        components: {DocumentSorter, DocumentCard, AsideMenu, MenuBar},
        data() {
            return {
                isScreenWide: false,
                isLoading: false,
                spaceHeight: window.innerHeight - 80 + 'px',
                docList: []
            }
        },
        methods: {
            updateList() {
                this.isLoading = true
                this.$axios.get('bin/get_private_docs/').then(res => {
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
                            title: '个人回收站' + i,
                            team_id: 55443,
                            workspace: 'TEAM_DEBUG',
                            time: '2020/8/10 20:03:' + i
                        })
                    }
                    this.isLoading = false;
                })
            },
            handleSort(data) {
                this.docList = data
            },
            emptyTrash() {
                this.$confirm('此操作将清空回收站中所有文件，是否继续？', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: "warning"
                }).then(() => {
                    this.$axios.get('bin/clear_all_docs/')
                        .then(res => {
                            if (res.data.success) {
                                this.docList = []
                                this.$message('回收站已清空')
                            } else {
                                this.$alert(res.data.exc)
                            }
                        }).catch(err => {
                        console.log(err)
                        this.$alert('网络出现了点问题')
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })

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
        margin: 10px;
        color: dimgray;
        font-size: 16px;
    }

    #bench_toolbar {
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

    .list_empty_notice {
        color: darkgrey;
        height: inherit;
        padding-top: 20%;
    }
</style>