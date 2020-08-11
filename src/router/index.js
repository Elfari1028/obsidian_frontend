import Vue from "vue";
import VueRouter from "vue-router";
import WorkingSpace from "@/views/WorkingSpace";
import Login from "@/views/Login";
import Test from "@/views/Test.vue"

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
            title: "我的空间",
            isLogin: true,
        }
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
		path: "/Test",
		name: "Test",
		component: Test
	}
];

const router = new VueRouter({
    routes
});

export default router;
