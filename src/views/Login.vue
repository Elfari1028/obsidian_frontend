<template>
    <div id="login_page">
        <MenuBar return="True" show-search="True" active="6"/>
        <el-container>
            <el-main id="login_page_main">
                <div id="login_block">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="账号登录" name="username-login">
                            <el-form style="margin-top: 10px">
                                <el-form-item>
                                    <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" style="float: right" @click="submitLogin">登录<i
                                            class="el-icon-arrow-right"></i>
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="注册账号" name="register">
                            <el-form :model="registerForm" :rules="rules" ref="registerForm" style="margin-top: 10px">
                                <el-form-item prop="username">
                                    <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
                                </el-form-item>
                                <el-form-item prop="emailAddr">
                                    <el-input v-model="registerForm.email"
                                              placeholder="邮箱"></el-input>
                                </el-form-item>
                                <el-form-item prop="password">
                                    <el-input type="password" v-model="registerForm.password"
                                              placeholder="密码"></el-input>
                                </el-form-item>
                                <el-form-item prop="checkPassword">
                                    <el-input type="password" v-model="registerForm.checkPassword"
                                              placeholder="确认密码"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" style="float: right" @click="submitRegister">注册<i
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
    import {registerAxiosPost, updateUserStatus} from "../utils/axiosUtils";
    //import {getToken} from "../utils/auth";

    export default {
        name: "Login",
        components: {MenuBar},
        data() {
            const validateUsername = async (rule, value, callback) => {
                const pattern = /[^0-9a-zA-Z]/g;
                if (pattern.test(value)) {
                    callback(new Error('用户名中含有非法字符,应仅使用数字和字母'))
                } else if (/[0-9]/g.test(value[0])) {
                    callback(new Error('用户名必须以英文字母开头'))
                }
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
                    username: '',
                    password: ''
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
                console.log(this.loginForm)
                let jumpUrl = "/WorkingSpace"
                this.$axios.post('/account/login1/', JSON.stringify(this.loginForm), {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.data.status === 0)
                    {
                        this.$message({
                            type: 'success',
                            message: '登陆成功！',
                            duration: '2000'
                        });
                        return true;
                    }
                    else {
                        this.$message({
                            type: 'error',
                            message: '用户名或密码出错'
                        })
                        return false;
                    }
                }).catch((err) => {
                    console.log(err);
                    this.$message({
                        type: 'error',
                        message: '请检查网络哦'
                    });
                    return false;
                })
                updateUserStatus()
                this.$router.push({path: jumpUrl})
            },
            submitRegister: async function () {
                console.log(this.registerForm)
                await this.$refs['registerForm'].validate(valid => {
                    if (valid) {
                        registerAxiosPost(this.registerForm)
                            .then(res => {
                                console.log("============yes==========")
                                console.log(res)
                                this.$alert('注册成功', '啊哈', {
                                    center: true,
                                    callback: () => {
                                        this.$router.push({name: 'WorkingSpace'})
                                    }
                                })
                            })
                            .catch(err => {
                                console.log("============nope=============")
                                console.log(err)
                                this.$alert('好像网络出了点问题……', '啊哦', {
                                    type: 'warning',
                                    center: true,
                                });
                            })
                    }
                })

            }
        },

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
        background-color: rgba(228, 231, 237, 0.95);
        transition: max-height 0.5s;
    }

</style>