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
                :visible.sync="isVisible"
                :with-header="false"
                :before-close="handleClose"
                :append-to-body="true"
                :modal="false"
                :modal-append-to-body="true"
                direction="rtl"
                z-index="1"
                size="20%">
            <div class="notice_drawer_container">
                hello
            </div>
        </el-drawer>
    </div>
</template>

<script>
    export default {
        name: "Notice",
        data() {
            return {
                isOpen: false,
                isVisible: false,
                messageMaxLength: 10,
                messageQueue: [],
                interval: {},
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

            },
            getMessages() {
                this.$axios.get('').then(res => {
                    const list = res.data.list
                    for (let i = 0; i < list.length; i++) {
                        this.queuePush({})
                    }
                })
            },
            messageRequest() {
                let that = this
                this.interval = setInterval(()=>{
                    that.getMessages()
                },5000)
            }
        },
        created() {

        },
        destroy() {
            clearInterval(this.interval)
        }
    }
</script>

<style scoped>
    .notice_drawer_container {
        padding-top: 70px;
        padding-left: 20px;
        padding-right: 20px;
    }

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