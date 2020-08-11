<template>
    <div>
        <el-container>
            <el-header style="padding: 0">
                <MenuBar/>
            </el-header>
            <el-container>
                <el-aside width="200px" id="aside">
                    <AsideMenu/>
                </el-aside>
                <el-main>
                    <div id="info_form">
                        <el-form ref="form" :rules="rules" :model="userInfo" label-width="80px">
                            <el-form-item label="">
                                <el-avatar :size="100" :src="userInfo.avatarUrl" :alt="userInfo.username" style="font-size: 30px">{{userInfo.username}}
                                </el-avatar>
                            </el-form-item>
                            <el-form-item label="用户名">
                                <el-input :disabled="!onEdit" v-model="userInfo.username"></el-input>
                            </el-form-item>
                            <el-form-item label="性别">
                                <el-radio-group :disabled="!onEdit" v-model="userInfo.sex">
                                    <el-radio :label="0">男</el-radio>
                                    <el-radio :label="1">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="个人简介">
                                <el-input :disabled="!onEdit" type="textarea" :rows="5" v-model="userInfo.mood"></el-input>
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

    export default {
        name: "UserCenter",
        components: {AsideMenu, MenuBar},
        data() {
            return {
                onEdit: false,
                userInfo: {
                    username: 'test',
                    avatarUrl: '',
                    sex: 0,
                    mood: 'test mood hahahahaha'
                },
            }
        },
        methods: {
            changeInfo() {
                this.onEdit = !this.onEdit
            },
            saveEdit() {
                this.onEdit = !this.onEdit
                //post
            }
        },
        created() {
            console.log(this.$route.path)
            //get
        }
    }
</script>

<style scoped>
    #aside {
        border-right: 1px solid #DEDFE6;
        height: auto;
        padding: 10px;
    }

    #info_form{
        width: 45%;
        min-width: 400px;
        margin-left: 30px;
    }
</style>