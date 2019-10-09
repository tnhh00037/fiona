import { Component, OnInit } from "@angular/core";
declare const Chart: any;
declare const $: any;
declare const jQuery: any;
@Component({
  selector: "app-age",
  templateUrl: "./age.component.html",
  styleUrls: ["./age.component.scss"]
})
export class AgeComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    var ctx = <HTMLCanvasElement>document.getElementById("ageProportion");
    let level1 = 0;
    let level2 = 0;
    let level3 = 0;
    let level4 = 0;
    let level5 = 0;
    let level6 = 0;
    let level7 = 0;
    let level8 = 0;
    let level9 = 0;
    if (ctx) {
      ctx.height = 200;
      $.get("https://api.fionamedia.net/api/reports", function(data, status) {
        const ageArr = data.map(report => {
          return report.age;
        });

        ageArr.forEach(element => {
          if (parseInt(element) >= 15 && parseInt(element) <= 18) {
            level1 = level1 + 1;
          }
          if (parseInt(element) >= 19 && parseInt(element) <= 21) {
            level2 = level2 + 1;
          }
          if (parseInt(element) >= 22 && parseInt(element) <= 25) {
            level3 = level3 + 1;
          }
          if (parseInt(element) >= 26 && parseInt(element) <= 30) {
            level4 = level4 + 1;
          }
          if (parseInt(element) >= 31 && parseInt(element) <= 35) {
            level5 = level5 + 1;
          }
          if (parseInt(element) >= 36 && parseInt(element) <= 40) {
            level6 = level6 + 1;
          }
          if (parseInt(element) >= 40 && parseInt(element) <= 45) {
            level7 = level7 + 1;
          }
          if (parseInt(element) >= 46 && parseInt(element) <= 50) {
            level8 = level8 + 1;
          }
          if (parseInt(element) >= 50) {
            level9 = level9 + 1;
          }
        });

        var myChart = new Chart(ctx, {
          type: "pie",
          data: {
            datasets: [
              {
                data: [
                  level1,
                  level2,
                  level3,
                  level4,
                  level5,
                  level6,
                  level7,
                  level8,
                  level9
                ],
                backgroundColor: [
                  "#008ffb",
                  "#04e396",
                  "#feb01a",
                  "#ff4560",
                  "#775cd0",
                  "#26a69a",
                  "#9c27b0",
                  "#9e9e9e",
                  "#795548"
                ],
                hoverBackgroundColor: [
                  "#008ffb",
                  "#04e396",
                  "#feb01a",
                  "#ff4560",
                  "#775cd0",
                  "#26a69a",
                  "#9c27b0",
                  "#9e9e9e",
                  "#795548"
                ]
              }
            ],
            labels: [
              "15-18",
              "19-21",
              "22-25",
              "26-30",
              "31-35",
              "36-40",
              "40-45",
              "46-50",
              "Over 50"
            ]
          },
          options: {
            legend: {
              position: "right",
              labels: {
                fontFamily: "Poppins"
              }
            },
            responsive: true
          }
        });

        var table = $("#tableAge").empty();
        var thead = $("<thead></thead>");
        var tbtr = $("<tr></tr>");
        tbtr.append("<th>Độ tuổi</th>");
        tbtr.append("<th>Số lượng</th>");
        thead.append(tbtr);
        table.append(thead);

        var tbRow1 = $("<tr>");
        tbRow1.append("<td>15-18</td>");
        tbRow1.append("<td>" + level1 + "</td>");
        table.append(tbRow1);

        var tbRow2 = $("<tr>");
        tbRow2.append("<td>19-21</td>");
        tbRow2.append("<td>" + level2 + "</td>");
        table.append(tbRow2);

        var tbRow3 = $("<tr>");
        tbRow3.append("<td>22-25</td>");
        tbRow3.append("<td>" + level3 + "</td>");
        table.append(tbRow3);

        var tbRow4 = $("<tr>");
        tbRow4.append("<td>26-30</td>");
        tbRow4.append("<td>" + level4 + "</td>");
        table.append(tbRow4);

        var tbRow5 = $("<tr>");
        tbRow5.append("<td>31-35</td>");
        tbRow5.append("<td>" + level5 + "</td>");
        table.append(tbRow5);

        var tbRow6 = $("<tr>");
        tbRow6.append("<td>36-40</td>");
        tbRow6.append("<td>" + level6 + "</td>");
        table.append(tbRow6);

        var tbRow7 = $("<tr>");
        tbRow7.append("<td>40-45</td>");
        tbRow7.append("<td>" + level7 + "</td>");
        table.append(tbRow7);

        var tbRow8 = $("<tr>");
        tbRow8.append("<td>46-50</td>");
        tbRow8.append("<td>" + level8 + "</td>");
        table.append(tbRow8);

        var tbRow9 = $("<tr>");
        tbRow9.append("<td>Over 50</td>");
        tbRow9.append("<td>" + level9 + "</td>");
        table.append(tbRow9);
      });
    }
    var ctx2 = <HTMLCanvasElement>document.getElementById("ageProportionMonth");
    if (ctx2) {
      ctx2.height = 200;
      $.get("https://api.fionamedia.net/api/reports", function(data, status) {
        const monthArray = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        const totalInMonthArr = data.filter(report => {
          const month = parseInt(report.time.substring(3, 5));
          return (report.time = monthArray[month - 1]);
        });

        let dataChartlevel1 = [];
        let dataChartlevel2 = [];
        let dataChartlevel3 = [];
        let dataChartlevel4 = [];
        let dataChartlevel5 = [];
        let dataChartlevel6 = [];
        let dataChartlevel7 = [];
        let dataChartlevel8 = [];
        let dataChartlevel9 = [];

        level1 = 0;
        level2 = 0;
        level3 = 0;
        level4 = 0;
        level5 = 0;
        level6 = 0;
        level7 = 0;
        level8 = 0;
        level9 = 0;

        monthArray.forEach(element => {
          let arrayInTime= totalInMonthArr.filter(age => {
            return age.time == element;
          });           
          let arrayAgeInTime = arrayInTime.map(time => time.age);     

          arrayAgeInTime.forEach(element => {           
            if (parseInt(element) >= 15 && parseInt(element) <= 18) {
              level1 = level1 + 1;
            }
            if (parseInt(element) >= 19 && parseInt(element) <= 21) {
              level2 = level2 + 1;
            }
            if (parseInt(element) >= 22 && parseInt(element) <= 25) {
              level3 = level3 + 1;
            }
            if (parseInt(element) >= 26 && parseInt(element) <= 30) {              
              level4 = level4 + 1;
            }
            if (parseInt(element) >= 31 && parseInt(element) <= 35) {
              level5 = level5 + 1;
            }
            if (parseInt(element) >= 36 && parseInt(element) <= 40) {
              level6 = level6 + 1;
            }
            if (parseInt(element) >= 40 && parseInt(element) <= 45) {
              level7 = level7 + 1;
            }
            if (parseInt(element) >= 46 && parseInt(element) <= 50) {
              level8 = level8 + 1;
            }
            if (parseInt(element) >= 50) {
              level9 = level9 + 1;
            }           
          });
          dataChartlevel1.push(level1);
          dataChartlevel2.push(level2);
          dataChartlevel3.push(level3);
          dataChartlevel4.push(level4);
          dataChartlevel5.push(level5);
          dataChartlevel6.push(level6);
          dataChartlevel7.push(level7);
          dataChartlevel8.push(level8);
          dataChartlevel9.push(level9);

          level1 = 0;
          level2 = 0;
          level3 = 0;
          level4 = 0;
          level5 = 0;
          level6 = 0;
          level7 = 0;
          level8 = 0;
          level9 = 0;
        });
        console.log(dataChartlevel4)
        var myChart2 = new Chart(ctx2, {
          type: "bar",
          defaultFontFamily: "Poppins",
          data: {
            labels: monthArray,
            datasets: [
              {
                label: "15-18",
                data: dataChartlevel1,
                borderColor: "#008cfb",
                borderWidth: "0",
                backgroundColor: "#008cfb",
                fontFamily: "Poppins"
              },
              {
                label: "19-21",
                data: dataChartlevel2,
                borderColor: "#04e396",
                borderWidth: "0",
                backgroundColor: "#04e396",
                fontFamily: "Poppins"
              },
              {
                label: "22-25",
                data: dataChartlevel3,
                borderColor: "#feb01a",
                borderWidth: "0",
                backgroundColor: "#feb01a",
                fontFamily: "Poppins"
              },
              {
                label: "26-30",
                data: dataChartlevel4,
                borderColor: "#ff4560",
                borderWidth: "0",
                backgroundColor: "#ff4560",
                fontFamily: "Poppins"
              },
              {
                label: "31-35",
                data: dataChartlevel5,
                borderColor: "#775cd0",
                borderWidth: "0",
                backgroundColor: "#775cd0",
                fontFamily: "Poppins"
              },
              {
                label: "36-40",
                data: dataChartlevel6,
                borderColor: "#26a69a",
                borderWidth: "0",
                backgroundColor: "#26a69a",
                fontFamily: "Poppins"
              },
              {
                label: "40-45",
                data: dataChartlevel7,
                borderColor: "#9c27b0",
                borderWidth: "0",
                backgroundColor: "#9c27b0",
                fontFamily: "Poppins"
              },
              {
                label: "46-50",
                data: dataChartlevel8,
                borderColor: "#9e9e9e",
                borderWidth: "0",
                backgroundColor: "#9e9e9e",
                fontFamily: "Poppins"
              },
              {
                label: "Over 50",
                data: dataChartlevel9,
                borderColor: "#795548",
                borderWidth: "0",
                backgroundColor: "#795548",
                fontFamily: "Poppins"
              }
            ]
          },
          options: {
            legend: {
              position: "top",
              labels: {
                fontFamily: "Poppins"
              }
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontFamily: "Poppins"
                  }
                }
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    fontFamily: "Poppins"
                  }
                }
              ]
            }
          }
        });
      });
    }
  }
}
