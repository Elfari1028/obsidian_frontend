<template>
    <el-form>
        <div style="width: 100px;height: 100px">
            <el-upload class="avatar_uploader"
                       action="http://127.0.0.1:8000/account/upload_avatar/"
                       :show-file-list="false"
                       :on-success="handleAvatarSuccess"
                       :before-upload="beforeAvatarUpload"
                       :with-credentials="true"
                       :name="'avatar'">
                <el-avatar v-if="imageUrl!==''" shape="square" :size="100" :src="this.imageUrl"></el-avatar>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>

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