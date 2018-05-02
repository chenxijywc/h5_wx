// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import api from './api/api';
import App from './App'
import router from './router'
import mintUiCss from 'mint-ui/lib/style.css';
import mintUi from 'mint-ui';


Vue.config.productionTip = false;
Vue.use(mintUi);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
