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
              <v-radio-group
                dense
                hide-details
                v-model="gender"
                @change="changeGender"
                row
              >
                <v-radio color="radioBtn" value="Both sexes">
                  <template v-slot:label>
                    <span class="textColor--text"> Both</span>
                  </template>
                </v-radio>
                <v-radio color="radioBtn" value="Male">
                  <template v-slot:label>
                    <span class="textColor--text"> Male</span>
                  </template>
                </v-radio>
                <v-radio color="radioBtn" value="Female">
                  <template v-slot:label>
                    <span class="textColor--text"> Female</span>
                  </template>
                </v-radio>
              </v-radio-group>
              <v-spacer></v-spacer>
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
                  <!-- Staci Column -->
                  <stack-column
                    v-if="!isLoading"
                    :country="country"
                    :indicator="indicator"
                    :statistics="statisticsData"
                    :title="title"
                  ></stack-column>
                </v-carousel-item>
                <v-carousel-item>
                  <v-select
                    dense
                    solo
                    hide-details
                    item-color="teal accent-3"
                    class="select--box mb-2 ml-auto"
                    label="Choose Country"
                    :items="country"
                    v-model="chooseCountry"
                    @change="chooseTheCountry"
                  ></v-select>
                  <column-chart
                    v-if="!isLoading"
                    :country="country"
                    :indicator="indicator"
                    :statistics="chooseCountryData"
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
import { FILTER_COUNTRIES, CHOOSE_COUNTRY } from "@/store/mutation-methods";
import StackColumn from "@/components/StackColumn";
import ColumnChart from "@/components/ColumnChart";
import { mapActions } from "vuex";
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
export default {
  data() {
    return {
      gender: "Both sexes",
      category: "600255a7e31fbc3bdef4433e",
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
          id: "6004305b4f42973a289dfc3c",
          name: "HIV Infection Rate"
        }
      ],
      chooseCountry: "Myanmar"
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
    indicator() {
      return this.$store.state.statistic.indicatorText;
    },
    title() {
      return this.$store.state.statistic.title;
    },
    chooseCountryData() {
      return this.$store.state.statistic.chooseCountryData;
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
          this.gender = "Both sexes";
        })
        .catch(message => {
          console.log(message);
        });
    },

    changeGender() {
      this.$store.commit(`${FILTER_COUNTRIES}`, this.gender);
      this.chooseTheCountry();
    },

    chooseTheCountry() {
      this.$store.commit(`${CHOOSE_COUNTRY}`, this.chooseCountry);
    }
  }
};
</script>

<style lang="scss" scoped>
.select--box {
  max-width: 250px;
}
</style>
