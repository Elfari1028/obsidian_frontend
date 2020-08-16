<template>
    <div>
        <el-dialog
                title="分享文件"
                :append-to-body="true"
                :visible.sync="dialogVisible"
                width="500px">
            <el-input v-model="shareUrl" readonly="true" id="url_input">
                <template slot="prepend">URL:</template>
                <el-button slot="append" icon="el-icon-document" @click="copyUrl()"></el-button>
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
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
                        <el-dropdown-item @click.native="toTrash(doc.doc_id)"
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
    import config from "@/config";

    export default {
        name: 'DocumentCard',
        props: {
            docType: String,
            doc: Object,
        },
        data () {
            return {
                isDefault: false,
                isCollection: false,
                isHistory: false,
                isTrash: false,
                shareUrl: '',
                dialogVisible: false
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
        methods: {
            toDocument(doc_id) {
                console.log(doc_id)
                this.$router.push({
                    path: '/document/'+doc_id
                })
            },
            delCollection(doc_id) {
                console.log(doc_id)
                this.$axios.post('', JSON.stringify({doc_id: doc_id}),config.axiosHeaders).then(res => {
                    if (res.data.success === 0) {
                        this.$alert("文档已移出收藏")
                    } else {
                        this.$alert(res.data.exec)
                    }
                })
            },
            shareDocument(doc_id) {
                console.log(doc_id)
                this.$axios.post('', JSON.stringify({doc_id: doc_id}),config.axiosHeaders).then(res => {
                    if (res.data.success === 0) {
                        this.shareUrl = res.data.url;
                        this.dialogVisible = true;
                    }
                }).catch(err => {
                    console.log(err)
                    this.shareUrl = 'TEST_URL'
                    this.dialogVisible = true;
                })
            },
            toTrash(doc_id) {
                console.log(doc_id)
                this.$axios.post('doc/put_into_recycle_bin/', JSON.stringify({doc_id: doc_id}),config.axiosHeaders).then(res => {
                    if (res.data.success === 0) {
                        this.$alert("文件已移入回收站")
                    } else {
                        this.$alert(res.data.exec)
                    }
                })
            },
            restoreDocument(doc_id) {
                console.log(doc_id)
                this.$axios.post('bin/recover-doc', JSON.stringify({doc_id: doc_id}),config.axiosHeaders).then(res => {
                    if (res.data.success === 0) {
                        this.$alert("文件已恢复")
                    } else {
                        this.$alert(res.data.exec)
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
                    this.$axios.post('bin/delete-doc', JSON.stringify({doc_id: doc_id}),config.axiosHeaders).then(res => {
                        if (res.data.success === 0) {
                            this.$alert("文件已删除")
                        } else {
                            this.$alert(res.data.exec)
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
            copyUrl() {
                const e = document.getElementById('url_input');
                e.select();
                document.execCommand("Copy");

                this.$message({
                    message: "链接已复制成功",
                    type: 'warning'
                });
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
        padding: 8px 5px !important;
    }

    .el-card__header {
        padding: 15px !important;
    }

    body .el-scrollbar__wrap {
        overflow-x: hidden;
    }
</style>
