import Vue from "vue";
import VueRouter from "vue-router";
import WorkingSpace from "@/views/WorkingSpace";
import Login from "@/views/Login";
import TrashCan from "@/views/TrashCan";
import History from "@/views/History";
import Collections from "@/views/Collections";
import UserCenter from "@/views/UserCenter";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "Login",
    },
    {
        path: "/Login",
        name: "Login",
        component: Login,
        meta: {
            title: "登录",
            isLogin: false,
        }
    },
    {
        path: "/WorkingSpace",
        name: "WorkingSpace",
        component: WorkingSpace,
        meta: {
            title: "我的空间",
            isLogin: true,
        }
    },
    {
        path: "/TrashCan",
        name: "TrashCan",
        component: TrashCan,
        meta: {
            title: "回收站",
            isLogin: true,
        }
    },
    {
        path: "/History",
        name: "History",
        component: History,
        meta: {
            title: "最近浏览",
            isLogin: true,
        }
    },
    {
        path: "/Collections",
        name: "Collections",
        component: Collections,
        meta: {
            title: "我的收藏",
            isLogin: true,
        }
    },
    {
        path: "/UserCenter",
        name: "UserCenter",
        component: UserCenter,
        meta: {
            title: "个人中心",
            isLogin: true,
        }
    },

];

const router = new VueRouter({
    routes
});

export default router;
