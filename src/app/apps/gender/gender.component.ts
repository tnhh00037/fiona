import { Component, OnInit } from "@angular/core";

import { DynamicScriptLoaderService } from "../../dynamic-script-loader-service.service";

declare const Chart: any;
declare const $: any;
declare const jQuery: any;

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
      $.get("https://api.fionamedia.net/api/reports", function(data, status) {
        let totalMale = data.filter(age => {
          return age.gender == "Male";
        });       

        let totalFemale = data.filter(age => {
          return age.gender == "Female";
        });

        var myChart = new Chart(ctx, {
          type: "pie",
          data: {
            datasets: [
              {
                data: [totalMale.length, totalFemale.length],
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

        var table = $("#tableGender").empty();      
        var tbRow1 = $("<tr>");
        tbRow1.append("<td>Name</td>");
        tbRow1.append("<td>" + totalMale.length + "</td>");
        table.append(tbRow1);

        var tbRow2 = $("<tr>");
        tbRow2.append("<td>Nữ</td>");
        tbRow2.append("<td>" + totalFemale.length + "</td>");
        table.append(tbRow2);
      });
      
    }
    var ctx2 = <HTMLCanvasElement>document.getElementById("sexProportionMonth");
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

        let genderMaleArr = []
        let genderFemaleArr = []

        monthArray.forEach(element => {
          let arrayInTime= totalInMonthArr.filter(age => {
            return age.time == element;
          });     
          let tempMale = arrayInTime.filter(gender=> {
            return gender.gender == 'Male'
          })

          let tempFemale = arrayInTime.filter(gender=> {
            return gender.gender == 'Female'
          })
          genderMaleArr.push(tempMale.length)
          genderFemaleArr.push(tempFemale.length)
        })
        var myChart2 = new Chart(ctx2, {
          type: "bar",
          defaultFontFamily: "Poppins",
          data: {
            labels: monthArray,
            datasets: [
              {
                label: "Nam",
                data: genderMaleArr,
                borderColor: "#008cfb",
                borderWidth: "0",
                backgroundColor: "#008cfb",
                fontFamily: "Poppins"
              },
              {
                label: "Nữ",
                data: genderFemaleArr,
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
      })
      
    }
  }
}
