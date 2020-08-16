<template>
	<div>
		
		<!-- 加入新团队 -->
		<el-popover
			placement='bottom'
			trigger="click"
			style="margin: 6px;"
			v-model="visible2"
			>
			
			<el-input v-model="inputTID" placeholder="请输入加入的团队ID"></el-input>
			<center>
			<br>
			<el-button type="success" size="mini" @click="applyForNewTeam">确定</el-button>
			</center>
			
			<el-button slot="reference" type="success" size="small">加入新的团队</el-button>
		
		</el-popover>
		
		<!-- 查看加入邀请 -->
		<el-popover
			placement="bottom"
			trigger="click"
			style="margin: 6px;"
			v-model="visible4"
			>
			
			<el-table
				:data="invitationData"
				>
			
				<el-table-column
					label="团队名称"
					prop="team_name"
					width="100px"
					>
				</el-table-column>
				<el-table-column
					label="团队ID"
					prop="team_id"
					width="100px"
					>
				</el-table-column>
				<el-table-column
					label="邀请人"
					prop="user_name"
					width="100px"
					>
				</el-table-column>
				<el-table-column
					label="操作"
					width="190px"
					>
					<template slot-scope="scope">
						<el-button
							size="mini"
							type="success"
							@click='agreeInvitation(scope.row.team_id)'
							>接受邀请</el-button>
						<el-button
							size="mini"
							type="danger"
							@click='rejectInvitation(scope.row.team_id)'
							>拒绝邀请</el-button>
					</template>
				</el-table-column>
			
			</el-table>
			
			<el-button slot="reference" type="success" size="small" @click='loadInvitationData'>查看加入邀请</el-button>
			
		</el-popover>
		
		<!-- 创建新的团队 -->
		<el-popover
			placement='bottom'
			trigger="click"
			style="margin: 6px;"
			v-model="visible5"
			>
			
			<el-input v-model="inputTName" placeholder="请输入创建的团队名称"></el-input>
			<center>
			<br>
			<el-button type="primary" size="mini" @click="createNewTeam">确定</el-button>
			</center>
			
			<el-button slot="reference" type="primary" size="small">创建新的团队</el-button>
		
		</el-popover>
		
	</div>
</template>

<script>
export default {
	name: 'GroupInit',
	data () {
		return {
			User_id: -1,
			inputTID: '',
			inputTName: '',
			visible2: false,
			visible4: false,
			visible5: false,
			invitationData: [
				{
					Team_name: '前端团队',
					Team_id: 321,
					User_name: '张三'
				},
				{
					Team_name: '火锅小分队',
					Team_id: 897,
					User_name: '李四'
				}
			]
		}
	},
	methods: {
		createNewTeam: function () {
			
			console.log('创建团队：'+this.inputTName)
			
			this.visible5 = false
			var _this = this
			
			this.$axios
				.post('account/create_team/', JSON.stringify({
					user_id: _this.User_id,
					team_name: _this.inputTName
				}))
				.then((response) => {
					var res = response.data
					
					if (res.success === true) {
						_this.$message.success('创建团队成功')
						_this.$router.push('/TeamSpace/'+res.team_id)
					} else {
						_this.$message.error(res.exc)
					}
				})
				.catch(err => {
					_this.$message.error('创建团队出了点问题')
					console.log(err)
				})
			
			this.inputTName = ''
		},
		applyForNewTeam: function () {
			
			console.log('申请团队，团队id：'+parseInt(_this.inputTID))
			
			this.visible2 = false
			var _this = this
	
			this.$axios
				.post('account/apply_to_join/', JSON.stringify({
					team_id: parseInt(_this.inputTID),
					user_id: _this.User_id
				}))
				.then((response) => {
					var res = response.data
					
					if (res.success === false) {
						_this.$message.error(res.exc)
					} else {
						_this.$message.success('已发送申请')
					}
				})
				.catch(err => {
					_this.$message.error('申请加入团队出了点问题')
					console.log(err)
				})
				
			this.inputTID = ''
		},
		loadInvitationData: function () {
			var _this = this
			
			console.log('正在获取邀请列表')
			
			this.$axios
				.post('teamwork/list_my_invitations/', JSON.stringify({
					user_id: _this.User_id
				}))
				.then((response) => {
					var res = response.data
					
					_this.invitationData = res.invitation_list
					
					if (res.success === false) {
						_this.$message.error(res.exc)
					}
				})
				.catch((err) => {
					_this.$message.error('获取邀请列表出了点问题')
					console.log(err)
				})
		},
		agreeInvitation: function (Team_id) {
			var _this = this
			this.visible4 = false
			console.log('接受邀请,进入团队id：' + Team_id)
			
			this.$axios
				.post('account/deal_with_invitation/', JSON.stringify({
					team_id: Team_id,
					user_id: _this.User_id,
					accepted: true
				}))
				.then((response) => {
					var res = response.data
					
					if (res.success === false) {
						_this.$message.error(res.exc)
					} else {
						_this.$message.success('已接受邀请')
					}
				})
				.catch(err => {
					_this.$message.error('接受邀请出了点问题')
					console.log(err)
				})
		},
		rejectInvitation: function (Team_id) {
			var _this = this
			this.visible4 = false
			console.log('拒绝进入团队id：' + Team_id)
			
			this.$axios
				.post('account/deal_with_invitation/', JSON.stringify({
					team_id: Team_id,
					user_id: _this.User_id,
					accepted: false
				}))
				.then((response) => {
					var res = response.data
					
					if (res.success === false) {
						_this.$message.error(res.exc)
					} else {
						_this.$message.success('已拒绝邀请')
					}
				})
				.catch(err => {
					_this.$message.error('拒绝邀请出了点问题')
					console.log(err)
				})
		}
	},
	created () {
		console.log('this team id:' + this.Team_id)
		
		var _this = this
		
		//获得当前用户id
		this.$axios
			.get('account/my_status/')
			.then((response) => {
				var res = response.data
		
				_this.User_id = res.user_id
				if (res.success === false) {
					_this.$message.error(res.exc)
				}
			})
			.catch(err => {
				_this.$message.error('GroupInit获得当前用户id接口出了点问题')
				console.log(err)
			})
	}
}
</script>

<style>
</style>
