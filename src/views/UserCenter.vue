<template>
    <div>
        <el-container>
            <el-header style="padding: 0">
                <MenuBar/>
            </el-header>
            <el-container>
                <el-aside width="225px" id="aside_left">
                    <AsideMenu/>
                </el-aside>
                <el-main>
                    <div id="info_form" v-loading="isLoading" :disabled="isLoading">
                        <el-form ref="form" :rules="rules" :model="userInfo" label-width="80px">
                            <el-form-item label="头像">
                                <el-avatar :size="100"
                                           :src="userInfo.avatarUrl"
                                           :alt="userInfo.username"
                                           style="font-size: 30px;vertical-align: middle;margin-right: 30px">{{userInfo.username}}
                                </el-avatar>
                                <el-button @click.prevent="isUploadingAvatar = true" size="small">修改头像</el-button>
                                <el-dialog title="分享文件" width="500px"
                                           :visible.sync="isUploadingAvatar">
                                    <el-upload action="http://127.0.0.1:8000/account/upload_avatar/"
                                               :show-file-list="false"
                                               :on-success="handleAvatarSuccess"
                                               :before-upload="beforeAvatarUpload"
                                               :with-credentials="true"
                                               :name="'avatar'">
                                        <el-avatar v-if="uploadUrl!==''" :size="100" :src="uploadUrl"></el-avatar>
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                    <span slot="footer" class="dialog-footer">
                                        <el-button type="primary"
                                                   @click="commitAvatar">确 定</el-button>
                                    </span>
                                </el-dialog>
                            </el-form-item>
                            <el-form-item label="用户名">
                                <el-input :disabled="true" v-model="userInfo.username"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱">
                                <el-input :disabled="!onEdit" v-model="userInfo.email"></el-input>
                            </el-form-item>
                            <el-form-item label="性别">
                                <el-radio-group :disabled="!onEdit" v-model="userInfo.sex">
                                    <el-radio :label="0">男</el-radio>
                                    <el-radio :label="1">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="电话">
                                <el-input :disabled="!onEdit" v-model="userInfo.tel"></el-input>
                            </el-form-item>
                            <el-form-item label="年龄">
                                <el-input :disabled="!onEdit" v-model="userInfo.age"></el-input>
                            </el-form-item>
                            <el-form-item label="个人简介">
                                <el-input :disabled="!onEdit" type="textarea" :rows="5"
                                          v-model="userInfo.mood"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button v-if="onEdit" type="primary" @click="saveEdit">保存信息</el-button>
                                <el-button v-if="!onEdit" type="primary" @click="changeInfo">修改信息</el-button>
                            </el-form-item>
                        </el-form>
                    </div>

                </el-main>
            </el-container>
        </el-container>
    </div>

</template>

<script>
    import MenuBar from "@/components/MenuBar";
    import AsideMenu from "@/components/AsideMenu";
    import {baseUrl} from "@/utils/axiosUtils";

    export default {
        name: "UserCenter",
        components: {AsideMenu, MenuBar},
        data() {
            return {
                onEdit: false,
                isUploadingAvatar: false,
                uploadUrl: '',
                isLoading: false,
                userInfo: {
                    username: 'test',
                    email: 'test@test.com',
                    avatarUrl: '',
                    sex: 0,
                    mood: 'test mood hahahahaha',
                    tel: '136xxxxxxxx',
                    age: 21
                },
                rules: {}
            }
        },
        methods: {
            commitAvatar() {
                this.userInfo.avatarUrl = this.uploadUrl
            },
            changeInfo() {
                this.onEdit = !this.onEdit
            },
            saveEdit() {
                this.onEdit = !this.onEdit
                //post
            },
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
        },
        created: async function () {
            console.log(this.$route.path)
            //get
            this.isLoading = true
            await this.$axios.get('account/get_avatar/').then(res => {
                if (res.data.success) {
                    this.userInfo.avatarUrl = baseUrl.substring(0, baseUrl.length - 1) + res.data.url
                } else {
                    this.userInfo.avatarUrl = ''
                }
                console.log(this.userInfo.avatarUrl)
            }).catch(err => {
                console.log(err)
            })
            await this.$axios.get('').then(res => {
                if (res.data.success) {
                    this.userInfo.username = res.data.username
                    this.userInfo.email = res.data.email
                    this.userInfo.age = res.data.age
                    this.userInfo.sex = res.data.sex
                    this.userInfo.mood = res.data.mood
                    this.userInfo.tel = res.data.tel
                } else {
                    this.$notify(res.data.exec)
                }
            }).catch(err => {
                console.log(err)
                this.$notify('网络出现了些问题？')
            })
            this.isLoading = false
        }
    }
</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    #aside_left {
        border-right: 1px solid #DEDFE6;
        height: auto;
        padding: 10px;
    }

    #info_form {
        width: 45%;
        min-width: 400px;
        margin-left: 30px;
    }
</style>