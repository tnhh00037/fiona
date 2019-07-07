import { Component, OnInit } from "@angular/core";

import { DynamicScriptLoaderService } from "../../dynamic-script-loader-service.service";

declare const Chart: any;
@Component({
  selector: "app-gender",
  templateUrl: "./gender.component.html",
  styleUrls: ["./gender.component.scss"]
})
export class GenderComponent implements OnInit {
  constructor(private dynamicScriptLoader: DynamicScriptLoaderService) {}

  ngOnInit() {
    "use strict";
    var ctx = <HTMLCanvasElement>document.getElementById("sexProportion");
    if (ctx) {
      ctx.height = 200;
      var myChart = new Chart(ctx, {
        type: "pie",
        data: {
          datasets: [
            {
              data: [45, 55],
              backgroundColor: ["#008ffb", "#04e396"],
              hoverBackgroundColor: ["#008ffb", "#04e396"]
            }
          ],
          labels: ["Nam", "Nữ"]
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
    var ctx2 = <HTMLCanvasElement>document.getElementById("sexProportionMonth");
    if (ctx2) {
      ctx2.height = 200;
      var myChart2 = new Chart(ctx2, {
        type: "bar",
        defaultFontFamily: "Poppins",
        data: {
          labels: ["January", "February", "March", "April"],
          datasets: [
            {
              label: "Nam",
              data: [45, 45, 45, 45, 45],
              borderColor: "#008cfb",
              borderWidth: "0",
              backgroundColor: "#008cfb",
              fontFamily: "Poppins"
            },
            {
              label: "Nữ",
              data: [15, 15, 15, 15, 15],
              borderColor: "#04e396",
              borderWidth: "0",
              backgroundColor: "#04e396",
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
