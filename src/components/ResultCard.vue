<template>
	<div>

		<el-card class="doc_item">
			
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
		
	</div>
</template>

<script>
	/*
	* 传入参数
	* isTrash: 是否在回收站里
	* isCollection: 是否在收藏夹里
	* doc: 文件信息
	* 默认为false
	*/
	
export default {
	name: 'ResultCard',
	props: {
		isTrash: {
			type: Boolean,
			default: false
		},
		isCollection: {
			type: Boolean,
			default: false
		},
		doc: Object
	},
	data () {
		return {
			// doc: {
			// 	doc_id: 3321,
			// 	title: 'TITLE_DEBUG',
			// 	team_id: 55443,
			// 	workspace: 'TEAM_DEBUG',
			// 	time: '2020/8/10 20:03:01'
			// }
		}
	}
}
</script>

<style scoped>
	.doc_item {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		display: block;
		/* float: left; */
		width: 400px;
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
</style>
