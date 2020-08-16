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
					
					<el-dropdown-menu v-if='isDefault' slot="dropdown">
						<el-dropdown-item @click.native="toDocument(doc.doc_id)">打开
						</el-dropdown-item>
						<el-dropdown-item @click.native="delDocument(doc.doc_id)"
										style="color: #ff0000">删除
						</el-dropdown-item>
						<el-dropdown-item @click.native="shareDocument(doc.doc_id)">分享
						</el-dropdown-item>
					</el-dropdown-menu>
					
					<el-dropdown-menu v-if='isCollection' slot="dropdown">
						<el-dropdown-item @click.native="toDocument(doc.doc_id)">打开
						</el-dropdown-item>
						<el-dropdown-item @click.native="delCollection(doc.doc_id)"
										style="color: #ff0000">移出
						</el-dropdown-item>
						<el-dropdown-item @click.native="shareDocument(doc.doc_id)">分享
						</el-dropdown-item>
					</el-dropdown-menu>
					
					<el-dropdown-menu v-if='isHistory' slot="dropdown">
						<el-dropdown-item @click.native="toDocument(doc.doc_id)">打开
						</el-dropdown-item>
						<el-dropdown-item @click.native="shareDocument(doc.doc_id)">分享
						</el-dropdown-item>
					</el-dropdown-menu>
					
					<el-dropdown-menu v-if='isTrash' slot="dropdown">
						<el-dropdown-item @click.native="restoreDocument(doc.doc_id)">恢复
						</el-dropdown-item>
						<el-dropdown-item @click.native="delDocument(doc.doc_id)"
										style="color: #ff0000">删除
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
	* docType: 'isDefault'/'isCollection'/'isTrash'/'isHistory'
	* doc: 所展示的文档
	*/
	
export default {
	name: 'ResultCard',
	props: {
		docType: String,
		doc: Object,
	},
	data () {
		return {
			isDefault: false,
			isCollection: false,
			isHistory: false,
			isTrash: false
		}
	},
	mounted() {
		console.log("docType in card "+this.docType)
		
		if (this.docType === 'isCollection') {
			this.isCollection = true
		} else if (this.docType === 'isTrash') {
			this.isTrash = true
		} else if (this.docType === 'isHistory') {
			this.isHistory = true
		} else if (this.docType === 'isDefault') {
			this.isDefault = true
		}
	},
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
