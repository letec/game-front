import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import VueRouter from 'vue-router'
import VJstree from 'vue-jstree'
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VJstree)

import request from './logic/axios.js'
Vue.prototype.$axios = request.service

import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue);

import Login from './component/top-pages/Login.vue'
import Reg from './component/top-pages/Reg.vue'
import About from "./component/top-pages/About.vue"

import Header from "./component/public/header.vue"
import Footer from "./component/public/footer.vue"
Vue.component("header-view", Header)
Vue.component("footer-view", Footer)

import ChessHall from "./component/game/chineseChess/hall.vue"

const routes = [
    { path: '/', component: App },
    { path: '/signin', component: Login },
    { path: '/signup', component: Reg },
    { path: '/about', component: About },
    { path: '/chinessChess', component: ChessHall }
]

const router = new VueRouter({
    routes: routes
})

const app = new Vue({
    router: router,
}).$mount('#app')
