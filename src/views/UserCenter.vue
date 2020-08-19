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
                        <el-form :rules="infoRules" :model="userInfo" label-width="80px" ref="userInfo">
                            <el-form-item label="头像">
                                <el-avatar :size="100"
                                           :src="avatarUrl"
                                           :alt="userInfo.username"
                                           style="font-size: 30px;vertical-align: middle;margin-right: 30px">
                                    {{userInfo.username}}
                                </el-avatar>
                                <el-button @click.prevent="isUploadingAvatar = true" size="small">修改头像</el-button>
                                <el-dialog title="上传头像" width="500px"
                                           :visible.sync="isUploadingAvatar">
                                    <el-upload :action="this.$config.avatarUploadUrl"
                                               :show-file-list="false"
                                               :on-success="handleAvatarSuccess"
                                               :before-upload="beforeAvatarUpload"
                                               :with-credentials="true"
                                               :name="'avatar'" class="avatar_uploader">
                                        <div>
                                            <el-avatar v-if="uploadUrl!==''" :size="100" :src="uploadUrl"
                                                       class="avatar"></el-avatar>
                                            <el-button v-else icon="el-icon-upload">上传头像</el-button>
                                        </div>
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
                            <el-form-item label="邮箱" prop="email">
                                <el-input :disabled="!onEdit" v-model="userInfo.email"></el-input>
                            </el-form-item>
                            <el-form-item label="性别">
                                <el-radio-group :disabled="!onEdit" v-model="userInfo.sex">
                                    <el-radio :label="false">男</el-radio>
                                    <el-radio :label="true">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="电话" prop="tel">
                                <el-input :disabled="!onEdit" v-model="userInfo.tel" placeholder="未知"></el-input>
                            </el-form-item>
                            <el-form-item label="年龄" prop="age">
                                <el-input size="small" width="50"
                                          :disabled="!onEdit" v-model="userInfo.age" placeholder="未知"></el-input>
                            </el-form-item>
                            <el-form-item label="个人简介">
                                <el-input :disabled="!onEdit" type="textarea" :rows="5" placeholder="这人没写……"
                                          v-model="userInfo.mood" maxlength="50" show-word-limit></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="changePass">修改密码</el-button>
                                <el-button v-if="onEdit" type="primary" @click="saveInfo">保存信息</el-button>
                                <el-button v-if="!onEdit" type="primary" @click="changeInfo">修改信息</el-button>
                                <el-button type="warning" @click="logout">退出登录</el-button>
                            </el-form-item>
                        </el-form>
                        <el-dialog title="修改密码" width="500px"
                                   :close-on-click-modal="false"
                                   :visible.sync="showPassChangeDialog">
                            <el-form :model="passForm" :rules="passRules" ref="passForm">
                                <el-form-item prop="old_password">
                                    <el-input placeholder="旧密码" type="password" show-password
                                              v-model="passForm.old_password"></el-input>
                                </el-form-item>
                                <el-form-item prop="new_password">
                                    <el-input placeholder="新密码" type="password" show-password
                                              v-model="passForm.new_password"></el-input>
                                </el-form-item>
                                <el-form-item prop="check_password">
                                    <el-input placeholder="确认密码" type="password" show-password
                                              v-model="passForm.check_password"></el-input>
                                </el-form-item>
                            </el-form>

                            <span slot="footer" class="dialog-footer">
                                <el-button type="default" @click="exitPassChange">取 消</el-button>
                                <el-button type="primary" @click="commitPassword">确 定</el-button>
                            </span>
                        </el-dialog>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>

</template>

