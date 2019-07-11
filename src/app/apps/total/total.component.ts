import { Component, OnInit } from "@angular/core";

declare const $: any;
declare const jQuery: any;
declare const ApexCharts: any;
declare const Chart: any;

@Component({
  selector: "app-total",
  templateUrl: "./total.component.html",
  styleUrls: ["./total.component.scss"]
})
export class TotalComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    "use strict";
    var data = [],
      totalPoints = 110;
    var updateInterval = 320;
    var realtime = "on";

    $(function() {
      //Real time ==========================================================================================
      var plot = $.plot("#real_time_customer", [getRandomData()], {
        series: {
          shadowSize: 0,
          color: "rgb(0, 188, 212)"
        },
        grid: {
          borderColor: "#f3f3f3",
          borderWidth: 1,
          tickColor: "#f3f3f3"
        },
        lines: {
          fill: true
        },
        yaxis: {
          min: 0,
          max: 100
        },
        xaxis: {
          min: 0,
          max: 100
        }
      });

      function updateRealTime() {
        plot.setData([getRandomData()]);
        plot.draw();

        var timeout;
        if (realtime === "on") {
          timeout = setTimeout(updateRealTime, updateInterval);
        } else {
          clearTimeout(timeout);
        }
      }

      updateRealTime();

      $("#realtime").on("change", function() {
        realtime = this.checked ? "on" : "off";
        updateRealTime();
      });

      //BAR CHART ==========================================================================================
      var barChartData = [];
      for (var i = 0; i <= 10; i += 1) {
        barChartData.push([i, parseInt(Math.random() * 30 + "")]);
      }

      // $.plot("#bar_chart_day", [barChartData], {
      //   series: {
      //     stack: 0,
      //     lines: {
      //       show: false,
      //       fill: true,
      //       steps: false
      //     },
      //     bars: {
      //       show: true,
      //       barWidth: 0.6
      //     },
      //     color: "#00BCD4"
      //   },
      //   grid: {
      //     hoverable: true,
      //     autoHighlight: false,
      //     borderColor: "#f3f3f3",
      //     borderWidth: 1,
      //     tickColor: "#f3f3f3"
      //   },
      //   xaxis: {
      //     categories: [
      //       "01 Jan",
      //       "02 Jan",
      //       "03 Jan",
      //       "04 Jan",
      //       "05 Jan",
      //       "06 Jan",
      //       "01 Jan",
      //       "01 Jan",
      //       "01 Jan",
      //       "01 Jan",
      //       "01 Jan"
      //     ]
      //   }
      // });
      new Chart(document.getElementById("bar_chart_day"), {
        type: "bar",
        data: {
          labels: ["1-7", "2-7", "3-7", "4-7", "5-7"],
          datasets: [
            {
              label: "Amount of people",
              backgroundColor: "#00BCD4",
              data: [400, 600, 700, 300, 550]
            }
          ]
        },
        options: {
          legend: { display: false }
        }
      });
      //============================================================================================
    });

    //Hour distribution ###########################################################
    function generateData(count, yrange) {
      var i = 0;
      var series = [];
      while (i < count) {
        var x = (i + 1).toString();
        var y =
          Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
          yrange.min;

        series.push({
          x: x,
          y: y
        });
        i++;
      }
      return series;
    }
    var options = {
      chart: {
        height: 500,
        type: "heatmap"
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          distributed: true,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 10,
                name: "low",
                color: "#e8f0fd"
              },
              {
                from: 11,
                to: 50,
                name: "medium",
                color: "#e8f0fd"
              },
              {
                from: 21,
                to: 100,
                name: "high",
                color: "#3a78e7"
              },
              {
                from: 101,
                to: 250,
                name: "extreme",
                color: "#1b3baa"
              }
            ]
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      series: [
        {
          name: "7AM",
          data: generateData(7, {
            min: 0,
            max: 250
          })
        },
        {
          name: "8AM",
          data: generateData(7, {
            min: 0,
            max: 250
          })
        },
        {
          name: "9AM",
          data: generateData(7, {
            min: 0,
            max: 250
          })
        },
        {
          name: "10AM",
          data: generateData(7, {
            min: 0,
            max: 250
          })
        },
        {
          name: "11AM",
          data: generateData(7, {
            min: 0,
            max: 250
          })
        },
        {
          name: "12PM",
          data: generateData(7, {
            min: 0,
            max: 250
          })
        },
        {
          name: "1PM",
          data: generateData(7, {
            min: 0,
            max: 250
          })
        },
        {
          name: "2PM",
          data: generateData(7, {
            min: 0,
            max: 250
          })
        },
        {
          name: "3PM",
          data: generateData(7, {
            min: 0,
            max: 250
          })
        },
        {
          name: "4PM",
          data: generateData(7, {
            min: 0,
            max: 250
          })
        },
        {
          name: "5PM",
          data: generateData(7, {
            min: 0,
            max: 250
          })
        },
        {
          name: "6PM",
          data: generateData(7, {
            min: 0,
            max: 250
          })
        },
        {
          name: "7PM",
          data: generateData(7, {
            min: 0,
            max: 250
          })
        },
        {
          name: "8PM",
          data: generateData(7, {
            min: 0,
            max: 250
          })
        },
        {
          name: "9PM",
          data: generateData(7, {
            min: 0,
            max: 250
          })
        },
        {
          name: "10PM",
          data: generateData(7, {
            min: 0,
            max: 250
          })
        }
      ],
      xaxis: {
        type: "category",
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      }
    };

    var hour_distribution = new ApexCharts(
      document.querySelector("#hour_distribution"),
      options
    );

    hour_distribution.render();

    //random data
    function getRandomData() {
      if (data.length > 0) data = data.slice(1);

      while (data.length < totalPoints) {
        var prev = data.length > 0 ? data[data.length - 1] : 50,
          y = prev + Math.random() * 10 - 5;
        if (y < 0) {
          y = 0;
        } else if (y > 100) {
          y = 100;
        }

        data.push(y);
      }

      var res = [];
      for (var i = 0; i < data.length; ++i) {
        res.push([i, data[i]]);
      }

      return res;
    }
  }
}
