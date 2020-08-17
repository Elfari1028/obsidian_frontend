<template>
    <div>
        <el-popover placement="bottom"
                    width="100px"
                    trigger="hover"
                    @click.native="isVisible = !isVisible"
                    :popper-options="{ boundariesElement: 'viewport', removeOnDestroy: true }"
                    v-model="isOpen">
            <span>test</span>
            <i slot="reference" class="el-icon-message-solid notice" @click="isOpen = !isOpen"></i>
        </el-popover>
        <el-drawer
                :title="'通知'"
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
            <div :style="{height: spaceHeight}" style="margin-top: 60px; margin-right: 20px; margin-left:20px;transition: 1s ">
                <el-scrollbar style="height: 100%">
                    <NoticeCard v-for="(message,index) in messageQueue" :key="index" :message="message"></NoticeCard>
                </el-scrollbar>
            </div>

        </el-drawer>
    </div>
</template>

<script>
    import NoticeCard from "@/components/NoticeCard";

    export default {
        name: "Notice",
        components: {NoticeCard},
        data() {
            return {
                isOpen: false,
                isVisible: false,
                isLoading: false,
                messageMaxLength: 10,
                messageQueue: [],
                interval: {},
                spaceHeight: window.innerHeight - 80 + 'px',
            }
        },
        methods: {
            queuePush(Object) {
                this.messageQueue.unshift(Object)
                if (this.messageQueue.length > this.messageMaxLength) {
                    this.queuePop()
                }
            },
            queuePop() {
                return this.messageQueue.pop()
            },
            handleClose() {
                this.isVisible = false;
            },
            async getMessages() {
                await this.$axios.get('').then(res => {
                    const list = res.data.list
                    for (let i = 0; i < list.length; i++) {
                        this.queuePush({})
                    }
                }).catch(err => {
                    console.log(err)
                    for (let i = 0; i < 9; i++) {
                        this.queuePush({
                            message_id: i,
                            content: {
                                type: 'DEBUG' + i,
                                text: i + 'hahaahhaha' + i * i
                            },
                            time: '11:54:' + i,
                            is_read: i % 2 === 0
                        })
                    }
                })
                this.messageQueue.sort((a, b) => {
                    let x = a.is_read ? -1 : 1
                    let y = b.is_read ? -1 : 1
                    if (x > y)
                        return -1
                    if (x < y)
                        return 1
                    x = a.time
                    y = b.time
                    if (x > y)
                        return -1
                    else
                        return 1
                })
            },
            messageRequest() {
                let that = this
                this.interval = setInterval(() => {
                    that.getMessages()
                }, 5000)
            }
        },
        created() {
            this.getMessages()
            const that = this
            setTimeout(() => {
                that.queuePush({
                    message_id: -1,
                    content: {
                        type: 'test new message',
                        text: 'hahaahhaha new message!'
                    },
                    time: '11:54:45',
                    is_read: false
                })
            }, 5000)
        },
        destroy() {
            clearInterval(this.interval)
        },
        mouseout() {
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
        font-size: 25px;
        vertical-align: middle;
        height: 40px;
        line-height: 40px !important;
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