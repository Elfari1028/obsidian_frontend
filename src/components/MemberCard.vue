<template>
	<div id = 'MemberCard' v-bind:style="{width: getWidth()}">

		<el-table
			:data="tableData"
			id = 'MemberTable'
			>
			
			<el-table-column
				label="头像"
				width="80px"
				>

				<template slot-scope="scope">
					<el-avatar >
						<img :src="scope.row.avatar" style="width: 100%; height: 100%;">
					</el-avatar>
				</template>

			</el-table-column>
			
			<el-table-column
				label="昵称"
				width="80px"
				prop="name"
				>
			</el-table-column>
			
			<el-table-column
				label="身份"
				width="80px"
				prop="status"
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
						@click="deleteMember(scope.$index, scope.row)">踢出</el-button>
				</template>
			</el-table-column>
			
		</el-table>
	</div>
</template>

<script>
export default {
	name: 'MemberCard',
	data () {
		return {
			tableData: [{
				User_id: 1,
				avatar: require('../assets/loading/avatar/1.jpg'),
				name: 'Song',
				status: '管理员'
			}, {
				User_id: 2,
				avatar: require('../assets/loading/avatar/2.jpg'),
				name: 'Never',
				status: '成员'
			}],
			isAdmin: true
		}
	},
	methods: {
		deleteMember: function (index, row) {
			var info = {
				index: index,
				row: row
			}
			console.log(info)
		},
		getWidth: function () {
			if (this.isAdmin) {
				return '320px'
			} else {
				return '240px'
			}
		}
	}
}
</script>

<style scoped>
#MemberTable {
	/* outline:#00ff00 dotted thick; */
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
</style>
