import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import ApiServices from "@/api/index";
import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
import Maps from "highcharts/modules/map";
import "@/styles/variables.scss";

Vue.config.productionTip = false;
ApiServices.init();
Maps(Highcharts);
Vue.use(HighchartsVue);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
