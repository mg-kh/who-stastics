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
          height: 550
        },
        title: {
          text: this.title
        },
        xAxis: {
          categories: this.country,
          title: {
            text: "Countries (South East Asia)"
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: this.indicator
          },
          stackLabels: {
            enabled: true,
            style: {
              fontWeight: "bold",
              textOutline: "0px"
            },
            format: "Ttl ({total})"
          }
        },
        legend: {
          align: "right",
          x: 0,
          verticalAlign: "top",
          y: 15,
          floating: false,
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || "white",
          borderColor: "#CCC",
          borderWidth: 0,
          borderRadius: 3,
          shadow: false
        },
        tooltip: {
          headerFormat: "<b>{point.x}</b><br/>",
          pointFormat: "{series.name}: ({point.y}) %"
        },
        plotOptions: {
          column: {
            stacking: "normal",
            borderRadius: 0,
            dataLabels: {
              enabled: true
            }
          },
          series: {
            maxPointWidth: 35
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
            title: {
              style: {
                color: "#1DE9B6"
              }
            },
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
            },
            stackLabels: {
              style: {
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
