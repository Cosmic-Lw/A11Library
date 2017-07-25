// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import VueQuillEditor from 'vue-quill-editor'
import 'iview/dist/styles/iview.css'
import Vuex from 'vuex'

Vue.use(iView)
Vue.use(VueQuillEditor)
Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
