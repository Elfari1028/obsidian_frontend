<template>
    <el-form>
        <el-upload class="avatar_uploader"
                   action="http://127.0.0.1:8000/account/Avatar/"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload"
                   :with-credentials="true">
            <img v-if="imageUrl" :src="this.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-form>

</template>

<script>
    export default {
        name: "AvatarTest",
        data() {
            return {
                imageUrl: ''
            }
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw)
            },
            beforeAvatarUpload(file) {
                const formatValid = ((file.type === 'image/jpeg') || (file.type === 'image/png'))
                const isLt2M = file.size / 1024 / 1024 < 2
                if (!isLt2M) {
                    this.$message.error('上传头像大小不能超过2MB')
                }
                if (!formatValid) {
                    this.$message.error('上传头像只能为png或jpg格式')
                }
                return isLt2M && formatValid
            }
        }
    }
</script>

<style scoped>

</style>