<template>
  <div>
    <el-container>
      <el-header style="padding: 0">
        <MenuBar />
      </el-header>
      <el-container>
        <el-aside width="225px" id="aside_left">
          <AsideMenu />
        </el-aside>
        <el-container>
          <el-main id="doc-container">
            <div id="doc-title"> 
              <el-input :value="doc_title_input" v-if="title_edit_mode===true" @input="update_title_input"></el-input>
              <div v-if="title_edit_mode===false">{{doc_title}}</div>
            </div>
            <el-button id="edit-button" size="small" type="plain" v-if="title_edit_mode===false" icon="el-icon-edit" @click="title_edit_mode=true"></el-button>   
            <el-button id="edit-button" size="small" type="plain" v-if="title_edit_mode===true" icon="el-icon-check" @click="update_title"></el-button>
            <el-button id="edit-button" size="small" type="plain" v-if="title_edit_mode===true" icon="el-icon-close" @click="cancel_update_title"></el-button>
            <br/>
            <DocEditor id="doc-editor" v-model="document" :doc_id="this.doc_id" :read_only="current_auth.edit===false" />
          </el-main>
          <el-aside width="250px" id="aside_right">
            <div id="bench_toolbar">
              <div id="toolbar_title">文档操作</div> 
              <el-divider></el-divider>
              <el-button class="action-button"  type="success" icon="el-icon-lock" @click="save_document">保存文档</el-button>
              <br/>
            <el-button class="action-button"  type="warning" icon="el-icon-star-off" @click="updateFav">收藏文档</el-button>
              <br/>
            <el-button class="action-button"  type="primary"  icon="el-icon-chat-line-square" @click="openCommentDrawer">评论面板</el-button>        
              <br/>
              <!-- <el-button class="action-button" type="plain" plain icon="el-icon-refresh" @click="refreshDoc">刷新文档</el-button> -->
              <!-- <br/> -->
              <el-button class="action-button"  type="plain" plain icon="el-icon-time" @click="openChangelogDrawer">编辑记录</el-button>
              <br/>
              <AuthPopupButton :doc_id="this.doc_id" :belong_to_team="this.belong_team" :init_self_auth="this.self_auth" :init_team_auth="this.team_auth" />
              <el-button class="action-button"  type="danger" plain icon="el-icon-delete" @click="deleteFile">删除文件</el-button>
              <br/>
            </div>
          </el-aside>
        </el-container>
      </el-container>
      <ChangelogDrawer :docID="doc_id" ref="changelogDrawer" />
      <CommentDrawer :doc_id="this.doc_id" ref="commentDrawer" />
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
  data() {
    return {
      doc_id: 0,
      doc_title:"",
      document: "",
      creator: null,
      favorite:false,
      current_auth: {read:false,edit:false,comment:false},
      auth:{read:false,edit:false,comment:false},
      team_auth:{read:false,edit:false,comment:false},
      superuser:null,
      belong_team:null,
      doc_title_input: this.doc_title,
      title_edit_mode: false,
      failure_mode:false,
      timer:null,
    };
  },
  methods: {
    openCommentDrawer() {
      this.$refs.commentDrawer.openDrawer();
    },
    openChangelogDrawer() {
      this.$refs.changelogDrawer.openDrawer();
    },
    onOpenFailure(msg){
      this.$notify({
        title: "打开文档失败！",
        type: "error",
        message: "错误信息:" + msg,
      });
      this.$router.push({name:'WorkingSpace'});
    },
    update_title(){
      this.$axios.post("/doc/modify_title/",{doc_id:this.doc_id,new_title:this.doc_title_input},Config.axiosHeaders).then((response) => {
          if (response.status === 200) {
            if (response.data.success === true) {
              this.doc_title = this.doc_title_input;   
              this.$message.confirm("修改成功！");
              return; 
            }
            else{
              this.doc_title_input = this.doc_title;
              this.$notify({
                title: "操作失败！",
                type:"error",
                message: "错误信息:" + response.data.exc,
              });
            }
          } else {
            this.doc_title_input = this.doc_title;
            this.$notify({
              title: "网络异常，连接失败！",
              type:"error",
              message: "错误代码：" + response.status,
            });
          }
        })
        .catch((error) => {
          this.doc_title_input = this.doc_title;
          this.$notify({
            title: "网络异常，连接失败！",
            type:"error",
            message: "错误代码：" + error.response.status,
          });
        });
        this.title_edit_mode = false;
    },
    cancel_update_title(){
      this.doc_title_input = this.doc_title;
      this.title_edit_mode = false;
    },
    update_title_input(text){
      this.doc_title_input=text;
      // console.log(text);
    
    },
    save_document(){
      console.log(this.document);
      this.$axios.post("/doc/auto_save_doc/",
        {doc_id: this.doc_id,
          document: this.document},Config.axiosHeaders).then((response)=>{
            if(response.status === 200){
              if(response.data.success === true){
                this.$message("自动保存成功");
              }
              else this.on_save_document_fail(response.data.exc);
            }else this.on_save_document_fail(response.status);
          }).catch((error)=>{
            this.on_save_document_fail(error);
          });
    },
    on_save_document_fail(text){
      this.$message.error("保存错误！错误信息："+text);
    },
    refresh_document(){
      this.$axios.post("/doc/refresh_doc/",
        {doc_id: this.doc_id},Config.axiosHeaders).then((response)=>{
            if(response.status === 200){
              if(response.data.success === true){
                this.$message("自动刷新成功");
              }
              else this.$message.error(response.data.exc);
            }else this.$message.error(response.status);
          }).error((error)=>{
            this.$message.error(error);
          });
    },
    close_document(){
      clearInterval(this.timer);
      this.$axios.post("/doc/close_doc/",
        {doc_id: this.doc_id,
          document: this.document},Config.axiosHeaders).then((response)=>{
            if(response.status === 200){
              if(response.data.success === true){
                this.$message("关闭成功");
                console.log("关闭成功");
              }
              else this.$message.error(response.data.exc);
            }else this.$message.error(response.status);
          }).error((error)=>{
            this.$message.error(error);
          });
    },
   preventNav(event){
      this.save_document();
      event.preventDefault();
      event.returnValue = "";
    }
  },
  beforeMount(){
    window.addEventListener("beforeunload", this.preventNav);
    this.$once("hook:beforeDestroy", () => {
      this.save_document();
      this.close_document();
      console.log("closing document");
      window.removeEventListener("beforeunload", this.preventNav);
    })
  },
  beforeRouteLeave(to,from,next){
    if (!window.confirm("确认离开页面？请确认您已保存内容。")) {
        return;
      }
    this.save_document();
    this.close_document();
    next();
  },
  created() {  
    this.doc_id=parseInt(this.$route.params.doc_id);
    this.doc_title_input = this.doc_title;
    this.$axios.post("/doc/open_one_doc/",{doc_id:this.doc_id},Config.axiosHeaders).then((response)=> {
        if (response.status === 200) {  
          if (response.data.success === true) {
            let res = response.data;
            this.doc_title = res.title;
            this.document = res.document;
            this.creator = res.creator;
            this.favorite = res.favorite;
            this.current_auth = res.superuser?{read:true,edit:true,comment:true}:res.current_auth;
            this.auth = res.auth;
            this.team_auth = res.team_auth;
            this.superuser = res.superuser;
            this.belong_team = res.belong_team;
            console.log(this.document);
            if(this.current_auth.edit === true)
              this.timer=setInterval(this.save_document(),30000);
            else
              this.timer=setInterval(this.refresh_document(),30000);
            // window.addEventListener('beforeunload', (event) => {
            //   // Cancel the event as stated by the standard.
            //   event.preventDefault();
            //   // Chrome requires returnValue to be set.
            //   event.returnValue = '';
            // });
            // window.addEventListener('unload', (event) => {
            //   this.save_document();
            //   this.close_document();
            //   event.target;
            // });
          } else 
            this.onOpenFailure(response.data.exc);
        } else 
            this.onOpenFailure(response.status);
      })
      .catch((error) => {
        this.onOpenFailure(error);
      });
  },
};
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
</style>