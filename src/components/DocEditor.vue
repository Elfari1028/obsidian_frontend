<template>
  <div class="ckedit">
    <div class="ck-container">
      <ckeditor
        :editor="editor"
        :disabled="editorDisabled"
        v-model="editorData"                 
        @ready="onReady"
        @input="$emit('input',$event)"
        :eventInfo="eventInfo"
        :data="data"
        @focus="onFocus"
        @blur="onBlur"
        :config="editorConfig"
      ></ckeditor>
    </div>
  </div>
</template>

<script>
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import axios from "axios";
export default {
  name: "DocEditor",
  model: {
    prop: "content",
    event: "input",
  },
  props: {
    docID: {
      type: Number,
      default: -1,
    },
  },
  created: function () {
    let self = this;
    this.documentData.id = this.docID;
    if (this.docID === -1) this.editorData = "<p>在这里开始输入。</p>";
    else
      axios
        .post("http://39.97.104.62/api/document/obtain_content", {
          doc_id: this.docID,
        })
        .then(function (response) {
          const res = response.data;
          if (res.success === true) {
            this.documentData.title = res.title;
            this.documentData.creator = res.creator;
            this.editorData = res.documentData;
            if (res.auth.length > 0) {
              this.documentData.read = true;
            }
            if (res.auth.search("W") >= 0) {
              this.documentData.write = true;
            }
            if (res.auth.search("C") >= 0) {
              this.documentData.comment = true;
            }
            if (this.documentData.read === false) {
              this.editorDisabled = true;
            }
          } else {
            this.$notify({
              title: "操作失败!",
              type: "warning",
              message: res.exc,
              duration: 5000,
            });
          }
        })
        .catch(function (error) {
          self.onCommunicationError(error);
        });
        window.setInterval(() => {
      this.keepSessionAlive();
    }, 30000);
  },
  data() {
    return {
      editor: DecoupledEditor,
      editorData: "<h2>Lorem and Ipsum are getting married</h2><p>Let's congratulate them with our most sincere wishes!</p><h3>Wedding plans</h3><h4>Time</h4><p>July 30th. 2020. Please arrive before 14:00.</p><h4>Place</h4><p>Lockhart Church, North Town.</p><img src='https://atlas.thc.texas.gov/atlasimg/Markers/5055009770_Caldwell.jpg'/><h4>Dress Code</h4><p>Men:Please wear your best suits, please. Preferably blue.</p>",
      editorDisabled: false,
      documentData: {
        id: "",
        title: "",
        read: "",
        write: "",
        comment: "",
        creator: {
          id: "",
          name: "",
          avatar: "",
        },
      },
      editorConfig: {
        language: "en",
        autosave: {
          save(editor) {
            return this.saveData(editor.getData());
          },
        },
        fontSize: {
          options: [8, 10, "default", 14, 16, 18, 20, 22, 24, 26, 28, 32, 48],
        },
        fontFamily: {
          options: [
            "宋体",
            "仿宋",
            "微软雅黑",
            "黑体",
            "仿宋_GB2312",
            "楷体",
            "隶书",
            "幼圆",
          ],
        },
      },
    };
  },
  methods: {
    saveData(editorContent) {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("Saved", editorContent);
          resolve();
        });
      });
    },
    displayStatus(editor) {
      const pendingActions = editor.plugins.get("PendingActions");
      const statusIndicator = document.querySelector("#editor-status");

      pendingActions.on("change:hasAny", (evt, propertyName, newValue) => {
        if (newValue) {
          statusIndicator.classList.add("busy");
        } else {
          statusIndicator.classList.remove("busy");
        }
      });
    },
    keepSessionAlive() {
      axios
        .post("http://39.97.104.62/api/document/keepalive", {
          doc_id: this.docID,
          document:this.documentData,
        })
        .then((response) => {
          if (response.status === 200) {
            if (response.data.success === true) return;
            else
              this.$notify({
                title: "该文档已被他人占用！",
                message: "错误信息:" + response.data.exc,
                type:"error",
              });
          } else {
            this.$notify({
              title: "网络异常，连接失败！",
              message: "错误代码：" + response.status,
              type:"error",
            });
          }
        })
        .catch((error) => {
          this.$notify({
            title: "网络异常，连接失败！",
            message: "错误代码：" + error.response.status,
            type:"error",
          });
        });
    },
    onCommunicationError(error) {
      this.$notify({
        title: "访问出错!",
        type: "error",
        message: error,
        duration: 5000,
      });
    },
    onFocus() {
      this.editor.ui.getEditableElement().classList.add("ck-container-area");
    },
    onBlur() {
      this.editor.ui.getEditableElement().classList.add("ck-container-area");
    },
    onReady(editor) {
      let self = this;
      console.log(editor.ui.getEditableElement().parentElement);
      editor.ui
        .getEditableElement()
        .parentElement.parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement().parentElement
        );
      editor.ui.getEditableElement().classList.add("ck-container-area");
      editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        //let val = editor.getData();
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        return {
          abort: () => {
            source.cancel();
          },
          upload: async () => {
            return await loader.file.then(
              (file) =>
                new Promise((resolve, reject) => {
                  const config = {
                    cancelToken: source.token,
                    headers: { "Content-Type": "multipart/form-data" },
                    onUploadProgress(progressEvent) {
                      loader.uploadTotal = progressEvent.total;
                      loader.upload = progressEvent.loaded;
                    },
                  };
                  var formData = new FormData();
                  formData.append("doc_id", self.docID);
                  formData.append("image", file);
                  axios
                    .post(
                      "http://39.97.104.62/api/document/upload_image",
                      formData,
                      config
                    )
                    .then((response) => {
                      if (response.status === 200) {
                        if (response.data.success === true)
                          resolve({
                            default: response.data.path,
                          });
                        else reject("操作异常！错误信息:" + response.data.exc);
                      } else {
                        reject(
                          "网络异常，图片上传失败！错误代码：" + response.status
                        );
                      }
                    })
                    .catch((error) => {
                      reject(
                        "网络异常，图片上传失败！错误代码：" +
                          error.response.status
                      );
                    });
                })
            );
          },
        };
      };
      this.editor = editor;
    },
  },
};
</script>

