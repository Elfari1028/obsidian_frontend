<template>
    <div>
        <el-container>
            <el-header style="padding: 0">
                <MenuBar/>
            </el-header>
            <el-container>
                <el-aside width="225px" id="aside_left">
                    <AsideMenu/>
                </el-aside>
                <el-container>
                    <el-main id="doc-container" v-loading="boot_loading">
                        <div id="doc-title">
                            <el-input :value="doc_title_input" v-if="title_edit_mode===true"
                                      @input="update_title_input"></el-input>
                            <div v-if="title_edit_mode===false">{{doc_title}}</div>
                        </div>
                        <div id="doc-title-edit" v-if="read_only==false">
                            <el-button id="edit-button" size="small" type="plain" v-if="title_edit_mode===false"
                                       icon="el-icon-edit" @click="title_edit_mode=true"></el-button>
                            <el-button id="edit-button" size="small" type="plain" v-if="title_edit_mode===true"
                                       icon="el-icon-check" @click="update_title"></el-button>
                            <el-button id="edit-button" size="small" type="plain" v-if="title_edit_mode===true"
                                       icon="el-icon-close" @click="cancel_update_title"></el-button>
                        </div>
                        <div id="doc-tag-container">
                            <el-tooltip class="item" effect="dark" placement="top-start"
                                        v-if="conflict_protection==true">
                                <div slot="content">正在有用户编辑这个文档。<br/>如果您认为没有他人可以编辑您的文档，您可能已在其他标签页打开编辑模式。<br/>如若没有，则请在2分钟后刷新，系统将为您解锁编辑模式。
                                </div>
                                <el-button class="doc-tag" plain size="mini" type="danger">🛑 已有编辑者占用</el-button>
                            </el-tooltip>
                            <el-button class="doc-tag" plain size="mini" v-if="this.current_auth.edit==false"
                                       type="warning">👀 仅可读
                            </el-button>
                            <el-button class="doc-tag" plain size="mini" type="info" v-if="this.current_auth.comment===true">💬 可评论
                            </el-button>
                            <el-button class="doc-tag" plain size="mini" v-else type="danger">🈲 不可评论</el-button>
                            <el-tooltip class="item" effect="dark" placement="top-start" content="您拥有该文档的全部权限。"
                                        v-if="superuser===true">
                                <el-button class="doc-tag" plain size="mini" v-if="superuser" type="success">👑 全部权限
                                </el-button>
                            </el-tooltip>
                            <el-button class="doc-tag" plain size="mini" v-if="belong_team==true" type="warning">👨🏾‍🤝‍👨🏼 团队「{{this.team_name}}」
                            </el-button>
                            <el-button class="doc-tag" plain size="mini" v-else type="warning">😎 个人文档</el-button>
                        </div>
                        <DocEditor id="doc-editor" v-model="doc_content" :doc_id="this.doc_id" :read_only="read_only" />
                    </el-main>
                    <el-aside v-loading="boot_loading" width="250px" id="aside_right">
                        <div id="bench_toolbar">
                            <div id="toolbar_title">文档操作</div>
                            <el-divider></el-divider>
                            <el-button v-if="read_only===false" class="action-button" type="success" icon="el-icon-lock"
                                       @click="save_document">保存文档
                            </el-button>
                            <el-button v-else class="action-button" type="success" icon="el-icon-refresh"
                                       @click="refresh_document">刷新文档
                            </el-button>
                            <br/>
                            <el-button class="action-button" v-if="this.favorite===false" type="warning" icon="el-icon-star-off" @click="updateFav">
                                收藏文档
                            </el-button>
                            <el-button class="action-button" v-else type="warning" icon="el-icon-star-on" @click="revokeFav">
                                取消收藏
                            </el-button>
                            <br/>
                            <el-button v-if="current_auth.comment===true" class="action-button" type="primary"
                                       icon="el-icon-chat-line-square" @click="openCommentDrawer">评论面板
                            </el-button>
                            <br/>
                            <el-button class="action-button" type="plain" plain icon="el-icon-time"
                                       @click="openChangelogDrawer">编辑记录
                            </el-button>
                            <br/>
                            <AuthPopupButton v-if="superuser" :doc_id="this.doc_id" :belong_to_team="this.belong_team"
                                             :init_self_auth="self_auth" :init_team_auth="team_auth"/>
                            <el-button v-if="superuser" class="action-button" type="danger" plain icon="el-icon-delete"
                                       @click="deleteFile">删除文档
                            </el-button>
                            <br/>
                        </div>
                    </el-aside>
                </el-container>
            </el-container>
            <ChangelogDrawer :doc_id="doc_id" ref="changelogDrawer"/>
            <CommentDrawer :doc_id="this.doc_id" ref="commentDrawer"/>
        </el-container>
    </div>
</template>

