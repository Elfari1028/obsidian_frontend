<template>
    <el-card class="notice_item">
        <div slot="header" style="height: 20px">
            <span :class="(message.is_read?'card_is_read':'card_not_read')+' card_header_font'">{{message.type}}</span>
        </div>
        <div>
				<span class="card_body_font card_body">
					{{message.content}}
				</span>
            <span class="card_time_font card_body">
					{{message.time}}
				</span>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "NoticeCard",
        props: {
            message: Object
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
        height: 100px;
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