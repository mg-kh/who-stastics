<template>
  <highcharts
    :constructorType="'mapChart'"
    class="hc"
    :options="chartOptions"
    ref="chart"
  />
</template>

<script>
import AsiaMap from "@highcharts/map-collection/custom/asia.geo.json";
export default {
  props: {
    country: {
      type: Array,
      default() {
        return [];
      }
    },
    indicator: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    statistics: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      chartOptions: {
        chart: {
          map: AsiaMap,
          height: 550,
          backgroundColor: "#4b96af",
          style: {
            fontFamily: '"Rubik",sans-serif'
          }
        },
        title: {
          text: this.title
        },
        subtitle: {
          text: this.indicator
        },
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            alignTo: "spacingBox"
          }
        },
        tooltip: {
          formatter: function() {
            return `
            <b>${this.point.name}</b> 
            <br/>
            Male : ${this.point.male} %, 
            <br/>
            Female : ${this.point.female} %,
            <br/>
            Total : ${this.point.value} %,
            `;
          }
        },
        colorAxis: {
          min: 0,
          minColor: "#F1F3FF",
          maxColor: "#2196F3"
        },
        series: [
          {
            dataLabels: {
              enabled: true,
              format: "{point.name}"
            },
            allAreas: false,
            colorKey: "value",
            data: this.statistics,
            joinBy: ["iso-a2", "code"]
          }
        ],
        plotOptions: {
          series: {
            states: {
              hover: {}
            }
          }
        }
      }
    };
  },
  mounted() {
    if (!this.theme) {
      this.fixChartTheme("light");
    } else {
      this.fixChartTheme("dark");
    }
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark;
    }
  },
  watch: {
    statistics(val) {
      this.chartOptions = {
        series: {
          data: val
        }
      };
    },
    theme(val) {
      if (val) {
        this.fixChartTheme("dark");
      } else {
        this.fixChartTheme("light");
      }
    }
  },
  methods: {
    fixChartTheme(val) {
      if (val === "dark") {
        this.chartOptions = {
          chart: {
            backgroundColor: "#37474F"
          },
          title: {
            style: {
              color: "#1DE9B6"
            }
          },
          subtitle: {
            style: {
              color: "#1DE9B6"
            }
          }
        };
      } else if (val === "light") {
        this.chartOptions = {
          chart: {
            backgroundColor: "#E3F2FD"
          },
          title: {
            style: {
              color: "#333"
            }
          },
          subtitle: {
            style: {
              color: "#333"
            }
          },
          xAxis: {
            labels: {
              style: {
                color: "#333"
              }
            },
            title: {
              style: {
                color: "#333"
              }
            }
          },
          yAxis: {
            title: {
              style: {
                color: "#333"
              }
            },
            labels: {
              style: {
                color: "#333"
              }
            },
            stackLabels: {
              style: {
                color: "#333"
              }
            }
          }
        };
      }
    }
  }
};
</script>

<style lang="scss">
.highcharts-name-myanmar {
  // stroke-width: 2;
  fill: rgb(221, 134, 75);
}
</style>
