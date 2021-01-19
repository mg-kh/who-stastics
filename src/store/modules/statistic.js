import { Statistic } from "@/api/index.js";
import { GET_STATISTIC_DATA } from "@/store/action-methods";
import {
  SET_STATISTIC,
  FILTER_COUNTRIES,
  CHOOSE_COUNTRY
} from "@/store/mutation-methods";
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
    chooseCountryData: []
  },
  getters: {
    getFilterCountriesChartData(state) {
      const southEastAsiaCountries = state.filterCountries;

      const period = state.period;

      const selected = _.reduce(
        period,
        (a, b) => {
          // ? Filter Same Period Countries
          const filterByYear = _.filter(southEastAsiaCountries, country => {
            return country.Period === b;
          });

          // ? Zipping Same Period Tooltip Data
          const zipData = _.reduce(
            filterByYear,
            (a, b) => {
              a.name = b.Period;
              a.data = [];
              _.forEach(filterByYear, item =>
                a.data.push(item["First Tooltip"])
              );
              return a;
            },
            {}
          );

          a.push(zipData);
          return a;
        },
        []
      );
      return selected;
    }
  },
  mutations: {
    [SET_STATISTIC](state, statistics) {
      const { data, title } = statistics;
      state.statistic = data;
      state.title = title;

      // ? Filter South East Asia Countries With Default Gender
      const filter = _.filter(
        state.statistic,
        o =>
          _.includes(state.southEastAsia, o.Location) && o.Dim1 === "Both sexes"
      );

      // ? Get Periods From SouthEastAsia Countries
      const period = _.reduce(
        filter,
        (a, b) => {
          if (!_.includes(a, b.Period)) {
            a.push(b.Period);
          }
          return a;
        },
        []
      );

      // ? filter Selected country with default
      const filterByCountry = _.filter(filter, country => {
        return country.Location === "Myanmar";
      });

      // ? Zip Same Selected Country Data
      const countryData = _.reduce(
        filterByCountry,
        (a, b) => {
          a.unshift({
            name: b.Period,
            data: [b["First Tooltip"]]
          });
          return a;
        },
        []
      );

      state.filterCountries = filter;
      state.period = period;
      state.chooseCountryData = countryData;
      state.indicatorText = state.filterCountries[0].Indicator;
    },
    [FILTER_COUNTRIES](state, sex = "Both Sexes") {
      // ? Filter South East Asia Countries With Selected Gender
      const filter = _.filter(
        state.statistic,
        o => _.includes(state.southEastAsia, o.Location) && o.Dim1 === sex
      );

      // ? Filter country data with default selected country
      const filterByCountry = _.filter(filter, country => {
        return country.Location === "Myanmar";
      });

      // ? Zip country data with selected gender
      const countryData = _.reduce(
        filterByCountry,
        (a, b) => {
          a.unshift({
            name: b.Period,
            data: [b["First Tooltip"]]
          });
          return a;
        },
        []
      );

      state.chooseCountryData = countryData;
      state.filterCountries = filter;
    },
    [CHOOSE_COUNTRY](state, chooseCountry) {
      // ? filter country with selected country
      const filterByCountry = _.filter(state.filterCountries, country => {
        return country.Location === chooseCountry;
      });

      // ? Zip country data with selected country
      const countryData = _.reduce(
        filterByCountry,
        (a, b) => {
          a.unshift({
            name: b.Period,
            data: [b["First Tooltip"]]
          });
          return a;
        },
        []
      );
      state.chooseCountryData = countryData;
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
            reject(error.response.data.message);
          });
      });
    }
  }
};

export default statistic;
