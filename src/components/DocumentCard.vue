<template>
    <div>
        <el-dialog
                title="分享文档"
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
            <div slot="header" style="height: 20px; margin-left:10px; margin-right:10px;">
                <i class="el-icon-document" style="cursor: pointer; float: left;" @click="toDocument(doc.doc_id)"></i>
                <span class="card_header_font" @click="toDocument(doc.doc_id)">{{doc.title}}</span>
                <el-dropdown trigger="click" style="float: right">
					<span class="el-dropdown-link" style="font-weight: bold;cursor: pointer">
						<i class="el-icon-more"></i>
					</span>
                    <el-dropdown-menu v-if="this.docType==='isDefault'" slot="dropdown">
                        <el-dropdown-item @click.native="toDocument(doc.doc_id)">打开
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="toTrash(doc.doc_id)"
                                          style="color: #ff0000">删除
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="shareDocument(doc.doc_id)">分享
                        </el-dropdown-item>
                    </el-dropdown-menu>

                    <el-dropdown-menu v-if="this.docType==='isCollection'" slot="dropdown">
                        <el-dropdown-item @click.native="toDocument(doc.doc_id)">打开
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="delCollection(doc.doc_id)"
                                          style="color: #ff0000">移出
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="shareDocument(doc.doc_id)">分享
                        </el-dropdown-item>
                    </el-dropdown-menu>

                    <el-dropdown-menu v-if="this.docType==='isHistory'" slot="dropdown">
                        <el-dropdown-item @click.native="toDocument(doc.doc_id)">打开
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="shareDocument(doc.doc_id)">分享
                        </el-dropdown-item>
                    </el-dropdown-menu>

                    <el-dropdown-menu v-if="this.docType==='isTrash'" slot="dropdown">
                        <el-dropdown-item @click.native="restoreDocument(doc.doc_id,doc.team_id)">恢复
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="delDocument(doc.doc_id)"
                                          style="color: #ff0000">删除
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="card-content">
                <div style="cursor: pointer" v-if="
                this.doc.team_id!==-1 && this.context!=='isTeamSpace' && (this.doc.creator === this.$store.getters.getUsername
                ||this.context==='isWorkingSpace')"
                     @click="toTeam(doc.team_id)">
                    <el-alert style="margin-bottom:10px;" type="warning" :closable="false">
                        <div slot="title">您在「{{doc.team_name}}」团队的文档</div>
                    </el-alert>
                </div>
                <el-alert style="margin-bottom:10px;"
                          v-else-if="this.docType!=='isTrash'&&this.docType!=='isDefault'&&((this.doc.team_id!==-1&&(this.context==='isTeamSpace'||this.context==='isCollections'||this.context==='isHistory'))||(this.doc.team_id ===-1&&this.doc.creator!==userName))"
                          :closable="false" :type="doc.creator === this.$store.getters.getUsername?'success':'warning'">
                    <div slot="title">由「{{doc.creator === userName?'您':doc.creator}}」创建的文档
                    </div>
                </el-alert>
                <el-alert style="margin-bottom:10px;" v-else-if="this.docType!=='isTrash'&&this.context!=='isTeamSpace'"
                          :closable="false" type="success">
                    <div slot="title"> 个人文档</div>
                </el-alert>
                <el-alert v-if="this.docType!=='isTrash'&&this.context==='isTeamSpace'" type="info" :closable="false"
                          show-icon>
                    <div slot="title"> 创建于：{{doc.create_time}}</div>
                </el-alert>
                <el-alert v-if="this.docType!=='isTrash'" type="info" :closable="false" show-icon>
                    <div slot="title"> 最后修改于：{{doc.time}}</div>
                </el-alert>
                <el-alert v-else type="error" :closable="false" show-icon>
                    <div slot="title"> 删除于：{{doc.delete_time}}</div>
                </el-alert>
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
    import Config from "@/config";
    import {encryptData} from "@/utils/encryptUtils";

    export default {
        name: 'DocumentCard',
        props: {
            docType: String,
            doc: Object,
            context: String,
        },
        inject: ["reload"],
        data() {
            return {
                userName: this.$store.getters.getUsername,
                shareUrl: '',
                dialogVisible: false
            }
        },
        mounted() {
        },
        methods: {
            toDocument(doc_id) {
                if (this.docType === 'isTrash')
                    return
                console.log(doc_id);
                this.$router.push({
                    name: 'DocumentView',
                    params: {
                        doc_id: encryptData((doc_id).toString())
                    }
                })
            },
            delCollection(doc_id) {
                console.log(doc_id)
                this.$axios.post('favorite/cancel/', JSON.stringify({doc_id: doc_id}), Config.axiosHeaders).then(res => {
                    if (res.data.success) {
                        this.$alert("文档已移出收藏")
                    } else {
                        this.$alert(res.data.exc)
                    }
                })
            },
            shareDocument(doc_id) {
                console.log(doc_id)
                this.shareUrl = "http://" + window.location.host + "/#/document/" + encryptData((doc_id).toString());
                this.dialogVisible = true;
            },
            toTeam(team_id) {
                this.$router.push({name: 'TeamSpace', params: {Team_id: team_id}})
            },
            toTrash(doc_id) {
                console.log(doc_id)
                this.$axios.post('doc/put_into_recycle_bin/', JSON.stringify({doc_id: doc_id}), Config.axiosHeaders).then(res => {
                    if (res.data.success) {
                        if (this.doc.team_id === -1)
                            this.$alert("文档已移入个人回收站")
                        else
                            this.$alert("文档已移入团队回收站")
                        this.reload()
                    } else {
                        this.$alert(res.data.exc)
                    }
                })
            },
            restoreDocument(doc_id, team_id) {
                //console.log(doc_id)
                this.$axios.post('bin/recover_doc/', JSON.stringify({
                    doc_id: doc_id,
                    team_id: team_id
                }), Config.axiosHeaders).then(res => {
                    if (res.data.success) {
                        this.$alert("文档已恢复")
                        this.reload()
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
                    this.$axios.post('bin/delete_doc/', JSON.stringify({doc_id: doc_id}), Config.axiosHeaders).then(res => {
                        if (res.data.success) {
                            this.$alert("文件已删除")
                            this.reload()
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
        height: 50%;
        margin: 10px;
    }

    .card_header_font {
        cursor: pointer;
        font-size: 15px;
        color: dimgray;
    }

    .card_body {
        display: block;
        margin: 5px;
    }

    .card-content {
        /* background-color: grey; */
    }

    .card_time_font {
        text-align: left;
        font-size: 10px;
        color: dimgray;
    }

    .card_body_font {
        font-size: 15px;
        color: dimgray;
    }

    .el-alert--info.is-light {
        background-color: #FFFFFF;
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
