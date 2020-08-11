import Vue from "vue";
import VueRouter from "vue-router";
import WorkingSpace from "@/views/WorkingSpace";
import Login from "@/views/Login";
import TrashCan from "@/views/TrashCan";

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

];

const router = new VueRouter({
    routes
});

export default router;
