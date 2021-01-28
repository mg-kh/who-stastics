<template>
  <highcharts id="chart" :options="chartOptions" />
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
          height: 550,
          style: {
            fontFamily: '"Rubik",sans-serif'
          }
        },
        title: {
          text: this.title
        },
        xAxis: {
          categories: this.country,
          title: {
            text: "Countries (South East Asia)"
          },
          labels: {
            formatter: function() {
              if (this.value === "Myanmar") {
                return `
                <b style="font-weight : bold; font-size : 13px">💓 ${this.value} </b>
              `;
              } else {
                return this.value;
              }
            }
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
        colors: ["#70C4FF", "#F04DFF"],
        plotOptions: {
          column: {
            borderRadius: 3,
            dataLabels: {
              enabled: true
            }
          },
          series: {
            maxPointWidth: 15,
            states: {
              select: {
                borderWidth: 4
              }
            }
          }
        },
        series: this.statistics
      }
    };
  },
  created() {
    const male = this.chartOptions.series[0].data[5];
    const female = this.chartOptions.series[1].data[5];
    this.chartOptions.series[0].data[5] = { y: male, selected: true };
    this.chartOptions.series[1].data[5] = { y: female, selected: true };
  },
  mounted() {
    const male = this.chartOptions.series[0].data[5];
    const female = this.chartOptions.series[1].data[5];
    this.chartOptions.series[0].data[5] = { y: male, selected: true };
    this.chartOptions.series[1].data[5] = { y: female, selected: true };
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
            }
          },
          plotOptions: {
            series: {
              states: {
                select: {
                  color: null,
                  borderColor: "white"
                }
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
          },
          plotOptions: {
            series: {
              states: {
                select: {
                  color: null,
                  borderColor: "black"
                }
              }
            }
          }
        };
      }
    }
  }
};
</script>
