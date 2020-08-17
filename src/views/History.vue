<template>
    <div class="main_page">
        <el-container>
            <el-header style="padding: 0">
                <MenuBar :docList='docList' docType='isHistory'/>
            </el-header>
            <el-container>
                <el-aside width="225px" id="aside_left">
                    <AsideMenu/>
                </el-aside><!--左边栏-->
                <el-main :style="{height: spaceHeight}" v-loading="isLoading" :disabled="isLoading">
                    <el-scrollbar style="height: 100%">
                        <DocumentCard v-for="(doc,index) in docList" :key="index" :doc="doc" :doc-type="'isHistory'"/>
                        <div v-if="docList.length===0 && !isLoading" class="list_empty_notice">快去找几个文档看看</div>
                    </el-scrollbar>
                </el-main><!--主体-->
                <el-aside width="250px" id="aside_right">
                    <div id="bench_toolbar">
                        <div id="toolbar_title">最近浏览</div>
                        <el-divider></el-divider>
                        <el-button size="mini" type="info" round
                                   icon="el-icon-refresh"
                                   @click="updateHistory">刷新</el-button>

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
        name: "History",
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
            updateHistory() {
                this.isLoading = true
                this.$axios.get('doc/get_recent_read/').then(res => {
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
                            title: '最近浏览' + i,
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
            }
        },
        created() {
            console.log(this.$route.path)
            this.updateHistory()
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

    .list_empty_notice{
        color: darkgrey;
        height: inherit;
        padding-top: 20%;
    }
</style>