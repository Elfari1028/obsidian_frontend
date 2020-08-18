<template>
	<div>

		<el-card class="doc_item">
			
			<div slot="header" style="height: 20px">
				<i class="el-icon-document" style="float: left"></i>
				
				<span class="card_header_font" @click="toDocument(doc.doc_id)">{{doc.title}}</span>
				
				<el-dropdown trigger="click" style="float: right">
					
					<span class="el-dropdown-link" style="font-weight: bold;cursor: pointer">
						<i class="el-icon-more"></i>
					</span>
					
					<el-dropdown-menu slot="dropdown">
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
import Config from "@/config";
	
export default {
	name: 'DocumentCardforGroupTrash',
	props: {
		doc: Object,
	},
	methods: {
		toDocument(doc_id) {
			console.log(doc_id)
			this.$router.push({
				path: '/document',
				params: {
					doc_id: doc_id
				}
			})
		},
		restoreDocument(doc_id) {
			console.log(doc_id)
			this.$axios.post('bin/recover_doc', JSON.stringify({doc_id: doc_id}),Config.axiosHeaders).then(res => {
				if (res.data.success) {
					this.$alert("文件已恢复")
				} else {
					this.$alert(res.data.exc)
				}
			})
		},
		delDocument(doc_id) {
			console.log(doc_id)
			this.$confirm('此操作将永久删除文档，是否继续？', '警告', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: "warning"
			}).then(() => {
				this.$axios.post('bin/delete_doc', JSON.stringify({doc_id: doc_id}),Config.axiosHeaders).then(res => {
					if (res.data.success) {
						this.$alert("文件已删除")
					} else {
						this.$alert(res.data.exc)
					}
				}).catch(err => {
					console.log(err)
					this.$alert('网络出现了点问题')
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			})
		
		},
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
        float: left;
        width: 45%;
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

<style>
    .el-card__body {
        padding: 8px 10px !important;
    }

    .el-card__header {
        padding: 5px 15px !important;
    }

    body .el-scrollbar__wrap {
        overflow-x: hidden;
    }
</style>
