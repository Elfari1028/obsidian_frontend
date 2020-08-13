import Vue from 'vue';
import App from './App.vue';
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en"
import qs from 'qs';
import store from './vuex/store';
import VueCookies from 'vue-cookies';
import router from "./router";
import axios from 'axios';
import mavonEditor from 'mavon-editor';
import {Message, MessageBox, Loading} from 'element-ui';
import 'mavon-editor/dist/css/index.css';
import "element-ui/lib/theme-chalk/index.css";
import './utils/axiosUtils'
import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.config.productionTip = false;

Vue.use(ElementUI, {locale});
Vue.use(mavonEditor);
Vue.use(VueCookies);
Vue.use(Loading.directive);
Vue.use(CKEditor);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;

//axios.defaults.baseURL = "";
axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.withCredentials = true;
Vue.prototype.$cookies.config('1d');

// router.beforeEach((to, from, next) => {
//     let getFlag = sessionStorage.getItem("USER_STATUS");
//     if (getFlag === "isLogin") {
//         updateStatus()
//         if (to.meta.title) {
//             document.title = to.meta.title
//         }
//         next()
//     } else if (to.meta.isLogin && from.name !== 'Login') {
//         next({
//             name: 'Login'
//         })
//     } else {
//         if (to.meta.title) {
//             document.title = to.meta.title
//         }
//         next()
//     }
// })

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');

