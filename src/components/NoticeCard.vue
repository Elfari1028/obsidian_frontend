<template>
    <el-card class="notice_item" :shadow="messageItem.is_read?'never':'always'" @click.native="readMessage">
        <div slot="header" style="height: 20px">
            <span :class="(messageItem.is_read?'card_is_read':'card_not_read')+' card_header_font'">{{messageItem.type}}</span>
        </div>
        <div>
				<span class="card_body_font card_body">
					{{messageItem.content}}
				</span>
            <span class="card_time_font card_body">
					{{messageItem.time.substring(11,19)}}
				</span>
        </div>
    </el-card>
</template>

<script>

    import Config from "@/config";
    import NoticeRequest from "@/utils/noticeUtil";

    export default {
        name: "NoticeCard",
        inject:["reload"],
        props: {
            message: Object
        },
        data() {
            return {
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
                            NoticeRequest.messageUnreadLength = NoticeRequest.messageUnreadLength - 1
                            //this.reload()
                        })
                }
            }
        },
        created() {
            this.messageItem = this.message
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
        margin: 5px;
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
</style>