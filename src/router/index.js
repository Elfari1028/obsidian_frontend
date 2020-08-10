import Vue from "vue";
import VueRouter from "vue-router";
import WorkingSpace from "@/views/WorkingSpace";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "WorkingSpace",
    },
    {
        path: "/MySpace",
        name: "WorkingSpace",
        component: WorkingSpace,
        meta: {
            title: "我的空间"
        }
    },
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
