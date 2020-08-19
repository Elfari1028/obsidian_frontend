<template>
    <div class="comment-create-frame">
        <el-input type="textarea" resize="none" :autosize="{ minRows: 7, maxRows: 7}" :width="300" placeholder="请输入内容"
                  v-model="textarea"></el-input>
        <el-button
                type="primary"
                style="float: right; margin-top:10px"
                @click="createReply"
                :disabled="textarea.length===0"
        >回复
        </el-button>
    </div>
</template>

<script>
    import Config from "@/config";

    export default {
        name: "CommentCreateWindow",
        props: {
            doc_id: {
                type: Number,
                default: -1,
            },
            reply_to: Object,
        },
        data() {
            return {
                textarea: "",
            };
        },
        methods: {
            createReply() {
                console.log({
                    doc_id: this.doc_id,
                    reply_to: this.reply_to === null ? null : this.reply_to.com_id,
                    content: this.textarea
                });
                this.$axios
                    .post(
                        "/comment/reply/",
                        {
                            doc_id: this.doc_id,
                            reply_to: this.reply_to === null ? null : this.reply_to.com_id,
                            content: this.textarea
                        },
                        Config.axiosHeaders
                    )
                    .then((response) => {
                        if (response.status === 200) {
                            if (response.data.success === true) {
                                this.$emit("reply-made");
                                this.textarea = "";
                            } else this.$message.error("回复失败:" + response.data.exc);
                        } else this.$message.error("回复失败:" + response.status);
                    })
                    .catch((error) => {
                        this.$message.error("回复失败:" + error.response.status);
                    });
            },
        },
    };
</script>

<style>
    .comment-create-frame {
        position: absolute;
        bottom: 3%;
        width: 90%;
        margin-bottom: 100px;
        margin-top: 30px;
        margin-left: 20px;
        margin-right: 20px;
    }
</style>