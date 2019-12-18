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

import swal from 'sweetalert2'
Vue.prototype.$swal = swal;

import Login from './component/top-pages/Login.vue'
import Reg from './component/top-pages/Reg.vue'
import Settings from './component/top-pages/Settings.vue'
import About from "./component/top-pages/About.vue"

import Header from "./component/public/header.vue"
import Footer from "./component/public/footer.vue"
Vue.component("header-view", Header)
Vue.component("footer-view", Footer)

import ChinessChess from "./component/game/chineseChess/hall.vue"
import ChinessChessTable from "./component/game/chineseChess/table.vue"

const routes = [
    { name: 'index', path: '/', component: App },
    { name: 'settings', path: '/settings', component: Settings },
    { name: 'signin', path: '/signin', component: Login },
    { name: 'signup', path: '/signup', component: Reg },
    { name: 'about', path: '/about', component: About },
    { name: 'chinessChess', path: '/chinessChess', component: ChinessChess },
    { name: 'chinessChessTable', path: '/chinessChessTable', component: ChinessChessTable },
]

const router = new VueRouter({
    routes: routes
})

const app = new Vue({
    router: router,
}).$mount('#app')
