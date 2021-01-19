import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import ApiServices from "@/api/index";
import HighchartsVue from "highcharts-vue";

Vue.config.productionTip = false;
ApiServices.init();
Vue.use(HighchartsVue);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
