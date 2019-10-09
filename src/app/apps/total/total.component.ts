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

      function getDataInfo() {
        $.get("https://api.fionamedia.net/api/reports?filter=%7B%20%22order%22%3A%20%22time%20DESC%22%20%7D", function(data, status) {
          var table = $("#tableHistory").empty();
          var thead = $("<thead></thead>");
          var tbtr = $("<tr></tr>");
          tbtr.append("<th>Age</th>");
          tbtr.append("<th>Gender</th>");
          tbtr.append("<th>Time</th>");
          thead.append(tbtr);
          table.append(thead);
          const bxh = data;
          for (let index = 0; index < 5; index++) {
            const element = bxh[index];
            var tbRow = $("<tr>");
            tbRow.append("<td>" + element.age + "</td>");
            tbRow.append("<td>" + element.gender + "</td>");
            tbRow.append("<td>" + element.time + "</td>");
            table.append(tbRow);
          }
        });
      }
      getDataInfo();
      setInterval(function(){
        getDataInfo();
      },5000);

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

      $.get("https://api.fionamedia.net/api/reports", function(data, status) {
        const totalInDateArr = data.filter(report => {
          const date = report.time.substring(0, 2);

          return (report.time = date);
        });
        const dateArray = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31"
        ];

        let dataChart = [];
        dateArray.forEach(element => {
          let totalVisit = totalInDateArr.filter(age => {
            return age.time == element;
          });
          dataChart.push(totalVisit.length);
        });
        new Chart(document.getElementById("bar_chart_day"), {
          type: "bar",
          data: {
            labels: dateArray,
            datasets: [
              {
                label: "People Visit",
                backgroundColor: "#00BCD4",
                data: dataChart
              }
            ]
          },
          options: {
            legend: { display: false }
          }
        });
      });

      //============================================================================================
    });

    //Hour distribution ###########################################################
    function generateData(count, yrange) {
      var i = 0;
      var series = [];
      $.get("https://api.fionamedia.net/api/reports", function(data, status) {
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ];

        let timeArray = [];

        const ageArr = data.filter(report => {
          const date = report.time.substring(0, 2);
          const month = report.time.substring(3, 5);
          const year = report.time.substring(6, 10);
          const day = new Date(month + "/" + date + "/" + year).getDay();

          return (report.time = days[day]);
        });

        days.forEach(element => {
          let totalVisit = ageArr.filter(age => {
            return age.time == element;
          });
          timeArray.push({});
        });
      });

      while (i < count) {
        var x = i.toString();
        var y =
          Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
          yrange.min;

        series.push({
          x: x,
          y: y
        });
        i++;
      }
      console.log(series);
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
