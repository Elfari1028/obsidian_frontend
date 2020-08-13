<template>
	<div >
		<el-container>
			<el-header style="padding: 0">
				<MenuBar/>
			</el-header>

			<el-container>
				
				<!-- 左边栏 -->
				<el-aside width="225px" id="aside_left">
					<AsideMenu/>
				</el-aside>
				
				<el-main :style="{height: spaceHeight}">
					
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
										<el-dropdown-item @click.native="delDocument(doc.doc_id)"
															style="color: #ff0000">删除
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
	
	export default {
		name: "TeamSpace",
		components: {AsideMenu, MenuBar, MemberCard, GroupManage},
		inject:['reload'],
		data() {
			return {
				Team_id: '',
				Team_name: '火锅小分队',
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
					if (res.data.success === 0) {
						this.$alert("文件已移入回收站")
					} else {
						this.$alert(res.data.exec)
					}
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
			loadDocList: function () {
				var _this = this
				console.log('正在获取团队文件')
				this.$axios
					.post('获取团队文件接口' ,JSON.stringify({
						Team_id: _this.Team_id
					}))
					.then(response => {
					var res = response.data
					_this.docList = res.File_list
					
					if (res.success === false) {
						_this.$message.error(res.exc)
					}
					})
					.catch(err => {
						_this.$message.error('获取团队文件出了点问题')
						console.log(err)
					})
			}
		},
		created() {
			this.Team_id = this.$route.params.Team_id
			
			//获取团队名称
			var _this = this
			console.log('正在获取团队名称')
			this.$axios
				.post('获取团队名称接口', JSON.stringify({
					Team_id: _this.Team_id
				}))
				.then((response) => {
					var res = response.data
					_this.Team_name = res.Team_name
					
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