<script>
    import MenuBar from "@/components/MenuBar";
    import AsideMenu from "@/components/AsideMenu";
    import DocEditor from "@/components/DocEditor";
    import CommentDrawer from "@/components/CommentDrawer";
    import ChangelogDrawer from "@/components/ChangelogDrawer";
    import AuthPopupButton from "@/components/AuthPopupButton";
    import Config from "@/config"
    import {decryptData} from "@/utils/encryptUtils";

    export default {
        name: "DocumentView",
        components: {
            AsideMenu,
            MenuBar,
            DocEditor,
            CommentDrawer: CommentDrawer,
            ChangelogDrawer: ChangelogDrawer,
            AuthPopupButton,
        },
        inject: ['reload'],
        data() {
            return {
                doc_id: 0,
                doc_title: "",
                doc_content: "",
                creator: null,
                favorite: false,
                current_auth: {read: false, edit: false, comment: false},
                auth: {read: false, edit: false, comment: false},
                team_auth: {read: false, edit: false, comment: false},
                superuser: null,
                belong_team: null,
                doc_title_input: this.doc_title,
                title_edit_mode: false,
                failure_mode: false,
                timer: null,
                isDeleted: false,
                conflict_protection: false,
                read_only: true,
                boot_loading: true,
                team_name:null,
            };
        },
        methods: {
            openCommentDrawer() {
                this.$refs.commentDrawer.openDrawer();
            },
            openChangelogDrawer() {
                this.$refs.changelogDrawer.openDrawer();
            },
            onOpenFailure(msg) {
                this.$notify({
                    title: "打开文档失败！",
                    type: "error",
                    message: "错误信息:" + msg,
                });
                this.$router.push({name: 'WorkingSpace'});
            },
            update_title() {
                this.$axios.post("/doc/modify_title/", {
                    doc_id: this.doc_id,
                    new_title: this.doc_title_input
                }, Config.axiosHeaders).then((response) => {
                    if (response.status === 200) {
                        if (response.data.success === true) {
                            this.doc_title = this.doc_title_input;
                            this.$message.confirm("修改成功！");
                            return;
                        } else {
                            this.doc_title_input = this.doc_title;
                            this.$notify({
                                title: "操作失败！",
                                type: "error",
                                message: "错误信息:" + response.data.exc,
                            });
                        }
                    } else {
                        this.doc_title_input = this.doc_title;
                        this.$notify({
                            title: "网络异常，连接失败！",
                            type: "error",
                            message: "错误代码：" + response.status,
                        });
                    }
                })
                    .catch((error) => {
                        this.doc_title_input = this.doc_title;
                        this.$notify({
                            title: "网络异常，连接失败！",
                            type: "error",
                            message: "错误代码：" + error.response.status,
                        });
                    });
                this.title_edit_mode = false;
            },
            cancel_update_title() {
                this.doc_title_input = this.doc_title;
                this.title_edit_mode = false;
            },
            update_title_input(text) {
                this.doc_title_input = text;
                // console.log(text);

            },
            save_document() {
                console.log(this.doc_content);
                this.$axios.post("/doc/auto_save_doc/",
                    {
                        doc_id: this.doc_id,
                        document: this.doc_content
                    }, Config.axiosHeaders).then((response) => {
                    if (response.status === 200) {
                        if (response.data.success === true) {
                            this.$message("保存成功");
                        } else this.on_save_document_fail(response.data.exc);
                    } else this.on_save_document_fail(response.status);
                }).catch((error) => {
                    this.on_save_document_fail(error);
                });
            },
            on_save_document_fail(text) {
                this.$message.error("保存错误！错误信息：" + text);
                if(text==="文件不存在"){
                    this.$router.push({name:"WorkingSpace"});
                }
            },
            refresh_document() {
                // this.$refs.doc_editor.setLoading(false);
                this.$axios.post("/doc/refresh_doc/",
                    {doc_id: this.doc_id, edit: this.current_auth.edit}, Config.axiosHeaders).then((response) => {
                    if (response.status === 200) {
                        if (response.data.success === true) {
                            // this.$message("刷新成功");
                            this.doc_title = response.data.title;
                            this.doc_content = response.data.doc;
                            // this.$refs.doc_editor.setLoading(false);
                            if (this.current_auth.edit === true && this.conflict_protection === true && response.data.conflict_protection === false) {
                                this.$notify({
                                        type: "warning",
                                        title: "文档已解除占用！",
                                        message: "刷新以进入编辑模式。",
                                        duration: 750,
                                    }
                                );
                            }
                        } else this.$message.error(response.data.exc);
                    } else this.$message.error(response.status);
                }).catch((error) => {
                    this.$message.error(error);
                });
            },
            close_document() {
                this.$axios.post("/doc/close_doc/",
                    {
                        doc_id: this.doc_id,
                        document: this.doc_content
                    }, Config.axiosHeaders).then((response) => {
                    if (response.status === 200) {
                        if (response.data.success === true) {
                            this.$message("关闭成功");
                            console.log("关闭成功");
                        } else this.$message.error(response.data.exc);
                    } else this.$message.error(response.status);
                }).catch((error) => {
                    this.$message.error(error);
                });
            },
            preventNav(event) {
                if (this.read_only) {
                    this.save_document();
                    event.preventDefault();
                    event.returnValue = "";
                }
            },
            updateFav() {
                this.$axios.post('favorite/add/', JSON.stringify({doc_id: this.doc_id}), Config.axiosHeaders)
                    .then(res => {
                        if (res.data.success) {
                            this.favorite=true;
                            this.$message.success('收藏成功')
                        } else {
                            this.$message.error(res.data.exc)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        this.$message.error('网络出了些问题?')
                    })
            },
            revokeFav(){
                this.$axios.post('favorite/cancel/', JSON.stringify({doc_id: this.doc_id}), Config.axiosHeaders)
                    .then(res => {
                        if (res.data.success) {
                            this.favorite=false;
                            this.$message.warning('已取消收藏')
                        } else {
                            this.$message.error(res.data.exc)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        this.$message.error('网络出了些问题?')
                    })
            },
            deleteFile() {
                this.close_document().then(()=>{ this.$axios.post('bin/delete_doc/', JSON.stringify({doc_id: this.doc_id}), Config.axiosHeaders)
                    .then(res => {
                        if (res.data.success) {
                            this.isDeleted = true
                            this.$message.success('文档已移入回收站')
                            this.$router.push({name: 'WorkingSpace'})
                        } else {
                            this.$message.error(res.data.exc+"请重新打开文档重试。")
                            this.$router.push({name:"WorkingSpace"});
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        this.$message.error('网络出了些问题?请重新打开文档。')
                        this.$router.push({name:"WorkingSpace"});
                    })});
            }
        },
        beforeMount() {
            if (this.read_only === false) window.addEventListener("beforeunload", this.preventNav);
            this.$once("hook:beforeDestroy", () => {
                clearInterval(this.timer);
                if (this.read_only === false) {
                    this.save_document();
                    this.close_document();
                }
                console.log("closing document");
                window.removeEventListener("beforeunload", this.preventNav);
            })
        },
        beforeRouteLeave(to, from, next) {
            if (this.read_only === false && this.isDeleted === false) {
                if (!window.confirm("确认离开页面？请确认您已保存内容。")) {
                    next(false);
                    return;
                }
            }
            next(true);
        },
        created() {
            this.doc_id=parseInt(decryptData(this.$route.params.doc_id));
            this.doc_title_input = this.doc_title;
            this.$axios.post("/doc/open_one_doc/",{doc_id:this.doc_id},Config.axiosHeaders).then((response)=> {
                if (response.status === 200) {
                    if (response.data.success === true) {
                        let res = response.data;
                        this.doc_title = res.title;
                        this.doc_content = res.document;
                        this.creator = res.creator;
                        this.favorite = res.favorite;
                        this.current_auth = res.superuser?{read:true,edit:true,comment:true}:res.current_auth;
                        this.self_auth = res.auth;
                        this.team_auth = res.team_auth;
                        this.superuser = res.superuser;
                        this.belong_team = res.belong_team;
                        this.team_name = res.team_name;
                        this.conflict_protection = res.conflict_protection;
                        this.read_only=(this.current_auth.edit===false||this.conflict_protection==true)==true?true:false;
                        this.boot_loading=false;
                        // this.$refs.doc_editor.setLoading(false);
                        console.log(this.current_auth);
                        if(this.read_only===false)
                            this.timer=window.setInterval(()=>{this.save_document()},30000);
                        else
                            this.timer=window.setInterval(()=>{this.refresh_document();},1000);
                    } else
                        this.onOpenFailure(response.data.exc);
                } else
                    this.onOpenFailure(response.status);
            })
                .catch((error) => {
                    this.onOpenFailure(error);
                });
        },
        beforeRouteUpdate(to, from, next) {
            console.log(to, from, next)
            next()
            this.reload()
        },
    }
    ;
</script>

<style scoped>
    #aside_left {
        border-right: 1px solid #dedfe6;
        height: auto;
        padding: 10px;
    }

    #doc-container {
        text-align: start;
    }

    #toolbar_title {
        display: inline;
        margin: 10px;
        color: dimgray;
        font-size: 16px;
        width: 50%;
    }

    #bench_toolbar {
        margin-top: 10px;
    }

    .action-button {
        margin-top: 10px;
        margin-bottom: 10px;
    }

#aside_right {
    border-left: 1px solid #DEDFE6;
    height: auto;
    padding: 10px;
}
#doc-title{
    margin-left:15px;
    text-align: left;
    font-size: 35px;
    vertical-align:middle;
    text-align: right;
    display: inline-block;
}
#edit-button{
    display: inline-block;
    vertical-align:middle;
    text-align: right;
    margin-left: 15px;
}
#doc-editor{
    margin-top:15px;
}
#doc-title-edit{
  display: inline;
}
#doc-tag-container{
  display: inline;
  vertical-align: middle;
}
.doc-tag{
  margin-left:10px;
}
</style>