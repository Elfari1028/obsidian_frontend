<template>
    <el-popover placement="bottom"
                width="100px"
                trigger="manual"
                @open="getNotice"
                :popper-options="{ boundariesElement: 'viewport', removeOnDestroy: true }"
                v-model="isOpen">
        <span>test</span>
        <i slot="reference" class="el-icon-message-solid notice" @click="isOpen = !isOpen"></i>
    </el-popover>
</template>

<script>
    export default {
        name: "Notice",
        data() {
            return {
                isOpen: false,
            }
        },
        methods: {
            getNotice() {
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
</style>