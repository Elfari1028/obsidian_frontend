import Vue from "vue";
import VueRouter from "vue-router";
import WorkingSpace from "@/views/WorkingSpace";
import store from "../vuex/store";
import Login from "@/views/Login";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "Login",
    },
    {
        path: "/WorkingSpace",
        name: "WorkingSpace",
        component: WorkingSpace,
        meta: {
            title: "我的空间"
        }
    },
    {
        path: "/Login",
        name: "Login",
        component: Login,
        meta: {
            title: "登录"
        }
    }
];

const router = new VueRouter({
    routes
});

router.beforeEach(async (to, from, next) => {
    document.title = to.meta.title;
    store.commit('SET_LAST_PATH', from.path);
    next();
})

export default router;
