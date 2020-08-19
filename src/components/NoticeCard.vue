<template>
    <el-tooltip effect="light" :content="toolMessage" placement="left" :open-delay="400">
        <el-card class="notice_item" :shadow="messageItem.is_read?'never':'always'" @click.native="readMessage">
            <div slot="header" style="height: 20px">
                <!-- <i class="el-icon-cancel" v-if="messageItem.is_read===false" style="cursor: pointer; float: right;" @click="readMessage"></i> -->
                <el-button v-if="messageItem.is_read===false" style="float: right; padding: 3px 0" icon="el-icon-close" @click="readMessage"></el-button>
                <span :class="(messageItem.is_read?'card_is_read':'card_not_read')+' card_header_font'">{{messageItem.title}}</span>
            </div>
            <div>
				<span class="card_body_font card_body">
					{{messageItem.content}}
				</span>
                <div class="card_body_font card_body notice_router"
                     v-if="this.message.type===1"
                     @click="toDoc">前往文章>></div>
                <span class="card_time_font card_body">
					{{messageItem.time.substring(11,19)}}
				</span>
            </div>
        </el-card>
    </el-tooltip>
</template>

<script>

    import Config from "@/config";
    import NoticeRequest from "@/utils/noticeUtil";
    import {encryptData} from "@/utils/encryptUtils";

    export default {
        name: "NoticeCard",
        inject: ["reload"],
        props: {
            message: Object
        },
        data() {
            return {
                toolMessage: '',
                messageItem: {}
            }
        },
        methods: {
            readMessage() {
                if (!this.messageItem.is_read) {
                    this.$axios.post('message/read/', JSON.stringify({
                        message_id: this.messageItem.message_id
                    }), Config.axiosHeaders)
                        .then(() => {
                            this.messageItem.is_read = true
                            NoticeRequest.readDoc()
                        })
                }
            },
            toDoc() {
                console.log(this.message)
                this.$router.push({
                    name: 'DocumentView',
                    params: {
                        doc_id: encryptData((this.message.doc_id).toString())
                    }
                })
            },
            setToolMessage() {
                switch (this.message.type) {
                    case 1: {
                        this.toolMessage = '点击前往文档'
                        this.messageItem.title = '新评论'
                        break
                    }
                    case 2: {
                        this.toolMessage = '在 "团队空间-加入新团队-查看加入邀请" 查看邀请哦'
                        this.messageItem.title = '新邀请'
                        break
                    }
                    case 3: {
                        this.toolMessage = '在左侧 "团队空间" 访问哦'
                        this.messageItem.title = '申请通过'
                        break
                    }
                    case 4: {
                        this.toolMessage = '啊哦……要不再试试？'
                        this.messageItem.title = '申请拒绝'
                        break
                    }
                    case 5: {
                        this.toolMessage = '啊这……快去看看吧'
                        this.messageItem.title = '已被踢出'
                        break
                    }
                    case 6: {
                        this.toolMessage = '团队中的个人文件还会保留在工作台哦'
                        this.messageItem.title = '团队已解散'
                    }
                }
            }
        },
        created() {
            this.messageItem = this.message
            this.setToolMessage()
        }
    }
</script>

<style scoped>
    .notice_item {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: block;
        margin: 10px 10px;
    }

    .card_header_font {
        float: left;
        font-size: 14px;
    }

    .card_not_read {
        color: black;
    }

    .card_is_read {
        color: #c4c4c4;
    }

    .card_is_read_bg {
        box-shadow: 5px 5px 5px 5px black;
    }

    .card_not_read_bg {
        box-shadow: 5px 5px 5px 5px black;
    }

    .card_body {
        display: block;
        margin-left: 5px;
        margin-right: 5px;
        margin-bottom: 10px;
    }

    .card_time_font {
        font-size: 6px;
        float: right;
        color: dimgray;
    }

    .card_body_font {
        color: dimgray;
        font-size: 14px;
    }

    .notice_router{
        float: left;
        cursor: pointer;
    }

    .notice_router:hover{
        cursor: pointer;
        color: cornflowerblue;
    }
</style>