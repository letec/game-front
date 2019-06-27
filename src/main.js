import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import VueRouter from 'vue-router'
import Login from './component/top-pages/Login.vue'
import Reg from './component/top-pages/Reg.vue'
import About from "./component/top-pages/About.vue"

import header from "./component/public/header.vue"
import footer from "./component/public/footer.vue"
Vue.component("header-view", header);
Vue.component("footer-view", footer);

Vue.use(VueRouter)
Vue.use(BootstrapVue)

const routes = [
    { path: '/', component: App },
    { path: '/login', component: Login },
    { path: '/signin', component: Reg },
    { path: '/about', component: About }
]

const router = new VueRouter({
    routes: routes
})

const app = new Vue({
    router: router,
}).$mount('#app')