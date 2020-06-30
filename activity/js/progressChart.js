// const chart = require("./chart");

class progressChart {
  constructor() {
    this.createChart();
  }

  createChart() {
    var ctx = document.getElementById('myChart');
    let timeline = [];
    for (let i = 0; i < trainerInstance.best.length; i++) {
      timeline.push(i + 1);
    }
    this.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timeline,
        datasets: [{
          label: 'Best Fit',
          yAxisID: 'left',
          borderColor: 'mediumseagreen',
          data: trainerInstance.best,
        }, {
          label: 'DB Memory',
          yAxisID: 'right',
          borderColor: 'firebrick',
          data: trainerInstance.memory,
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Evolution'
        },
        legend: {
          position: 'bottom'
        },
        animation: false,
        scales: {
          yAxes: [{
            id: 'left',
            type: 'linear',
            position: 'left',
          }, {
            id: 'right',
            type: 'linear',
            position: 'right',
          }]
        }
      }
    });
  }

  updateChart(){
    let timeline = [];
    for (let i = 0; i < trainerInstance.best.length; i++) {
      timeline.push(i + 1);
    }
    this.myChart.data.labels = timeline;
    this.myChart.data.datasets[0].data = trainerInstance.best;
    this.myChart.data.datasets[1].data = trainerInstance.memory;
    this.myChart.update();
  }

}
