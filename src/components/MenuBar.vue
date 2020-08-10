<template>
    <div id="navigate_bar" :class="{navigate_bar : isFixed}">
        <el-menu
                :default-active="active"
                class="nv_bar"
                mode="horizontal">

            <el-menu-item id="menu_logo" index="0" @click="toHome">
                <img src="../assets/icon/logo.png" alt="" width="40" height="40">
            </el-menu-item>

            <el-menu-item index="6" v-if="!isLogin" id="menu_login_tag" class="navigate_bar_item" @click="toLoginPage">
                登录/注册
            </el-menu-item>
            <el-menu-item index="6" v-if="isLogin" id="menu_login_tag" class="navigate_bar_item" @click="toUserCenter">
                你好,{{ userName }}
            </el-menu-item>

            <el-menu-item v-if="showSearchBar" id="nv_bar_search_block" index="5">
                <SearchBar/>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    /**
     *      README
     *      组件使用方法参考上机例子里的那个Navigator，需要传入两个参数
     *      @param return 这个你们一律填 True，注意大小写，False 时主页跳转失效
     *      @param showSearch 这个你们看情况，True 时显示右侧搜索栏，False 时隐藏
     *      @param active 默认激活的是哪一项，CSS样式相关，不涉及功能性，只涉及美观度
     *      创作中心、用户中心、登录/注册(在SearchBar中) 的 @click 不知道相关信息暂没有添加，你们自行添加测试，记得把改动部分给我一份哈
     */
    import SearchBar from "../components/SearchBar";
    import {updateUserStatus} from "../utils/axiosUtils";

    export default {
        name: "MenuBar",
        components: {SearchBar},
        props: {
            return: String,
            showSearch: String,
            active: String,
        },
        data() {
            return {
                isFixed: false,
                offsetTop: 0,
                returnType: this.return === "True",
                showSearchBar: this.showSearch === "True",
                searchInput: "",
            };
        },
        mounted() {
            this.offsetTop = document.querySelector("#navigate_bar").offsetTop;
            window.addEventListener('scroll', this.handleScroll);
        },
        created() {
            this.isLogin = this.$store.getters.getLoginStatus;
            if (this.isLogin === false) {
                updateUserStatus()
            }
            this.isLogin = this.$store.getters.getLoginStatus;
            this.userName = this.$store.getters.getUserName;
            //console.log("!===loading MenuBar===!" + this.$route.path)
            //console.log(this.isLogin);
            //console.log(this.userName);
        },
        computed: {
            isLogin:{
                get(){
                    return this.$store.getters.getLoginStatus;
                },
                set(){
                }
            },
            userName:{
                get() {
                    return this.$store.getters.getUserName;
                },
                set(){
                }

            },
        }
        ,
        methods: {
            toHome() {
                if (this.returnType)
                    this.$router.push({name: 'Home'});
            },
            handleScroll() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop >= this.offsetTop) {
                    this.isFixed = true;
                } else {
                    this.isFixed = false;
                }
            },
            toWriteCenter: function () {
                this.$router.push({name: "BlogAdd"});
            },
            toUserCenter: function () {
                this.$router.push({name: 'MyInfo'});
            },
            toLoginPage: function () {
                this.$router.push({name: "Login"});
            }

        },
        watch: {
            $route() {
                this.isLogin = this.$store.getters.getLoginStatus;
                this.userName = this.$store.getters.getUserName;
                //console.log("===================");
                //console.log("MenuBar route watcher:");
                //console.log(this.isLogin);
                //console.log(this.userName);
                //console.log("===================");
            }
        },
        destroy() {
            window.removeEventListener('scroll', this.handleScroll);
        }
    };
</script>

<style>
    #navigate_bar {
        background: rgba(255, 255, 255, 0.8);
        border: 0;
        border-radius: 10px;
        height: 60px;
        width: 100%;
        z-index: 3;
    }

    .navigate_bar {
        position: fixed;
        z-index: 2;
        top: 0;
        height: 60px;
        width: 100%;
    }

    #nv_bar_search_block {
        float: right;
        height: 44px;
        margin-top: 10px;
        padding: 0px;
    }

    #nv_bar_search_block.is-active {
        border-bottom: 0px solid white;
    }

    #nv_bar_logo.is-active {
        border-bottom: 0px solid white;
    }

    .nv_bar {
        height: 60px;
    }

    .navigate_bar_item {
        width: 100px;
    }

    #menu_login_tag {
        float: right;
        padding: 0px;
    }
</style>