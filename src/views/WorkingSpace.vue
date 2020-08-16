<template>
    <div class="main_page">
        <el-container>
            <el-header style="padding: 0">
                <MenuBar :docList='docList' docType='isDefault'/>
            </el-header>
            <el-container>
                <el-aside width="225px" id="aside_left">
                    <AsideMenu/>
                </el-aside><!--左边栏-->
                <el-main :style="{height: spaceHeight}" v-loading="isLoading" :disabled="isLoading">
                    <el-scrollbar style="height: 100%">
                        <DocumentCard v-for="(doc,index) in docList" :key="index" :doc="doc" :doc-type="'isDefault'"/>
                        <div v-if="docList.length===0 && !isLoading" class="list_empty_notice">工作台空空如也</div>
                    </el-scrollbar>
                </el-main><!--主体-->
                <el-aside width="250px" id="aside_right">
                    <div id="bench_toolbar">
                        <div id="toolbar_title">我的文档</div>
                        <el-divider></el-divider>
                        <el-button size="small" type="info" circle
                                   icon="el-icon-refresh"
                                   @click="updateList"></el-button>
                        <el-button size="small" type="info" @click="openCreateDocPopup"
                                   round icon="el-icon-plus">新建文档</el-button>
							
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
            <CreateDocPopup ref="create_doc" />
        </el-container>
    </div>

</template>

<script>
    import MenuBar from "@/components/MenuBar";
    import AsideMenu from "@/components/AsideMenu";
    import CreateDocPopup from "@/components/CreateDocPopup"
    import $ from 'jquery'
    import DocumentCard from "@/components/DocumentCard";

    export default {
        name: "WorkingSpace",
        components: {DocumentCard, AsideMenu, MenuBar,"CreateDocPopup":CreateDocPopup},
        data() {
            return {
                isScreenWide: false,
                isLoading: false,
                spaceHeight: window.innerHeight - 80 + 'px',
                docList: []
            }
        },
        methods: {
            openCreateDocPopup(){
                this.$refs.create_doc.openDialog();
            },
            updateList() {
                this.isLoading = true
                this.$axios.get('doc/list_all_my_docs/').then(res => {
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
                            title: '个人工作台' + i,
                            team_id: 55443,
                            workspace: 'TEAM_DEBUG',
                            time: '2020/8/10 20:03:' + i
                        })
                    }
                    this.isLoading = false;
                })
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

    .list_empty_notice{
        color: darkgrey;
        height: inherit;
        padding-top: 20%;
    }
</style>