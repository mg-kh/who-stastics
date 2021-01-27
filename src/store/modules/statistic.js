import { Statistic } from "@/api/index.js";
import { GET_STATISTIC_DATA } from "@/store/action-methods";
import { SET_STATISTIC, CHOOSE_YEAR } from "@/store/mutation-methods";
import changeCountryCode from "@/plugins/changeCountryCode";
import _ from "lodash";

const statistic = {
  state: {
    statistic: [],
    southEastAsia: [
      "Thailand",
      "Myanmar",
      "Cambodia",
      "Lao People's Democratic Republic",
      "Viet Nam",
      "Malaysia",
      "Indonesia",
      "Philippines",
      "Singapore",
      "Brunei Darussalam",
      "Timor-Leste"
    ].sort(),
    filterCountries: [],
    period: [],
    indicatorText: "",
    title: "",
    chooseCountryData: [],
    mapCountryData: []
  },
  getters: {
    getFilterCountriesChartData(state) {
      return state.chooseCountryData;
    },
    getMapCountryData(state) {
      return state.mapCountryData;
    }
  },
  mutations: {
    [SET_STATISTIC](state, statistics) {
      const { data, title } = statistics;
      state.statistic = data;
      state.title = title;
      state.indicatorText = data[0]["Indicator"];

      // ? [2015 , 2000 , 2010] Period
      const period = _.reduce(
        state.statistic,
        (a, b) => {
          if (!_.includes(a, b.Period)) {
            a.push(b.Period);
          }
          return a;
        },
        []
      );

      // ? Filter South East Asia Countries With Default Period
      const filter = _.filter(
        state.statistic,
        o =>
          _.includes(state.southEastAsia, o.Location) &&
          o.Period === period[period.length - 1]
      );

      // ? Make Map Data
      const changeIsoCode = changeCountryCode.install();
      const mapCountryData = _.reduce(
        state.southEastAsia,
        (a, b) => {
          const groupingSameCountries = _.filter(filter, country => {
            return country.Location === b;
          });
          if (groupingSameCountries.length > 0) {
            a.push({
              code: changeIsoCode(b).toUpperCase(),
              value: groupingSameCountries[0]["First Tooltip"],
              male: groupingSameCountries[1]["First Tooltip"],
              female: groupingSameCountries[2]["First Tooltip"]
            });
          }
          return a;
        },
        []
      );

      const male = _.filter(filter, data => data.Dim1 === "Male");
      const female = _.filter(filter, data => data.Dim1 === "Female");

      const countryData = [
        {
          name: "Male",
          data: male.map(data => data["First Tooltip"])
        },
        {
          name: "Female",
          data: female.map(data => data["First Tooltip"])
        }
      ];

      state.chooseCountryData = countryData;
      state.filterCountries = filter;
      state.period = period;
      state.mapCountryData = mapCountryData;
    },

    [CHOOSE_YEAR](state, period) {
      // ? Filter South East Asia Countries With selected Period
      const filter = _.filter(
        state.statistic,
        o => _.includes(state.southEastAsia, o.Location) && o.Period === period
      );

      // ? Make Map Data
      const changeIsoCode = changeCountryCode.install();
      const mapCountryData = _.reduce(
        state.southEastAsia,
        (a, b) => {
          const groupingSameCountries = _.filter(filter, country => {
            return country.Location === b;
          });
          if (groupingSameCountries.length > 0) {
            a.push({
              code: changeIsoCode(b).toUpperCase(),
              value: groupingSameCountries[0]["First Tooltip"],
              male: groupingSameCountries[1]["First Tooltip"],
              female: groupingSameCountries[2]["First Tooltip"]
            });
          }
          return a;
        },
        []
      );

      const male = _.filter(filter, data => data.Dim1 === "Male");
      const female = _.filter(filter, data => data.Dim1 === "Female");

      const countryData = [
        {
          name: "Male",
          data: male.map(data => data["First Tooltip"])
        },
        {
          name: "Female",
          data: female.map(data => data["First Tooltip"])
        }
      ];

      state.chooseCountryData = countryData;
      state.mapCountryData = mapCountryData;
    }
  },

  actions: {
    [GET_STATISTIC_DATA]({ commit }, category) {
      return new Promise((resolve, reject) => {
        Statistic.get(category)
          .then(({ data }) => {
            commit(SET_STATISTIC, data);
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default statistic;
