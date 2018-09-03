import Vue from 'vue'
import bootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './components/App'
import router from './router'
import store from './store'

// Set config values
Vue.config.productionTip = false

// Load plugins
Vue.use(bootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
