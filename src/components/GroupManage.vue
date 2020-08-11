<template>
	<div id = 'GroupManage' :style="{height: getHeight()}">
		<div id = 'forAll'>

			<el-popover
				type="primary"
				placement="right"
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

			<el-popover
				type="primary"
				placement="right"
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
			<el-button type="success" size="small" round>允许加入申请</el-button>
			
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
	* 传入参数 Team_id = '123'
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
			visible2: false
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
						this.$message.error(res.exc)
					}
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
						this.$message.error(res.exc)
					}
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
						this.$message.error(res.exc)
					}
				})
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
						this.$message.error(res.exc)
					}
				})
		},
	},
	created () {
		console.log(this.Team_id)
		
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
