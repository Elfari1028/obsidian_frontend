<template>
  <div class="ckedit">
    <div class="ck-container">
      <ckeditor
        :editor="editor"
        :disabled="read_only===true"
        v-model="editorData"                 
        @ready="onReady"
        @input="$emit('editor-input',editorData)"
        @focus="onFocus"
        @blur="onBlur"
        :config="editorConfig"
      ></ckeditor>
    </div>
  </div>
</template>

<script>
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
export default {
  name: "DocEditor",
  model: {
    prop: "editorData",
    event: "editor-input",
  },
  props: {
    doc_id: {
      type: Number,
      default: -1,
    },
    read_only: {
      type: Boolean,
      default: true,
    },
    editorData: {type:String},
  },
  data() {
    return {
      editor: DecoupledEditor,
      editor_content: "",
      editorConfig: {
        language: "en",
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
    onFocus() {
      console.log(this.editorData);
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
        var CancelToken = this.$axios.CancelToken;
        var source = CancelToken.source();
        return {
          abort: () => {
            source.cancel();
          },
          upload: async () => {
            return await loader.file.then(
              (file) =>
                new Promise((resolve, reject) => {
                  const customConfig= {
                    cancelToken: source.token,
                    headers: { "Content-Type": "multipart/form-data" },
                    onUploadProgress(progressEvent) {
                      loader.uploadTotal = progressEvent.total;
                      loader.upload = progressEvent.loaded;
                    },
                  };
                  var formData = new FormData();
                  formData.append("doc_id", self.doc_id);
                  formData.append("image", file);
                  this.$axios
                    .post(
                      "/doc/upload_image/",
                      formData,
                      customConfig
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
