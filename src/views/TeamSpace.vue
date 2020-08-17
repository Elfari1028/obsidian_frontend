<template>
	<div >
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
						<div v-if="docList.length===0 && !isLoading" class="list_empty_notice">回收站空空如也</div>
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
	import $ from 'jquery'
	import config from "@/config";
	
	export default {
		name: "TeamSpace",
		components: {AsideMenu, MenuBar, MemberCard, GroupManage, DocumentCard, DocumentCardforGroupTrash},
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
			toDocument(doc_id) {
				console.log(doc_id)
				this.$router.push({
					path: ''
				})
			},
			delDocument(doc_id) {
				console.log(doc_id)
				this.$axios.post('', JSON.stringify({doc_id: doc_id}),config.axiosHeaders).then(res => {
					if (res.data.success === 0) {
						this.$alert("文件已移入回收站")
					} else {
						this.$alert(res.data.exc)
					}
				})
			},
			restoreDocument(doc_id) {
				console.log(doc_id)
				this.$axios.post('', JSON.stringify({doc_id: doc_id}),config.axiosHeaders).then(res => {
					if (res.data.success === 0) {
						this.$alert("文件已恢复")
					} else {
						this.$alert(res.data.exc)
					}
				})
			},
			shareDocument(doc_id) {
				console.log(doc_id)
				this.$axios.post('', JSON.stringify({doc_id: doc_id}),config.axiosHeaders).then(res => {
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
						_this.docList = res.doc_list
						
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
					.post('bin/get-team-docs' ,JSON.stringify({
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
				
				document.getElementById('trashCanButton').innerHTML = this.isTrashCan==true ? "<i class='el-icon-menu'></i>切换到团队主页面" : "<i class='el-icon-delete-solid'></i>切换到团队回收站"
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
				if (this.isTrashCan) {
					this.sortDocList(this.trashList, command)
				} else {
					this.sortDocList(this.docList, command)
				}
			}
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
		beforeRouteUpdate (to, from, next) {
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

</style>