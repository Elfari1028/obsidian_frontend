<template>
    <div id="login_page">
        <MenuBar :hide="1"/>
        <el-container>
            <el-main id="login_page_main">
                <div id="login_block">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="账号登录" name="username-login">
                            <el-form style="margin-top: 10px">
                                <el-form-item>
                                    <el-input v-model="loginForm.email" placeholder="邮箱/用户名" @keyup.enter.native="submitLogin"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input type="password" v-model="loginForm.password" placeholder="密码"
                                              show-password @keyup.enter.native="submitLogin"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="info" style="float: right" @click="submitLogin">登录
                                        <i class="el-icon-arrow-right"></i>
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="注册账号" name="register">
                            <el-form :model="registerForm" :rules="rules" ref="registerForm" style="margin-top: 10px">
                                <el-form-item prop="username">
                                    <el-input v-model="registerForm.username"
                                              placeholder="用户名"></el-input>
                                </el-form-item>
                                <el-form-item prop="email">
                                    <el-input v-model="registerForm.email"
                                              placeholder="邮箱"></el-input>
                                </el-form-item>
                                <el-form-item prop="password">
                                    <el-input type="password" v-model="registerForm.password"
                                              placeholder="密码" show-password></el-input>
                                </el-form-item>
                                <el-form-item prop="checkPassword">
                                    <el-input type="password" v-model="registerForm.checkPassword"
                                              placeholder="确认密码" show-password></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="info" style="float: right" @click="submitRegister">注册<i
                                            class="el-icon-arrow-right"></i>
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>

                </div>
            </el-main>
            <el-footer id="login_page_footer">
                copyright BUAA21
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import MenuBar from "../components/MenuBar";
    import {updateStatus} from "@/utils/axiosUtils"
    import Config from "@/config"
    import {encryptForm} from "@/utils/encryptUtils"
    //import {getToken} from "../utils/auth";

    export default {
        name: "Login",
        components: {MenuBar},
        data() {
            const validateUsername = (rule, value, callback) => {
                const pattern = /[^0-9a-zA-Z_]/g;
                if (pattern.test(value)) {
                    callback(new Error('用户名中含有非法字符,应仅使用数字/字母/下划线组合'))
                } else if (/[0-9]/g.test(value[0])) {
                    callback(new Error('用户名必须以英文字母开头'))
                } else {
                    this.$axios.post('account/username_used/', JSON.stringify({username: value}), Config.axiosHeaders)
                        .then(res => {
                            console.log(res.data)
                            if (res.data.success === true) {
                                callback()
                            } else if (res.data.success === false) {
                                callback(new Error(res.data.exc))
                            } else {
                                callback(new Error('未知错误,请联系管理员'))
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            callback(new Error('网络好像出问题了'))
                        })
                }
            };
            const validateEmail = (rule, value, callback) => {
                const pattern = /[a-zA-Z][a-zA-Z0-9_]{3,17}@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/g;
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
                        } else callback(new Error(res.data.exc));
                    })
                    .catch(err => {
                        console.log(err)
                        callback(new Error('网络好像出问题了'))
                    })
            };
            const validatePassword = (rule, value, callback) => {
                if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致'));
                } else {
                    callback();
                }
            };
            return {
                labelPosition: "right",
                loginForm: {
                    email: '',
                    password: ''
                },
                encryptLogin: {
                    email: '',
                    password: ''
                },
                encryptRegister: {
                    username: '',
                    email: '',
                    password: '',
                },
                registerForm: {
                    username: '',
                    email: '',
                    password: '',
                    checkPassword: '',
                },
                activeName: 'username-login',
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur'},
                        {validator: validateUsername, trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {validator: validateEmail, trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'change'},
                        {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'change'}
                    ],
                    checkPassword: [
                        {required: true, message: '请再次输入验证密码', trigger: 'change'},
                        {validator: validatePassword, trigger: 'change'}
                    ]
                },
            }
        },
        methods: {

            submitLogin: function () {
                encryptForm(this.loginForm, this.encryptLogin)
                console.log(this.encryptLogin)
                this.$axios.post('account/login1/', JSON.stringify(this.encryptLogin), Config.axiosHeaders)
                    .then(res => {
                        console.log(res.data)
                        if (!res.data.success) {
                            this.$message.error(res.data.exc)
                        } else {
                            this.$store.dispatch("userLogin", true)
                            sessionStorage.setItem("USER_STATUS", "isLogin")
                            this.$message.success("login success")
                            this.$router.push("/WorkingSpace")
                        }
                    })
            },
            submitRegister: function () {
                this.$refs['registerForm'].validate(valid => {
                    if (valid) {
                        encryptForm(this.registerForm, this.encryptRegister)
                        console.log(this.encryptRegister)
                        this.$axios.post('account/register1/', JSON.stringify(this.encryptRegister), Config.axiosHeaders)
                            .then(res => {
                                console.log("============yes==========")
                                console.log(res)
                                this.$alert('注册成功', '啊哈', {
                                    center: true,
                                    callback: () => {
                                        this.$axios.post('account/login1/', JSON.stringify(this.encryptRegister), Config.axiosHeaders)
                                            .then(res => {
                                                console.log(res.data)
                                                if (res.data.success) {
                                                    this.$store.dispatch("userLogin", true)
                                                    sessionStorage.setItem("USER_STATUS", "isLogin")
                                                    this.$router.push({name: "WorkingSpace"})

                                                }
                                            })
                                    }
                                })
                            })
                            .catch(err => {
                                console.log("============nope=============")
                                console.log(err)
                                this.$alert('好像网络出了点问题……', '啊哦', {
                                    type: 'warning',
                                    center: true,
                                })
                            })
                    }
                })
            }
        },
        async created() {
            console.log(updateStatus())
            if (await updateStatus() === true) {
                this.$router.push('/WorkingSpace')
            }
        }
    }
</script>

<style>
    #login_page {
        height: 100%;
    }

    #login_page_main {
        /*background: url("../assets/img/login_bg.jpg") fixed center;

         */
        background-size: 100%;
        min-width: 1280px;
        min-height: 680px;
        margin: 0;
    }

    #login_page_footer {
    }

    #login_block {
        margin: 10% auto;
        width: 300px;
        padding: 10px 20px;
        border-radius: 10px;
        background: rgba(200, 200, 200, 0.5);
        transition: max-height 0.5s;
    }

</style>