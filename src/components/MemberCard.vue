<template>
	<div id = 'MemberCard' v-bind:style="{width: getWidth()}">
		
			<el-table
				:data="Member_list"
				id = 'MemberTable'
				>
				
				<el-table-column
					label="头像"
					width="80px"
					>

					<template slot-scope="scope">
						<el-avatar style="cursor: pointer;">
							<img :src="scope.row.user_avatar" @click="toUser(scope.row.user_name);" style="width: 100%; height: 100%;">
						</el-avatar>
					</template>

				</el-table-column>
				
				<el-table-column
					label="昵称"
					width="80px"
					prop="user_name"
					>
				</el-table-column>
				
				<el-table-column
					label="身份"
					width="80px"
					prop="user_status"
					>
				</el-table-column>
				
				<el-table-column
					v-if="isAdmin"
					label="操作"
					width="80px"
					>
					<template slot-scope="scope">

					<el-popconfirm
						title="确定踢出该队员吗？"
						@onConfirm="deleteMember(scope.row.user_id)"
						>
						
						<el-button slot="reference" type="danger" size="mini">踢出</el-button>
					
					</el-popconfirm>

					</template>
				</el-table-column>
				
			</el-table>
	
	</div>
</template>

<script>
	/*
	* 
	* 传入参数如 Team_id = '123'
	* 
	* 
	*/
export default {
	name: 'MemberCard',
	props: ['Team_id'],
	data () {
		return {
			isAdmin: true,
			User_id: -1,
			Member_list: []
		}
	},
	methods: {
		toUser(username){
			this.$router.push({name:'UserInfo',params:{username:username}});
		},
		deleteMember: function (User_id) {
			console.log('删除成员id：' + User_id)
			
			var _this = this
			
			this.$axios
				.post('teamwork/remove_member/', JSON.stringify({
					team_id: _this.Team_id,
					user_id: User_id
				}))
				.then((response) => {
					var res = response.data
					
					if (res.success === false) {
						_this.$message.error(res.exc)
					} else {
						_this.$message.success('已删除成员')
					}
					
					this.loadGroupMember()
				})
				.catch(err => {
					_this.$message.error('删除成员出了点问题')
					console.log(err)
				})
				
		},
		getWidth: function () {
			if (this.isAdmin) {
				return '320px'
			} else {
				return '240px'
			}
		},
		loadGroupMember: function () {
			var _this = this
			
			console.log('正在获取团队成员')
			
			this.$axios
				.post('teamwork/members_in_team/', JSON.stringify({
					team_id: _this.Team_id
				}))
				.then((response) => {
					var res = response.data
					console.log(res)
					_this.Member_list = res.member_list
					
					if (res.success === false) {
						_this.$message.error(res.exc)
					}
				})
				.catch(err => {
					_this.$message.error('获取团队成员出了点问题')
					console.log(err)
				})
			
		},
	},
	created () {
		console.log('this team id:' + this.Team_id)
		
		var _this = this
		
		//获取团队成员
		this.loadGroupMember()
		
		//获取当前用户id
		this.$axios
			.get('account/my_status/')
			.then((response) => {
				var res = response.data
				_this.User_id = res.user_id
				if (res.success === false) {
					this.$message.error(res.exc)
				}
				
				//获取身份，设置isAdmin
				this.$axios
					.post('account/get_identity_in_team/', JSON.stringify({
						team_id: _this.Team_id,
						user_id: _this.User_id
					}))
					.then((response) => {
						var res = response.data
						
						if (res.user_status === 0) {
							_this.isAdmin = true
						} else {
							_this.isAdmin = false
						}
						
						if (res.success === false) {
							this.$message.error(res.exc)
						}
					})
					.catch(err => {
						_this.$message.error('获取成员在团队中的身份出了点问题')
						console.log(err)
					})
					
			})
			.catch(err => {
				_this.$message.error('获得当前用户id接口出了点问题')
				console.log(err)
			})
			
		
	}
}
</script>

<style scoped>
#MemberTable {
	/* outline:#00ff00 dotted thick; */
	/* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) */
}
</style>
