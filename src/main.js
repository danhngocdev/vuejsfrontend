import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
