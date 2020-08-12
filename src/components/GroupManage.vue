<template>
	<div id = 'GroupManage' :style="{height: getHeight()}">
		<div id = 'forAll'>


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
				
				<el-button slot="reference" type="primary" size="small">邀请新成员</el-button>

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
				
				<el-button slot="reference" type="success" size="small">加入新团队</el-button>
			
			</el-popover>
			
			<!-- 退出当前团队 -->
			<el-popconfirm
				title="确定退出当前团队吗？"
				style="margin: 6px;"
				@onConfirm="quitTeam"
				>
				
				<el-button slot="reference" type="danger" size="small">退出当前团队</el-button>
			
			</el-popconfirm>
			
		</div>
		
		<div v-if="isAdmin" id = 'forAdmin'>
			
			<br>
			
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
						v-if="isAdmin"
						label="操作"
						width="190px"
						>
						<template slot-scope="scope">
							<el-button
								size="mini"
								type="success"
								@click='allowMember(scope.row.User_id)'
								>允许加入</el-button>
							<el-button
								size="mini"
								type="danger"
								@click='denyMember(scope.row.User_id)'
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
			User_id: '',
			inputUID: '',
			inputTID: '',
			visible1: false,
			visible2: false,
			visible3: false,
			ApplyUserData: [
				{
					User_id: 1,
					User_avatar: require('../assets/loading/avatar/1.jpg'),
					User_name: 'Song'
				},
				{
					User_id: 2,
					User_avatar: require('../assets/loading/avatar/2.jpg'),
					User_name: 'Never'
				}
			]
		}
	},
	methods: {
		getHeight: function () {
			if (this.isAdmin) {
				return '85px'
			} else {
				return '35px'
			}
		},
		inviteNewMember: function () {
			
			console.log('邀请成员，成员ID：'+this.inputUID)
			
			this.visible1 = false
			var _this = this
			
			this.$axios
				.post('添加成员接口', JSON.stringify({
					Team_id: _this.Team_id,
					User_id: _this.inputUID
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
				.post('申请加入团队接口', JSON.stringify({
					Team_id: _this.inputTID,
					User_id: _this.User_id
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
				.post('退出团队接口', JSON.stringify({
					Team_id: _this.Team_id,
					User_id: _this.User_id
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
				.post('解散团队接口', JSON.stringify({
					Team_id: _this.Team_id,
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
			
			console.log('允许用户id：' + User_id + '进入团队')
			
			this.$axios
				.post('添加团队成员接口', JSON.stringify({
					Team_id: _this.Team_id,
					User_id: User_id
				}))
				.then((response) => {
					var res = response.data
					
					if (res.success === false) {
						_this.$message.error(res.exc)
					} else {
						_this.$message.success('已允许成员进入')
					}
				})
				.catch(err => {
					_this.$message.error('添加团队成员出了点问题')
					console.log(err)
				})
				
			this.loadApplyUserData()
		},
		denyMember: function (User_id) {
			var _this = this
			
			this.visible3 = false
			
			console.log('拒绝用户id：' + User_id + '进入团队')
			
			this.$axios
				.post('拒绝加入申请接口', JSON.stringify({
					Team_id: _this.Team_id,
					User_id: User_id
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
				
			this.loadApplyUserData()
		},
		loadApplyUserData: function () {
			var _this = this 
			
			console.log('正在获取申请人员列表')
			
			this.$axios
				.post('获得申请加入的人员列表接口', JSON.stringify({
					Team_id: _this.Team_id
				}))
				.then((response) => {
					var res = response.data
					
					_this.ApplyUserData = res.User_list
					
					if (res.success === false) {
						_this.$message.error(res.exc)
					}
				})
				.catch(err => {
					_this.$message.error('获取申请人员列表出了点问题')
					console.log(err)
				})
		}
	},
	created () {
		console.log('this team id:' + this.Team_id)
		
		var _this = this
		
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
#GroupManage {
	/* outline:#00ff00 dotted thick; */
	padding: 20px;
	width: 350px;
	/* height: 85px;*/
	/* height: 35px; */
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
</style>
