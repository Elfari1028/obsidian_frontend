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
					<el-avatar >
						<img :src="scope.row.User_avatar" style="width: 100%; height: 100%;">
					</el-avatar>
				</template>

			</el-table-column>
			
			<el-table-column
				label="昵称"
				width="80px"
				prop="User_name"
				>
			</el-table-column>
			
			<el-table-column
				label="身份"
				width="80px"
				prop="User_status"
				>
			</el-table-column>
			
			<el-table-column
				v-if="isAdmin"
				label="操作"
				width="80px"
				>
				<template slot-scope="scope">
					<el-button
						size="mini"
						type="danger"
						@click="deleteMember(scope.row.User_id)">踢出</el-button>
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
			User_id: '',
			Member_list: [{
				User_id: 1,
				User_avatar: require('../assets/loading/avatar/1.jpg'),
				User_name: 'Song',
				User_status: '管理员'
			}, {
				User_id: 2,
				User_avatar: require('../assets/loading/avatar/2.jpg'),
				User_name: 'Never',
				User_status: '成员'
			}]
		}
	},
	methods: {
		deleteMember: function (User_id) {
			console.log('删除成员id：' + User_id)
			
			var _this = this
			
			this.$axios
				.post('退出团队接口', JSON.stringify({
					Team_id: _this.Team_id,
					User_id: User_id
				}))
				.then((response) => {
					var res = response.data
					
					if (res.success === false) {
						_this.$message.error(res.exc)
					} else {
						_this.$message.success('已删除成员')
					}
				})
				.catch(err => {
					_this.$message.error('删除成员出了点问题')
					console.log(err)
				})
				
			this.loadGroupMember()
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
				.post('获取团队成员接口', JSON.stringify({
					Team_id: _this.Team_id
				}))
				.then((response) => {
					var res = response.data
					
					_this.Member_list = res.Member_list
					
					if (res.success === false) {
						_this.$message.error(res.exc)
					}
				})
				.catch(err => {
					_this.$message.error('获取团队成员出了点问题')
					console.log(err)
				})
			
		}
	},
	created () {
		console.log('this team id:' + this.Team_id)
		
		var _this = this
		
		this.loadGroupMember()
		
		//获取当前用户id
		this.$axios
			.get('获得当前用户id接口')
			.then((response) => {
				var res = response.data
		
				_this.User_id = res.User_id
				if (res.success === false) {
					this.$message.error(res.exc)
				}
			})
			.catch(err => {
				_this.$message.error('获得当前用户id接口出了点问题')
				console.log(err)
			})
			
		//获取身份，设置isAdmin
		this.$axios
			.post('获取成员在团队中的身份接口', JSON.stringify({
				Team_id: _this.Team_id,
				User_id: _this.User_id
			}))
			.then((response) => {
				var res = response.data
				
				if (res.User_status === 0) {
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
	}
}
</script>

<style scoped>
#MemberTable {
	/* outline:#00ff00 dotted thick; */
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
</style>
