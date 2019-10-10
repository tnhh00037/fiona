import { Component, OnInit } from '@angular/core';

declare const $: any;
declare const Chart: any;
declare const window: any;
declare const ApexCharts: any;

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

	constructor() { }

	ngOnInit() {

		$(function () {


			$('#chat-conversation').slimscroll({
				height: '264px',
				size: '5px'
			});
			initCardChart();
			initSparkline();
			initLineChart();
			initSalesChart();

			initChartReport1();
			initChartReport2();
		});

		function initCardChart() {


			//Chart Bar
			$('.chart.chart-bar').sparkline([6, 4, 8, 6, 8, 10, 5, 6, 7, 9, 5, 6, 4, 8, 6, 8, 10, 5, 6, 7, 9, 5], {
				type: 'bar',
				barColor: '#FF9800',
				negBarColor: '#fff',
				barWidth: '4px',
				height: '45px'
			});


			//Chart Pie
			$('.chart.chart-pie').sparkline([30, 35, 25, 8], {
				type: 'pie',
				height: '45px',
				sliceColors: ['#65BAF2', '#F39517', '#F44586', '#6ADF42']
			});


			//Chart Line
			$('.chart.chart-line').sparkline([9, 4, 6, 5, 6, 4, 7, 3], {
				type: 'line',
				width: '60px',
				height: '45px',
				lineColor: '#65BAF2',
				lineWidth: 2,
				fillColor: 'rgba(0,0,0,0)',
				spotColor: '#F39517',
				maxSpotColor: '#F39517',
				minSpotColor: '#F39517',
				spotRadius: 3,
				highlightSpotColor: '#F44586'
			});

			// live chart
			var mrefreshinterval = 500; // update display every 500ms
			var lastmousex = -1;
			var lastmousey = -1;
			var lastmousetime;
			var mousetravel = 0;
			var mpoints = [];
			var mpoints_max = 30;
			$('html').on("mousemove", function (e) {
				var mousex = e.pageX;
				var mousey = e.pageY;
				if (lastmousex > -1) {
					mousetravel += Math.max(Math.abs(mousex - lastmousex), Math.abs(mousey - lastmousey));
				}
				lastmousex = mousex;
				lastmousey = mousey;
			});
			var mdraw = function () {
				var md = new Date();
				var timenow = md.getTime();
				if (lastmousetime && lastmousetime != timenow) {
					var pps = Math.round(mousetravel / (timenow - lastmousetime) * 1000);
					mpoints.push(pps);
					if (mpoints.length > mpoints_max)
						mpoints.splice(0, 1);
					mousetravel = 0;
					$('#liveChart').sparkline(mpoints, {
						width: mpoints.length * 2,
						height: '45px',
						tooltipSuffix: ' pixels per second'
					});
				}
				lastmousetime = timenow;
				setTimeout(mdraw, mrefreshinterval);
			};
			// We could use setInterval instead, but I prefer to do it this way
			setTimeout(mdraw, mrefreshinterval);
		}
		function initChartReport1() {
			var options = {
				chart: {
					height: 350,
					type: 'bar',
					stacked: true,
					toolbar: {
						show: true
					},
					zoom: {
						enabled: true
					}
				},
				tooltips: {
					enabled: true,
					intersect: true,
				},
				colors: [
					'#3467D6', '#4285F4', '#4285F4', '#90A4F7', '#A0C2F9'
				],

				responsive: [{
					breakpoint: 480,
					options: {
						legend: {
							position: 'bottom',
							offsetX: -5,
							offsetY: 0
						}
					}
				}],
				dataLabels: {
					enabled: true
				},
				plotOptions: {
					bar: {
						horizontal: false,
						// endingShape: 'rounded',
						columnWidth: '70%',
					},
				},
				series: [{
					name: 'Organic Search',
					data: [44, 55, 41, 67, 22, 43]
				}, {
					name: 'Social',
					data: [13, 23, 20, 8, 13, 27]
				}, {
					name: 'Direct',
					data: [11, 17, 15, 15, 21, 14]
				}, {
					name: 'Referral',
					data: [21, 7, 25, 13, 22, 8]
				}],
				xaxis: {
					type: 'Khác',
					categories: ['19', '20', '21', '22', '23', '24'],
					labels: {
						style: {
							colors: '#9aa0ac',
						}
					}
				},
				yaxis: {
					labels: {
						style: {
							color: '#9aa0ac',
						}
					}

				},
				legend: {
					position: 'bottom',
					offsetY: 0
				},
				fill: {
					opacity: 1
				},
			}
			var chart = new ApexCharts(
				document.querySelector("#chartReport1"),
				options
			);
			chart.render()
		}
		function initChartReport2() {
			var ctx = <HTMLCanvasElement>document.getElementById("chartReport2");
			$.get("https://api.fionamedia.net/api/reports", function (data, status) {
				let level1 = 0;
				let level2 = 0;
				let level3 = 0;
				let level4 = 0;
				let level5 = 0;
				let level6 = 0;
				let level7 = 0;
				let level8 = 0;
				let level9 = 0;
				const levelAgeArr = [
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
				const ageLevelArr = data.map(report => {
					return report.age;
				});

				ageLevelArr.forEach(element => {
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

				let maxAge = level1;
				let textLevelAge = levelAgeArr[0];
				if (maxAge < level2) {
					maxAge = level2
					textLevelAge = levelAgeArr[1];
				}
				if (maxAge < level3) {
					maxAge = level3
					textLevelAge = levelAgeArr[2];
				}
				if (maxAge < level4) {
					maxAge = level4
					textLevelAge = levelAgeArr[3];
				}
				if (maxAge < level5) {
					maxAge = level5
					textLevelAge = levelAgeArr[4];
				}
				if (maxAge < level6) {
					maxAge = level6
					textLevelAge = levelAgeArr[5];
				}
				if (maxAge < level7) {
					maxAge = level7
					textLevelAge = levelAgeArr[6];
				}
				if (maxAge < level8) {
					maxAge = level8
					textLevelAge = levelAgeArr[7];
				}
				if (maxAge < level9) {
					maxAge = level9
					textLevelAge = levelAgeArr[8];
				}

				$("#totalCustomer").text(data.length)
				$("#levelAge").text(textLevelAge);
				const femaleArr = [];
				const maleArr = [];
				const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

				const ageArr = data.filter(report => {
					const date = report.time.substring(0, 2)
					const month = report.time.substring(3, 5)
					const year = report.time.substring(6, 10)
					const day = new Date(month + "/" + date + "/" + year).getDay();

					return report.time = days[day];
				})

				days.forEach(element => {
					let totalMale = ageArr.filter(age => {
						return age.time == element && age.gender == 'Male';
					})
					maleArr.push(totalMale.length)

					let totalFemale = ageArr.filter(age => {
						return age.time == element && age.gender == 'Female';
					})
					femaleArr.push(totalFemale.length)
				});

				if (ctx) {
					ctx.height = 350;
					var myChart = new Chart(ctx, {
						type: 'line',
						data: {
							labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
							type: 'line',
							defaultFontFamily: 'Poppins',
							datasets: [{
								label: "Nam",
								data: maleArr,
								backgroundColor: 'transparent',
								borderColor: '#222222',
								borderWidth: 2,
								pointStyle: 'circle',
								pointRadius: 3,
								pointBorderColor: 'transparent',
								pointBackgroundColor: '#222222',
							}, {
								label: "Nữ",
								data: femaleArr,
								backgroundColor: 'transparent',
								borderColor: '#f96332',
								borderWidth: 2,
								pointStyle: 'circle',
								pointRadius: 3,
								pointBorderColor: 'transparent',
								pointBackgroundColor: '#f96332',
							}]
						},
						options: {
							responsive: true,
							tooltips: {
								mode: 'index',
								titleFontSize: 12,
								titleFontColor: '#000',
								bodyFontColor: '#000',
								backgroundColor: '#fff',
								titleFontFamily: 'Poppins',
								bodyFontFamily: 'Poppins',
								cornerRadius: 3,
								intersect: false,
							},
							legend: {
								display: false,
								labels: {
									usePointStyle: true,
									fontFamily: 'Poppins',
								},
							},
							scales: {
								xAxes: [{
									display: true,
									gridLines: {
										display: false,
										drawBorder: false
									},
									scaleLabel: {
										display: false,
										labelString: 'Month'
									},
									ticks: {
										fontFamily: "Poppins"
									}
								}],
								yAxes: [{
									display: true,
									gridLines: {
										display: false,
										drawBorder: false
									},
									scaleLabel: {
										display: true,
										labelString: 'Số lượng',
										fontFamily: "Poppins"

									},
									ticks: {
										fontFamily: "Poppins"
									}
								}]
							},
							title: {
								display: false,
								text: 'Normal Legend'
							}
						}
					});
				}
			});

		}
		let oldLength = 0;
		let newLength = 0;
		setInterval(function(){
			$.get("https://api.fionamedia.net/api/reports", function (data, status) {
				if(data.length !== oldLength){
					newLength = data.length - oldLength;
				}
				$("#quantityCustomer").text(newLength)
				oldLength = data.length;
			})
		},2000)
		function initSparkline() {
			$(".sparkline").each(function () {
				var $this = $(this);
				$this.sparkline('html', $this.data());
			});
		}

		function initLineChart() {
			try {

				//line chart
				var ctx = <HTMLCanvasElement>document.getElementById("lineChart");
				if (ctx) {
					ctx.height = 150;
					var myChart = new Chart(ctx, {
						type: 'line',
						data: {
							labels: ["January", "February", "March", "April", "May", "June", "July"],
							defaultFontFamily: "Poppins",
							datasets: [
								{
									label: "My First dataset",
									borderColor: "rgba(0,0,0,.09)",
									borderWidth: "1",
									backgroundColor: "rgba(0,0,0,.07)",
									data: [22, 44, 67, 43, 76, 45, 12]
								},
								{
									label: "My Second dataset",
									borderColor: "rgba(0, 123, 255, 0.9)",
									borderWidth: "1",
									backgroundColor: "rgba(0, 123, 255, 0.5)",
									pointHighlightStroke: "rgba(26,179,148,1)",
									data: [16, 32, 18, 26, 42, 33, 44]
								}
							]
						},
						options: {
							legend: {
								position: 'top',
								labels: {
									fontFamily: 'Poppins'
								}

							},
							responsive: true,
							tooltips: {
								mode: 'index',
								intersect: false
							},
							hover: {
								mode: 'nearest',
								intersect: true
							},
							scales: {
								xAxes: [{
									ticks: {
										fontFamily: "Poppins"

									}
								}],
								yAxes: [{
									ticks: {
										beginAtZero: true,
										fontFamily: "Poppins"
									}
								}]
							}

						}
					});
				}


			} catch (error) {
				console.log(error);
			}
		}

		function initSalesChart() {

			try {
				//Sales chart
				var ctx = <HTMLCanvasElement>document.getElementById("sales-chart");
				if (ctx) {
					ctx.height = 150;
					var myChart = new Chart(ctx, {
						type: 'line',
						data: {
							labels: ["2010", "2011", "2012", "2013", "2014", "2015", "2016"],
							type: 'line',
							defaultFontFamily: 'Poppins',
							datasets: [{
								label: "Foods",
								data: [0, 30, 10, 120, 50, 63, 10],
								backgroundColor: 'transparent',
								borderColor: '#222222',
								borderWidth: 2,
								pointStyle: 'circle',
								pointRadius: 3,
								pointBorderColor: 'transparent',
								pointBackgroundColor: '#222222',
							}, {
								label: "Electronics",
								data: [0, 50, 40, 80, 40, 79, 120],
								backgroundColor: 'transparent',
								borderColor: '#f96332',
								borderWidth: 2,
								pointStyle: 'circle',
								pointRadius: 3,
								pointBorderColor: 'transparent',
								pointBackgroundColor: '#f96332',
							}]
						},
						options: {
							responsive: true,
							tooltips: {
								mode: 'index',
								titleFontSize: 12,
								titleFontColor: '#000',
								bodyFontColor: '#000',
								backgroundColor: '#fff',
								titleFontFamily: 'Poppins',
								bodyFontFamily: 'Poppins',
								cornerRadius: 3,
								intersect: false,
							},
							legend: {
								display: false,
								labels: {
									usePointStyle: true,
									fontFamily: 'Poppins',
								},
							},
							scales: {
								xAxes: [{
									display: true,
									gridLines: {
										display: false,
										drawBorder: false
									},
									scaleLabel: {
										display: false,
										labelString: 'Month'
									},
									ticks: {
										fontFamily: "Poppins"
									}
								}],
								yAxes: [{
									display: true,
									gridLines: {
										display: false,
										drawBorder: false
									},
									scaleLabel: {
										display: true,
										labelString: 'Value',
										fontFamily: "Poppins"

									},
									ticks: {
										fontFamily: "Poppins"
									}
								}]
							},
							title: {
								display: false,
								text: 'Normal Legend'
							}
						}
					});
				}


			} catch (error) {
				console.log(error);
			}
		}

	}

}
