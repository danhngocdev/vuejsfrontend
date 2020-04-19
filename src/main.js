import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
axios.defaults.withCredentials = false;
axios.defaults.crossDomain = true;
new Vue({
  render: h => h(App),
}).$mount('#app')
