import Vue from "vue";
import { API_URL } from "@/api/config.js";
import VueAxios from "vue-axios";
import axios from "axios";

const ApiServices = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
    Vue.axios.defaults.headers.common["secret-key"] =
      "$2b$10$gKV92JeEtP3LghQd6ophX.YemoeUlKcoViu9/eF21SvhH/L1cAqPy";
  },

  get(resource, slug = "") {
    return Vue.axios.get(`${resource}/${slug}`);
  }
};

export default ApiServices;

export const Statistic = {
  get(slug) {
    return ApiServices.get("b", slug);
  }
};