<style>
.ckedit {
  border: 1px solid var(--ck-color-base-border);
  border-radius: var(--ck-border-radius);
  min-height: 82vh;
  max-height: 82vh;
  min-width: 100hh;
  max-width: 100hh;
  display: flex;
  flex-flow: column nowrap;
}
.ck.ck-toolbar {
  z-index: 2;
  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.2);
  border-bottom: 1px solid var(#c4c4c4);
  border-radius: var(--ck-border-radius);
  border: 0;
  background: var(--ck-color-toolbar-background);
  padding: 0 var(--ck-spacing-small);
  user-select: none;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.ck-container {
  padding: calc(2 * var(--ck-spacing-large));
  background: var(--ck-color-base-foreground);
  min-height: fit-content(20em);
  max-height: 100%;
  overflow-y: auto;
}
.ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline.ck-blurred {
  width: 15.8cm;
  min-height: 900px;
  padding: 1cm 2cm 2cm;
  border: 1px hsl(0, 0%, 82.7%) solid;
  border-radius: var(--ck-border-radius);
  background: white;
  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.1);
  margin-top: 0px;
  margin-right: auto;
  margin-bottom: 0px;
  margin-left: auto;
}
.ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline.ck-focused {
  width: 15.8cm;
  min-height: 900px;
  padding: 1cm 2cm 2cm;
  border: 1px hsl(0, 0%, 20.7%) solid;
  border-radius: var(--ck-border-radius);
  background: white;
  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.1);
  margin-top: 0px;
  margin-right: auto;
  margin-bottom: 0px;
  margin-left: auto;
}
</style>
