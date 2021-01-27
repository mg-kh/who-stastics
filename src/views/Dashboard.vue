<template>
  <section>
    <v-container>
      <v-row>
        <v-col>
          <v-card
            outlined
            min-height="550"
            class="containerCardBackground"
            tile
          >
            <!-- loading -->
            <v-overlay absolute v-if="isLoading" color="blue lighten-5">
              <v-avatar size="150" color="blue-grey darken-4">
                <lottie-animation
                  path="./lottie-loader.json"
                ></lottie-animation>
              </v-avatar>
            </v-overlay>

            <!-- Radio and Seletc Box -->
            <v-card-title class="pt-1">
              <!-- Category Select -->
              <article>
                <label class="text-caption textColor--text"
                  >Choose Category:</label
                >
                <v-select
                  :items="categoryItems"
                  item-text="name"
                  item-value="id"
                  label="Choose Category"
                  v-model="category"
                  @change="getTheStatistics"
                  dense
                  solo
                  hide-details
                  item-color="teal accent-3"
                  class="select--box"
                ></v-select>
              </article>

              <v-spacer></v-spacer>
              <!-- Year Select -->
              <article>
                <label class="text-caption textColor--text">Choose Year:</label>
                <v-select
                  dense
                  hide-details
                  item-color="teal accent-3"
                  class="select--box mb-2 ml-auto"
                  label="Choose Year"
                  :items="period"
                  v-model="selectedPeriod"
                  @change="periodSelected"
                  solo
                ></v-select>
              </article>
            </v-card-title>

            <!-- Barchart -->
            <v-card-text>
              <v-carousel
                height="100%"
                hide-delimiters
                show-arrows-on-hover
                :continuous="false"
                :light="!this.$vuetify.theme.dark"
              >
                <template v-slot:prev="{ on, attrs }">
                  <v-btn
                    small
                    fab
                    dark
                    color="BtnColor"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-chevron-left</v-icon>
                  </v-btn>
                </template>
                <template v-slot:next="{ on, attrs }">
                  <v-btn
                    small
                    fab
                    dark
                    color="BtnColor"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </template>

                <v-carousel-item>
                  <!-- Stacked Column -->
                  <stack-column
                    v-if="!isLoading"
                    :country="country"
                    :indicator="indicator"
                    :statistics="statisticsData"
                    :title="title"
                  ></stack-column>
                </v-carousel-item>

                <v-carousel-item>
                  <column-chart
                    v-if="!isLoading"
                    :country="country"
                    :indicator="indicator"
                    :statistics="mapCountryData"
                    :title="title"
                  ></column-chart>
                </v-carousel-item>
              </v-carousel>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { GET_STATISTIC_DATA } from "@/store/action-methods";
import { CHOOSE_YEAR } from "@/store/mutation-methods";
import StackColumn from "@/components/StackColumn";
import ColumnChart from "@/components/ColumnChart";
import { mapActions } from "vuex";
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
export default {
  data() {
    return {
      // category: "600255a7e31fbc3bdef4433e",
      category: "60025639f98f6e35d5fd18a8",
      isLoading: true,
      categoryItems: [
        {
          id: "600255a7e31fbc3bdef4433e",
          name: "Cancer Dying Rate"
        },
        {
          id: "60025639f98f6e35d5fd18a8",
          name: "Tobacco Smoking Rate"
        },
        {
          id: "6002571ee31fbc3bdef44396",
          name: "Alchol Substance Abuse"
        },
        {
          id: "60025797e31fbc3bdef443a8",
          name: "Crude Suicide Rate"
        },
        {
          id: "600ff70dbca934583e41e88e",
          name: "HIV Infection Rate"
        }
      ],
      chooseCountry: "Myanmar",
      selectedPeriod: ""
    };
  },
  components: {
    StackColumn,
    ColumnChart,
    LottieAnimation
  },
  created() {
    this.getTheStatistics();
  },
  computed: {
    country() {
      return this.$store.state.statistic.southEastAsia;
    },
    statisticsData() {
      return this.$store.getters.getFilterCountriesChartData;
    },
    mapCountryData() {
      return this.$store.getters.getMapCountryData;
    },
    indicator() {
      return this.$store.state.statistic.indicatorText;
    },
    title() {
      return this.$store.state.statistic.title;
    },
    period() {
      return this.$store.state.statistic.period;
    },
    chooseCountryData() {
      return this.$store.state.statistic.chooseCountryData;
    }
  },
  watch: {
    period(val) {
      this.selectedPeriod = val[val.length - 1];
    }
  },
  methods: {
    ...mapActions({
      get_the_statistics: `${GET_STATISTIC_DATA}`
    }),

    getTheStatistics() {
      this.isLoading = true;
      this.get_the_statistics(this.category)
        .then(() => {
          this.isLoading = false;
          this.chooseCountry = "Myanmar";
        })
        .catch(message => {
          console.log(message);
        });
    },

    periodSelected() {
      this.$store.commit(CHOOSE_YEAR, this.selectedPeriod);
    }
  }
};
</script>

<style lang="scss" scoped>
.select--box {
  max-width: 250px;
}
</style>
