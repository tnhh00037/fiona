import { Component, OnInit } from "@angular/core";
declare const Chart: any;
@Component({
  selector: "app-age",
  templateUrl: "./age.component.html",
  styleUrls: ["./age.component.scss"]
})
export class AgeComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    var ctx = <HTMLCanvasElement>document.getElementById("ageProportion");
    if (ctx) {
      ctx.height = 200;
      var myChart = new Chart(ctx, {
        type: "pie",
        data: {
          datasets: [
            {
              data: [45, 15, 25, 10, 5],
              backgroundColor: [
                "#008ffb",
                "#04e396",
                "#feb01a",
                "#ff4560",
                "#775cd0"
              ],
              hoverBackgroundColor: [
                "#008ffb",
                "#04e396",
                "#feb01a",
                "#ff4560",
                "#775cd0"
              ]
            }
          ],
          labels: ["16-18", "19-22", "23-28", "29-35", "Over 35"]
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
    }
    var ctx2 = <HTMLCanvasElement>document.getElementById("ageProportionMonth");
    if (ctx2) {
      ctx2.height = 200;
      var myChart2 = new Chart(ctx2, {
        type: "bar",
        defaultFontFamily: "Poppins",
        data: {
          labels: ["January", "February", "March", "April"],
          datasets: [
            {
              label: "16-18",
              data: [45, 45, 45, 45, 45],
              borderColor: "#008cfb",
              borderWidth: "0",
              backgroundColor: "#008cfb",
              fontFamily: "Poppins"
            },
            {
              label: "19-22",
              data: [15, 15, 15, 15, 15],
              borderColor: "#04e396",
              borderWidth: "0",
              backgroundColor: "#04e396",
              fontFamily: "Poppins"
            },
            {
              label: "23-28",
              data: [25, 25, 25, 25, 25],
              borderColor: "#feb01a",
              borderWidth: "0",
              backgroundColor: "#feb01a",
              fontFamily: "Poppins"
            },
            {
              label: "29-35",
              data: [10, 10, 10, 10, 10],
              borderColor: "#ff4560",
              borderWidth: "0",
              backgroundColor: "#ff4560",
              fontFamily: "Poppins"
            },
            {
              label: "Over 35",
              data: [5, 5, 5, 5, 5],
              borderColor: "#775cd0",
              borderWidth: "0",
              backgroundColor: "#775cd0",
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
    }
  }
}
