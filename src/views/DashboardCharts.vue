<template>
    <div id="dashboardCharts">
        <h1 class="pt-4 mb-4 flex-column d-flex align-items-center fw-bolder">Dashboard</h1>
        <div class="row justify-content-center">
          <hr />
          <input id="exportButton" type="button" class="btn btn-info" value='Export' @click="exportStatistics()"/>

        </div>
        <div class="row mt-5">
          <div class="col-lg-6">
            <div id="donutHolder" class="mb-5 chart-container"><canvas id="donutChart"></canvas></div>
            <div id="lineHolder" class="my-5 chart-container"><canvas id="lineChart"></canvas></div>

          </div>
          <div class="col-lg-6">
            <div id="polarHolder" class="mb-5 chart-container"><canvas id="polarChart"></canvas></div>
            <div id="barHolder" class="my-5 chart-container"><canvas id="barChart"></canvas></div>
          </div>
        </div>
      </div>
</template>
<script>
import Chart from 'chart.js'
import { mapActions } from 'vuex';
import 'chartjs-plugin-labels';

export default {
    name: 'DashboardCharts',
    data(){
        return {
          charts: ["donut", "bar", "polar", "line"],
          fullDates: [],
          ratio: 1.5,
          donut: {
            type: 'doughnut',
            data: {
              datasets: [{
                backgroundColor: ['rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgba(153, 102, 255)', 'rgba(255, 159, 64)'],
                hoverOffset: 1,
                borderWidth: 2
              }],
            },
            options: {
              title: { display: true, text: "Tasks Overview", fontSize: 18 }  
            }
          },
          bar: {
            type: 'bar',
            data: {
              labels: ['Kit 1', 'Kit 2', 'Kit 3', 'Kit 4', 'Kit 5', 'Kit 6'],
              datasets: [{
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                  'rgb(201, 203, 207)'
                ],
                borderWidth: 1
              }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            //https://stackoverflow.com/questions/37922518/how-to-set-start-value-as-0-in-chartjs
                            beginAtZero: true,
                            stepSize: 10
                        }
                    }]
                },
                legend : { display: false },
                title: { display: true, text: "Media kit template usage this month", fontSize: 18}   
            }
          },
          polar: {
            type: 'polarArea',
            data: {
              labels: ['Sarangly', 'Qwerky', 'mulawear'],
              datasets: [{
                data: [25,30, 12],
                backgroundColor: ['rgba(102, 51, 255, 0.5)', 'rgb(75, 192, 255)', 'rgb(255, 153, 51)', 'rgb(255, 253, 151)'],
                borderColor: 'rgba(255 , 255, 255, 0)'
              }]
            },
            options: {
                title: { display: true, text: "Tasks assigned to you", fontSize: 18, fontStyle: 'bold' },
                startAngle: -0.75 * Math.PI
            }
          },
          line : {
            type: 'line',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
              datasets: [{
                label: 'Brant',
                data: [5, 9, 8, 8, 6, 5, 4],
                fill: false,
                borderColor: 'rgb(102, 51, 255)',
                tension: 0.1
              },
              {
                label: 'Grace',
                data: [4, 8, 3, 5, 7, 5, 4],
                fill: false,
                borderColor: 'rgb(75, 192, 255)',
                tension: 0.1
              },
              {
                label: 'Yu Xuan',
                data: [5, 5, 5, 2, 6, 5, 8],
                fill: false,
                borderColor: 'rgb(255, 153, 51)',
                tension: 0.1
              },]
            },
            options: {
                title: { display: true, text: "Tasks due this week", fontSize: 18 },
                scales: {
                    yAxes: [{
                        ticks: { stepSize: 1 }
                    }]
                },   
            }
          }
        }
    },
    async mounted(){
      await this.initCharts();
    },
    methods: {
      ...mapActions(['getDashboardDetails']),
      myEventHandler() {
        if (window.innerWidth - 7 >= 428){ 
          //https://www.chartjs.org/docs/2.9.4/general/responsive.html
          for (let c of this.charts){ this[c].options.maintainAspectRatio = true; }
          this.ratio = 1.6;
        } else {
          for (let c of this.charts){ this[c].options.maintainAspectRatio = false; }
          this.ratio = 1.4;
        }
      },
      refreshCharts(){
        for (let c of this.charts){
          document.getElementById(c + 'Chart').remove();
          document.getElementById(c + 'Holder').innerHTML += `<canvas id="${c}Chart"></canvas>`;
        }

        this.bar.data.labels = [];
        this.line.data.labels = [];
        this.fullDates = [];
        this.bar.data.datasets[0].data = [0,0,0,0,0,0];
        this.polar.data.datasets[0].data = []  
        for (let type of this.line.data.datasets){ type.data = [0, 0, 0, 0, 0, 0]; }

        this.initCharts();
      },  
      async initCharts() {
        // await this.getDashboardDetails();
        // this.initChartLabels();
        this.donutChartCalculation();
        this.lineChartCalculation();
        // this.polarChartCalculation();
        // this.barChartCalculation();

        this.myEventHandler();
        for (let c of this.charts){ new Chart(document.getElementById(c + "Chart"), this[c]) }
      },
      initChartLabels(){

      },
      donutChartCalculation(){
        var that = this;

        this.donut.data.datasets[0].data = [150, 75, 91];
        this.donut.data.labels = ['Sarangly', 'Qwerky', 'mulawear '];
        this.donut.plugins = [{
          beforeDraw: function(chart) {
            var width = chart.chart.width,
                height = chart.chart.height,
                ctx = chart.chart.ctx;

            ctx.restore();
            var fontSize = (height / 114).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";

            var text = '50%'   
            var textX = Math.round((width - ctx.measureText(text).width) / 2);
            var textY = height / that.ratio;

            ctx.fillText(text, textX, textY);
            ctx.save();
          }
        }];
      },
      barChartCalculation(){
        let groupedRecords = this.reducer(['school', 'institution']);
        const dukeNusValues = Object.entries(groupedRecords).filter(x=>x[0].includes('Duke-NUS'));
        // console.log(dukeNusValues)

        this.bar.data.datasets[0].data = dukeNusValues.map(x => x[1]);
        this.bar.data.labels = dukeNusValues.map(x => x[0]);

      },
      polarChartCalculation(){
        let groupedRecords = this.reducer(['institution']);

        this.polar.data.datasets[0].data = Object.values(groupedRecords);
        this.polar.data.labels = Object.keys(groupedRecords);
      },
      lineChartCalculation(){
        let lineChartLabel = [];
        for (let e = 0; e <= 6; e++){
          let cur = new Date();
          let first = cur.getDate() - cur.getDay() + 1; // First day is the day of the month - the day of the week
          let firstday = new Date(cur.setDate(first));
          firstday.setDate(firstday.getDate() + e);
          lineChartLabel.push(String(firstday.getDate()) + '/' + String(firstday.getMonth() + 1));
        }
        this.line.data.labels = lineChartLabel;
      },
      exportStatistics(){
        this.exportToCsv('ExportedDashboard', this.dashboardRecords, this.facultyListDashboardHeaders);
      },
      reducer(props) {
        return this.dashboardRecords.reduce((acc, obj) => {
          const value = obj[props];
          this.recognisedRanks.includes(value) ? acc[value] = (acc[value] || 0) + 1 : acc['Others'] = (acc['Others'] || 0) + 1;
          return acc;
        }, {});
      }
    }
}
</script>
<style scoped>
  #dashboardCharts{
      padding: 0 5%;
  }

  #selectHolder{
    width: 45%;
  }

  #exportButton{
    width:75px;
  }

  .chart-container {
    position: relative;
    margin: auto;
    height: 250px;
  }

  @media only screen and (min-width: 767px){
    #selectHolder{
      width: 250px;
    }

    .chart-container {
      height: auto;
    }
  }


</style>
