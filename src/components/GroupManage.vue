<template>
	<div id = 'GroupManage' :style="{height: getHeight()}">
		<div id = 'forAll'>
			<el-divider content-position="left">当前团队ID</el-divider>
			<center><h3>{{Team_id}}</h3></center>
			
			<el-divider content-position="left">个人团队管理</el-divider>
		
			<!-- 邀请新成员 -->
			<el-popover
				placement='bottom'
				trigger="click"
				style="margin: 6px;"
				v-model="visible1"
				>
				
				<el-input v-model="inputUID" placeholder="请输入邀请的成员ID"></el-input>
				<center>
				<br>
				<el-button type="primary" size="mini" @click="inviteNewMember">确定</el-button>
				</center>
				
				<el-button slot="reference" type="primary" size="small">邀请新的成员</el-button>

			</el-popover>

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
		
			<br><br>
		
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
					
			<!-- 退出当前团队 -->
			<el-popconfirm
				title="确定退出当前团队吗？"
				style="margin: 6px;"
				@onConfirm="quitTeam"
				>
				
				<el-button slot="reference" type="danger" size="small">退出当前团队</el-button>
			
			</el-popconfirm>
	
			<br><br>
		
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
		
		<div v-if="isAdmin" id = 'forAdmin'>
			
			<el-divider content-position="left">当前团队管理</el-divider>
			
			<!-- 查看加入申请 -->
			<el-popover
				placement='bottom'
				trigger="click"
				style="margin: 6px;"
				v-model="visible3"
				>
				
				<el-table
					:data="ApplyUserData"
					id = 'requestPeopleTable'
					>
					
					<el-table-column
						label="头像"
						width="80px"
						>
				
						<template slot-scope="scope">
							<el-avatar >
								<img :src="scope.row.user_avatar" style="width: 100%; height: 100%;">
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
						v-if="isAdmin"
						label="操作"
						width="190px"
						>
						<template slot-scope="scope">
							<el-button
								size="mini"
								type="success"
								@click='allowMember(scope.row.user_id)'
								>允许加入</el-button>
							<el-button
								size="mini"
								type="danger"
								@click='denyMember(scope.row.user_id)'
								>拒绝加入</el-button>
						</template>
					</el-table-column>
					
				</el-table>
				
				<el-button slot="reference" type="success" size="small" @click='loadApplyUserData' round>查看加入申请</el-button>
			
			</el-popover>
			
			<!-- 解散当前团队 -->
			<el-popconfirm
				title="确定解散当前团队吗？"
				style="margin: 6px;"
				@onConfirm="dismissTeam"
				>
				
				<el-button slot="reference" type="danger" size="small" round>解散当前团队</el-button>
			
			</el-popconfirm>
			
		</div>

	</div>
</template>

<script>
	/*
	* 
	* 传入参数如 Team_id = '123'
	* 
	* 
	*/
export default{
	name: 'GroupManage',
	props: ['Team_id'],
	data () {
		return {
			isAdmin: true,
			User_id: -1,
			inputUID: '',
			inputTID: '',
			inputTName: '',
			visible1: false,
			visible2: false,
			visible3: false,
			visible4: false,
			visible5: false,
			ApplyUserData: [],
			invitationData: []
		}
	},
	methods: {
		getHeight: function () {
			if (this.isAdmin) {
				return '350px'
			} else {
				return '255px'
			}
		},
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
		inviteNewMember: function () {
			
			console.log('邀请成员，成员ID：'+this.inputUID)
			
			this.visible1 = false
			var _this = this
			
			this.$axios
				.post('teamwork/invite_members/', JSON.stringify({
					team_id: _this.Team_id,
					user_id: parseInt(_this.inputUID),
					inviter_id: _this.User_id
				}))
				.then((response) => {
					var res = response.data
					
					if (res.success === false) {
						_this.$message.error(res.exc)
					} else {
						_this.$message.success('邀请成功')
					}
				})
				.catch(err => {
					_this.$message.error('邀请成员出了点问题')
					console.log(err)
				})
				
			this.inputUID = ''
		},
		applyForNewTeam: function () {
			
			console.log('申请团队，团队id：'+this.inputTID)
			
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
		quitTeam: function () {
			console.log('退出团队')
			
			var _this = this
			
			this.$axios
				.post('teamwork/remove_member/', JSON.stringify({
					team_id: _this.Team_id,
					user_id: _this.User_id
				}))
				.then((response) => {
					var res = response.data
					
					if (res.success === false) {
						_this.$message.error(res.exc)
					} else {
						_this.$message.success('已退出团队')
					}
				})
				.catch(err => {
					_this.$message.error('退出团队出了点问题')
					console.log(err)
				})
				
			this.$router.push('/WorkingSpace')
		},
		dismissTeam: function () {
			console.log('解散团队')
			
			var _this = this
			
			this.$axios
				.post('teamwork/disband/', JSON.stringify({
					team_id: _this.Team_id,
				}))
				.then((response) => {
					var res = response.data
					
					if (res.success === false) {
						_this.$message.error(res.exc)
					} else {
						_this.$message.success('已解散团队')
					}
				})
				.catch(err => {
					_this.$message.error('解散团队出了点问题')
					console.log(err)
				})
				
			this.$router.push('/WorkingSpace')
		},
		allowMember: function (User_id) {
			
			var _this = this
			
			this.visible3 = false
			
			console.log('同意用户id：' + User_id + '进入团队')
			
			this.$axios
				.post('teamwork/deal_with_application/', JSON.stringify({
					team_id: _this.Team_id,
					user_id: User_id,
					accepted: true
				}))
				.then((response) => {
					var res = response.data
					
					if (res.success === false) {
						_this.$message.error(res.exc)
					} else {
						_this.$message.success('已同意成员进入')
					}
				})
				.catch(err => {
					_this.$message.error('同意成员进入出了点问题')
					console.log(err)
				})
		},
		denyMember: function (User_id) {
			var _this = this
			
			this.visible3 = false
			
			console.log('拒绝用户id：' + User_id + '进入团队')
			
			this.$axios
				.post('teamwork/deal_with_application/', JSON.stringify({
					team_id: _this.Team_id,
					user_id: User_id,
					accepted: false
				}))
				.then((response) => {
					var res = response.data
					
					if (res.success === false) {
						_this.$message.error(res.exc)
					} else {
						_this.$message.success('已拒绝成员进入')
					}
				})
				.catch(err => {
					_this.$message.error('拒绝成员进入出了点问题')
					console.log(err)
				})
		},
		loadApplyUserData: function () {
			var _this = this 
			
			console.log('正在获取申请人员列表')
			
			this.$axios
				.post('teamwork/list_applications/', JSON.stringify({
					team_id: _this.Team_id
				}))
				.then((response) => {
					var res = response.data
					
					_this.ApplyUserData = res.user_list
					
					if (res.success === false) {
						_this.$message.error(res.exc)
					}
				})
				.catch(err => {
					_this.$message.error('获取申请人员列表出了点问题')
					console.log(err)
				})
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
							_this.$message.error(res.exc)
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
#GroupManage {
	/* outline:#00ff00 dotted thick; */
	padding: 1px;
	width: 232px;
	/* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) */
}
</style>
