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
				<el-main v-if='!isTrashCan' :style="{height: spaceHeight}" v-loading="isLoading" :disabled="isLoading">

					<el-scrollbar style="height: 100%">
						<DocumentCard v-for="(doc,index) in docList" :key="index" :doc="doc" :doc-type="'isDefault'"/>
						<div v-if="docList.length===0 && !isLoading" class="list_empty_notice">工作台空空如也</div>
					</el-scrollbar>

				</el-main>

				<!-- 回收站 -->
				<el-main v-if='isTrashCan' :style="{height: spaceHeight}" v-loading="isLoading" :disabled="isLoading">
					<el-scrollbar style="height: 100%">
						<DocumentCardforGroupTrash v-for="(doc,index) in trashList" :key="index" :doc="doc"/>
						<div v-if="trashList.length===0 && !isLoading" class="list_empty_notice">回收站空空如也</div>
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

							<MemberCard :Team_id='Team_id' ref="member_card"></MemberCard>

							<el-button slot="reference">团队成员</el-button>
						</el-popover>
						<br><br>
						<el-popover
							placement="left"
							trigger="click"
							>

							<GroupManage :Team_id='Team_id' v-on:updateMemberList="updateMemberList"></GroupManage>

							<el-button slot="reference">团队管理</el-button>
						</el-popover>

						<el-divider></el-divider>

						<el-button size="small" type="info" circle
									icon="el-icon-refresh"
									@click="updateFileList"></el-button>
									
						<NewDocPopupButton :belong_to_team='true' :team_id='parseInt(Team_id)' />

						<br><br>

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
	import DocumentCard from "@/components/DocumentCard.vue"
	import DocumentCardforGroupTrash from "@/components/DocumentCardforGroupTrash.vue"
	import DocumentSorter from "@/components/DocumentSorter.vue"
	import NewDocPopupButton from "@/components/NewDocPopupButton"
	import $ from 'jquery'

	export default {
		name: "TeamSpace",
		components: {AsideMenu, MenuBar, MemberCard, GroupManage, DocumentCard, DocumentCardforGroupTrash, NewDocPopupButton, DocumentSorter},
		inject:['reload'],
		data() {
			return {
				Team_id: -1,
				Team_name: '火锅小分队',
				isScreenWide: false,
				isLoading: false,
				dialogVisible: false,
				isTrashCan: false,
				shareUrl: '',
				spaceHeight: window.innerHeight - 80 + 'px',
				searchList: [],
				docType: 'isDefault',
				docList: [],
				trashList: []
			}
		},
		methods: {
			loadDocList: function () {
				this.isLoading = true
				var _this = this
				console.log('正在获取团队文件')
				this.$axios
					.post('doc/list_all_team_docs' ,JSON.stringify({
						team_id: _this.Team_id
					}))
					.then(response => {
						var res = response.data
						_this.docList = res.list

						if (res.success === false) {
							_this.$message.error(res.exc)
						}
						_this.isLoading = false
					})
					.catch(err => {
						_this.$message.error('获取团队文件出了点问题')
						console.log(err)
						_this.isLoading = false
					})
			},
			loadTrashList: function () {
				this.isLoading = true
				var _this = this
				console.log('正在获取团队回收站文件')
				this.$axios
					.post('bin/get_team_docs' ,JSON.stringify({
						team_id: _this.Team_id
					}))
					.then(response => {
						var res = response.data
						_this.trashList = res.doc_list

						if (res.success === false) {
							_this.$message.error(res.exc)
						}
						_this.isLoading = false
					})
					.catch(err => {
						_this.$message.error('获取团队回收站文件出了点问题')
						console.log(err)
						_this.isLoading = false
					})
			},
			updateFileList: function () {
				if (this.isTrashCan) {
					this.loadTrashList()
				} else {
					this.loadDocList()
				}
			},
			updateMemberList: function () {
				this.$refs.member_card.loadGroupMember()
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
	
	#toolbar_title{
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
		-webkit-user-select:none;
		-moz-user-select:none;
		-ms-user-select:none;
		user-select:none;
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
	
	.list_empty_notice {
		color: darkgrey;
		height: inherit;
		padding-top: 20%;
	}
</style>
