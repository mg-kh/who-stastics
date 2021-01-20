<template>
  <highcharts :options="chartOptions" />
</template>

<script>
import Highcharts from "highcharts";
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
  computed: {
    theme() {
      return this.$vuetify.theme.dark;
    }
  },
  watch: {
    statistics(val) {
      this.chartOptions = {
        series: val
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
  data() {
    return {
      chartOptions: {
        chart: {
          type: "column",
          height: 500,
          style: {
            fontFamily: '"Rubik",sans-serif'
          }
        },
        title: {
          text: this.title
        },
        xAxis: {
          categories: [""],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: this.indicator
          }
        },
        tooltip: {
          headerFormat: "<b>{point.x}</b><br/>",
          pointFormat: "{series.name}: ({point.y}) %"
        },
        legend: {
          align: "center",
          x: 0,
          verticalAlign: "bottom",
          y: 0,
          floating: false,
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || "white",
          borderColor: "#CCC",
          borderWidth: 0,
          borderRadius: 3,
          shadow: false
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true
            },
            borderRadius: 0,
            maxPointWidth: 30
          },
          series: {
            maxPointWidth: 35,
            dataLabels: {
              enabled: true,
              format: "{y} %",
              style: {
                textOutline: "none",
                fontWeight: "bold"
              }
            }
          }
        },
        series: this.statistics
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
          },
          xAxis: {
            labels: {
              style: {
                color: "#1DE9B6"
              }
            }
          },
          yAxis: {
            title: {
              style: {
                color: "#1DE9B6"
              }
            },
            labels: {
              style: {
                color: "#fff"
              }
            }
          },
          plotOptions: {
            series: {
              dataLabels: {
                color: "#1DE9B6"
              }
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
            }
          },
          plotOptions: {
            series: {
              dataLabels: {
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