<script>
    import MenuBar from "@/components/MenuBar";
    import AsideMenu from "@/components/AsideMenu";
    import Config from "@/config";
    import {encryptForm} from "@/utils/encryptUtils";
    import {updateStatus} from "@/utils/axiosUtils";

    export default {
        name: "UserCenter",
        components: {AsideMenu, MenuBar},
        data() {
            const validateEmail = (rule, value, callback) => {
                const pattern = /[a-zA-Z0-9][a-zA-Z0-9_]{0,18}@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/g;
                if (pattern.test(value)) {
                    callback();
                } else {
                    callback(new Error('邮箱地址格式错误'))
                }
                this.$axios.post('account/email_used/', JSON.stringify({email: value}), Config.axiosHeaders)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.success === true) {
                            callback();
                        } else callback(new Error("res.data.exc"));
                    })
                    .catch(err => {
                        console.log(err)
                        callback(new Error('网络好像出问题了'))
                    })
            };
            const validatePassword = (rule, value, callback) => {
                if (value !== this.passForm.new_password) {
                    callback(new Error('两次输入密码不一致'));
                } else {
                    callback()
                }
            };
            const validateNumber = (rule, value, callback) => {
                if (value.search(/[^\d]/g) !== -1) {
                    callback(new Error('请输入数字'))
                } else {
                    callback()
                }
            };
            return {
                onEdit: false,
                isUploadingAvatar: false,
                uploadUrl: '',
                avatarUrl: '',
                isLoading: false,
                showPassChangeDialog: false,
                userInfo: {
                    username: '',
                    email: '',
                    sex: '',
                    age: '',
                    mood: '',
                    tel: '',
                },
                passForm: {
                    old_password: '',
                    new_password: '',
                    check_password: ''
                },
                encodePassForm: {},
                infoRules: {
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {validator: validateEmail, trigger: 'blur'}
                    ],
                    age: [
                        {validator: validateNumber, trigger: 'change'}
                    ],
                    tel: [
                        {validator: validateNumber, trigger: 'change'}
                    ]
                },
                passRules: {
                    old_password: [
                        {required: true, message: '请输入原密码', trigger: 'change'},
                    ],
                    new_password: [
                        {required: true, message: '请输入新密码', trigger: 'change'},
                        {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'change'}
                    ],
                    check_password: [
                        {required: true, message: '请再次输入验证密码', trigger: 'change'},
                        {validator: validatePassword, trigger: 'change'}
                    ]
                },
            }
        },
        methods: {
            logout() {
                this.$axios.post('account/logout1/').then((res) => {
                    if (res.data.success) {
                        updateStatus()
                        this.$message('已退出登录')
                        this.$router.push({
                            name: 'Login'
                        })
                    }
                })
            },
            commitAvatar() {
                this.avatarUrl = this.uploadUrl
                this.isUploadingAvatar = false;
            },
            changeInfo() {
                this.onEdit = !this.onEdit
            },
            saveInfo() {
                this.$refs['userInfo'].validate(valid => {
                    if (valid) {
                        console.log(this.userInfo)
                        this.$axios.post('account/modify_information/', JSON.stringify({
                            username: this.userInfo.username,
                            email: this.userInfo.email,
                            sex: this.userInfo.sex,
                            age: this.userInfo.age === '' ? -1 : this.userInfo.age,
                            mood: this.userInfo.mood,
                            tel: this.userInfo.tel,
                        })).then(res => {
                            if (res.data.success) {
                                this.onEdit = !this.onEdit
                            } else {
                                this.$notify(res.data.exc)
                            }
                        }).catch(err => {
                            console.log(err)
                            this.$notify('网络出现了些问题？')
                        })
                    }
                })
            },
            changePass() {
                this.passForm = {
                    old_password: '',
                    new_password: '',
                    check_password: ''
                }
                this.showPassChangeDialog = true
            },
            exitPassChange() {
                this.showPassChangeDialog = false
            },
            commitPassword() {
                this.$refs['passForm'].validate(valid => {
                    if (valid) {
                        encryptForm(this.passForm, this.encodePassForm)
                        console.log(this.encodePassForm)
                        this.$axios.post('account/modify_password/', JSON.stringify(this.encodePassForm), Config.axiosHeaders)
                            .then(res => {
                                console.log(res)
                                if (res.data.success) {
                                    this.showPassChangeDialog = false
                                    this.$message('密码修改成功')
                                    this.logout()
                                } else {
                                    this.$message(res.data.exc)
                                }
                            })
                            .catch(err => {
                                console.log(err)
                                this.$message('网络似乎出了点问题')
                            })
                    }
                })
            },
            handleAvatarSuccess(res, file) {
                this.uploadUrl = URL.createObjectURL(file.raw)
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
                    this.avatarUrl = Config.baseUrl.substring(0, Config.baseUrl.length - 1) + res.data.url
                } else {
                    this.avatarUrl = ''
                }
                console.log(this.avatarUrl)
            }).catch(err => {
                console.log(err)
            })
            await this.$axios.get('account/get_information/').then(res => {
                if (res.data.success) {
                    console.log(res.data)
                    this.userInfo.username = res.data.username
                    this.userInfo.email = res.data.email
                    this.userInfo.age = res.data.age === -1 ? '' : res.data.age
                    this.userInfo.sex = res.data.sex
                    this.userInfo.mood = res.data.mood
                    this.userInfo.tel = res.data.tel
                } else {
                    this.$notify(res.data.exc)
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

    #aside_left {
        border-right: 1px solid #DEDFE6;
        height: auto;
        padding: 10px;
    }

    /deep/ #info_form input {
        cursor: text !important;
    }

    /deep/ #info_form textarea {
        cursor: text !important;
    }

    /deep/ #info_form span {
        cursor: default !important;
    }

    /deep/ #info_form span::after {
        cursor: default !important;
    }

    #info_form {
        width: 45%;
        min-width: 400px;
        margin-left: 30px;
    }
</style>
