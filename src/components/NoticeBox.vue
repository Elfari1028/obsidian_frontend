<template>
    <div class="notice">
        <el-badge :is-dot="messageUnreadNum!==0">
            <el-button circle type="info"
                       size="mini" icon="el-icon-message-solid"
                       @click="isVisible = !isVisible">
            </el-button>
        </el-badge>
        <el-drawer :title="'通知'"
                   :close-on-click-modal="true"
                   :visible.sync="isVisible"
                   :with-header="false"
                   :before-close="handleClose"
                   :append-to-body="true"
                   :modal="true"
                   :modal-append-to-body="true"
                   direction="rtl"
                   z-index="1"
                   size="25%">
            <div :style="{height: spaceHeight}"
                 style="margin-top: 60px; margin-right: 20px; margin-left:20px;transition: 1s ">
                <el-scrollbar style="height: 100%">
                    <NoticeCard v-for="(message,index) in messageQueue" :key="index" :message="message"></NoticeCard>
                </el-scrollbar>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    import NoticeCard from "@/components/NoticeCard";
    import NoticeRequest from "@/utils/noticeUtil";

    export default {
        name: "Notice",
        components: {NoticeCard},
        data() {
            return {
                isOpen: false,
                isVisible: false,
                isLoading: false,
                messageMaxLength: 10,
                messageUnreadNum: 0,
                messageQueue: [],
                messageBot: null,
                spaceHeight: window.innerHeight - 80 + 'px',
            }
        },
        methods: {
            handleClose() {
                this.isVisible = false;
            },
        },
        created() {
            this.messageBot = new NoticeRequest()
            this.messageBot?.axiosPolling()
        },
        destroy() {
            this.messageBot?.axiosStop()
        },
        mounted() {
            window.onresize = () => {
                return (() => {
                    this.spaceHeight = window.innerHeight - 80 + 'px'
                })
            }
        }
    }
</script>

<style scoped>

    .notice {
        padding-top: 6px;
        padding-bottom: 6px;
    }

    /deep/ :focus {
        outline: 0;
    }

</style>

<style>
    .v-modal {
        background-color: rgba(255, 255, 255, 0);
    }
</style>