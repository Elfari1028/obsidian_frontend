<template>
    <div class="notice">
        <el-badge :is-dot="showDot>0">
            <el-button circle type="info"
                       size="mini" icon="el-icon-message-solid"
                       @click="openDrawer">
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
                   z-index="2"
                   size="25%">
            <div :style="{height: spaceHeight}"
                 style="margin-top: 60px; margin-right: 20px; margin-left:20px;transition: 1s ">
                <el-scrollbar style="height: 100%" v-if="!forceRefresh">
                    <NoticeCard v-for="(message,index) in messageList" :key="index"
                                :message="message"></NoticeCard>
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
        inject: ['reload'],
        components: {NoticeCard},
        data() {
            return {
                forceRefresh: false,
                isOpen: false,
                showDot: false,
                isVisible: false,
                isLoading: false,
                messageBot: null,
                onCreate: true,
                messageList: [],
                spaceHeight: window.innerHeight - 80 + 'px',
            }
        },
        methods: {
            handleClose() {
                this.isVisible = false;
            },
            openDrawer() {
                this.drawerUpdate()
                this.isVisible = !this.isVisible
            },
            drawerUpdate() {
                this.forceRefresh = true
                this.messageList = this.messageBot?.getList()
                this.$nextTick(() => {
                    this.forceRefresh = false
                })
            }
        },
        created() {
            this.onCreate = true;
            this.messageBot = NoticeRequest.getInstance()
            this.messageBot?.noticeInit()
            this.messageList = this.messageBot?.getList()
            this.onCreate = false;
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
        },
        watch: {
            'messageBot.newMessageList': {
                handler(val) {
                    for (let i = 0; i < val.length; i++) {
                        this.$notify({
                            title: '新消息',
                            message: val[i].content,
                            duration: 5000
                        })
                    }
                    if (val.length !== 0) {
                        this.drawerUpdate()
                    }
                },
                deep: true
            },
            'messageBot.messageUnreadLength': {
                handler(val, oldVal) {
                    console.log(oldVal)
                    this.showDot = val > 0
                },
                deep: true
            },
            'messageBot.messageQueue': {
                handler() {
                    this.messageList = this.messageBot?.getList()
                },
                deep: true
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