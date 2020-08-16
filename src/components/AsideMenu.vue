<template>
    <div class="aside_menu">
        <el-menu :default-active="$route.path"
                 active-text-color="#1A1A1A"
                 text-color="#5E5E5E"
                 @open="getTeamList"
                 @close="handleClose"
                 router
                 mode="vertical">
            <el-menu-item index="/WorkingSpace">
                <i class="el-icon-menu"></i>
                <span slot="title">工作台</span>
            </el-menu-item>
            <el-menu-item index="/History">
                <i class="el-icon-s-order"></i>
                <span slot="title">最近浏览</span>
            </el-menu-item>
            <el-menu-item index="/Collections">
                <i class="el-icon-s-management"></i>
                <span slot="title">我的收藏</span>
            </el-menu-item>

            <el-divider class="divider"></el-divider>

            <el-submenu index="/TeamSpace" :disabled="isLoading">
                <template slot="title">
                    <i class="el-icon-s-grid"></i>
                    <span>团队空间</span>
                </template>

                <el-menu-item-group v-loading="isLoading">
                    <div v-if="isLoading" style="height: 50px;width: 100%"></div>
                    <span v-for="Team in Team_list" :key=Team.Team_id>
                        <el-menu-item v-bind:index="'/TeamSpace/'+Team.team_id">{{ Team.team_name }}</el-menu-item>
					</span>
					
                    <span v-if="Team_list.length===0">
						
						<el-popover
							placement="right"
							trigger="click"
							>
							
							<GroupInit></GroupInit>
							
							<el-button slot="reference" size="small">加入新团队</el-button>
							
						</el-popover>
					</span>
					
                </el-menu-item-group>

            </el-submenu>

            <el-menu-item index="/TrashCan">
                <i class="el-icon-delete-solid"></i>
                <span slot="title">个人回收站</span>
            </el-menu-item>

            <el-divider class="divider"></el-divider>

            <el-menu-item index="/UserCenter">
                <i class="el-icon-user-solid"></i>
                <span slot="title">个人中心</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
	import GroupInit from './GroupInit.vue'	
    export default {
        name: "AsideMenu",
		components: {
			GroupInit
		},
		data () {
			return {
				Team_list: [
					{
						team_id: 123,
						team_name: '火锅小分队'
					},
					{
						team_id: 234,
						team_name: '烧烤小分队'
					}
				],
				User_id: '',
				isLoading: false,
			}
		},
        methods: {
            handleOpen() {
                console.log(this.$route.path)
            },
            handleClose() {

            },
            /*
			loadTeamList: function () {
				console.log('加载团队列表')
				
				var _this = this
				
				this.$axios
					.post('获取团队列表接口', JSON.stringify({
						User_id: _this.User_id
					}))
					.then((response) => {
						var res = response.data
						
						_this.Team_list = res.Team_list
						
						if (res.success === false) {
							_this.$message.error(res.exc)
						}
					})
					.catch(err => {
						_this.$message.error('获取团队列表出了点问题')
						console.log(err)
					})
				
			},*/
			getTeamList() {
                console.log('获取团队列表')
                this.isLoading = true
                this.$axios.get('account/get_my_teams/').then(res => {
                    console.log(res.data)
                    this.Team_list = res.data.list
                    this.isLoading = false
                }).catch(err => {
                    console.log(err)
                    this.$message('请检查网络')
                    this.isLoading = false
                })
            }
        },
        created() {
            /*
            console.log(this.$route.path)
			
			var _this = this
			
			//获得当前用户id
			this.$axios
				.get('获得当前用户id接口')
				.then((response) => {
					var res = response.data
			
					_this.User_id = res.User_id
					if (res.success === false) {
						_this.$message.error(res.exc)
					}
				})
				.catch(err => {
					_this.$message.error('获得当前用户id接口出了点问题')
					console.log(err)
				})
				
			//加载团队列表
			this.loadTeamList()
             */
        },
    }
</script>

<style>
    .aside_menu {
    }

    .divider {
        margin: 5px 0 !important;
    }

    .el-menu {
        border: 0 !important;
    }
</style>