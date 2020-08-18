<template>
    <div class="main_page">
        <el-container>
            <el-header style="padding: 0">
                <MenuBar :hide="2"/>
            </el-header>
            <el-container>
                <el-aside width="225px" id="aside_left">
                    <AsideMenu/>
                </el-aside><!--左边栏-->
                <el-main>
                    <el-page-header @back="goBack" :content="userInfo.username+'的个人主页'"></el-page-header>
                    <el-divider></el-divider>
                    <div id="info_form" v-loading="isLoading">
                        <el-form :model="userInfo" label-width="80px">
                            <el-form-item label="头像">
                                <el-avatar :size="100" :readonly="true"
                                           :src="userInfo.avatarUrl"
                                           :alt="userInfo.username"
                                           style="font-size: 30px;vertical-align: middle;margin-right: 30px">
                                    {{userInfo.username}}
                                </el-avatar>
                            </el-form-item>
                            <el-form-item label="用户名">
                                <el-input v-model="userInfo.username" :readonly="true"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱">
                                <el-input v-model="userInfo.email" :readonly="true"></el-input>
                            </el-form-item>
                            <el-form-item label="性别">
                                <el-radio-group :disabled="true" v-model="userInfo.sex">
                                    <el-radio :label="0">男</el-radio>
                                    <el-radio :label="1">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="电话">
                                <el-input :readonly="true" v-model="userInfo.tel"></el-input>
                            </el-form-item>
                            <el-form-item label="年龄">
                                <el-input :readonly="true" v-model="userInfo.age"></el-input>
                            </el-form-item>
                            <el-form-item label="个人简介">
                                <el-input :readonly="true" type="textarea" :rows="5" resize="none"
                                          v-model="userInfo.mood" maxlength="50" show-word-limit></el-input>
                            </el-form-item>
                        </el-form>

                    </div>
                </el-main><!--主体-->
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Config from "@/config";
    import MenuBar from "@/components/MenuBar";
    import AsideMenu from "@/components/AsideMenu";

    export default {
        name: "UserInfo",
        components: {AsideMenu, MenuBar},
        data() {
            return {
                isLoading: false,
                userInfo: {
                    username: 'test',
                    email: 'test@test.com',
                    sex: 0,
                    mood: 'test mood hahahahaha',
                    tel: '136xxxxxxxx',
                    age: 21,
                    avatarUrl: '',
                },
            }
        },
        methods: {
            goBack() {
              this.$router.go(-1);
            }
        },
        created: function () {
            this.userInfo.username = this.$route.params.username
            this.isLoading = true
            this.$axios.post('/account/get_public_information/', JSON.stringify({username: this.userInfo.username}), Config.axiosHeaders).then(res => {
                if (res.data.success) {
                    this.userInfo.email = res.data.email
                    this.userInfo.age = res.data.age
                    this.userInfo.sex = res.data.sex
                    this.userInfo.mood = res.data.mood
                    this.userInfo.tel = res.data.tel
                    this.userInfo.avatarUrl = Config.baseUrl.substring(0, Config.baseUrl.length - 1) + res.data.url
                } else {
                    this.$message.error(res.data.exc)
                }
            }).catch(err => {
                console.log(err)
                this.$message.error('网络出现了些问题？')
            })
            this.isLoading = false
        }
    }
</script>

<style scoped>
    .main_page {
        min-width: 1200px;
    }

    #aside_left {
        border-right: 1px solid #DEDFE6;
        height: auto;
        padding: 10px;
    }

    #aside_right {
        border-left: 1px solid #DEDFE6;
        height: auto;
        padding: 10px;
    }

    .list_empty_notice {
        color: darkgrey;
        height: inherit;
        padding-top: 20%;
    }

    #info_form {
        width: 45%;
        min-width: 400px;
        margin-left: 30px;
    }
</style>