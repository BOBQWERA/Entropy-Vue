// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import ElementUi from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import './assets/global.css'
import {Base64} from 'js-base64'



axios.defaults.baseURL = 'http://127.0.0.1:8000'
// axios.interceptors.request.use(config => {
//   config.headers.token = window.localStorage.getItem('token');

//   return config
// })
Vue.prototype.$axios = axios
Vue.use(ElementUi)
Vue.use(Vuex)
Vue.use(Base64)


Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    username:"",
    nickname:"",
    user_id:0,
    signature:"",
    level:{
      id:1,
      type:"普通用户",
    },
    gender:0,
    credit:0,
    score:0,
    last_signed:"",
    token:"",
    temp_blog_id:0,
    temp_posting_id:0,
    temp_visit_id:0,
    temp_section_id:0,
    flashed_page:false,
    login_jump_url:"/home",
  },
  mutations: {
    reset(state){
      state.username=""
      state.nickname=""
      state.user_id=0
      state.signature=""
      state.level={id:1,type:"普通用户"}
      state.gender=0
      state.credit=0
      state.score=0
      state.last_signed=""
      state.token=""
      state.temp_blog_id = 0
      state.temp_section_id = 0
      state.temp_postingid = 0
      state.temp_visit_id = 0
      state.flashed_page=false
      state.login_jump_url="/home"
    },
    set_username(state,val){
      state.username = val
    },
    set_nickname(state,val){
      state.nickname = val
    },
    set_user_id(state,val){
      state.user_id = val
    },
    set_signature(state,val){
      state.signature = val
    },
    set_level_id(state,val){
      state.level_id = val
    },
    set_level_type(state,val){
      state.level_type = val
    },
    set_gender(state,val){
      state.gender = val
    },
    set_credit(state,val){
      state.credit = val
    },
    set_score(state,val){
      state.score = val
    },
    set_last_signed(state,val){
      state.last_signed = val
    },
    set_token(state,val){
      state.token = val
    },
    set_temp_blog_id(state,val){
      state.temp_blog_id = val
    },
    set_temp_section_id(state,val){
      state.temp_section_id = val
    },
    set_temp_posting_id(state,val){
      state.temp_posting_id = val
    },
    set_temp_visit_id(state,val){
      state.temp_visit_id = val
    },
    set_flashed_page(state,val){
      state.flashed_page = val
    },
    set_login_jump_url(state,val){
      state.login_jump_url = val
    },
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  components: { App },
  template: '<App/>'
})
