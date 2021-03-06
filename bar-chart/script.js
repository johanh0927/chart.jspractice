$(document).ready(function() {

  var HORIZONTAL = false;   // `false` for vertical column chart, `true` for horizontal bar chart
	
  var STACKED = false;  // `false` for individual bars, `true` for stacked bars

  var TITLE = 'Sugar and Fat Daily Grams in 2015';

  var LABELS = 'nation';  // Column to define 'bucket' names on x-axis (for vertical column chart) or y-axis (for horizontal bar chart)

  var SERIES = [  // For each column representing a data series, define its name and color
    {
      column: 'sugar daily grams per capita in 2015',
      name: 'sugar daily grams per capita in 2015',
      color: 'Red'
    },
    {
      column: 'fat daily grams per capita in 2015',
      name: 'fat daily grams per capita in 2015',
      color: 'Yellow'
    }
  ];

  var X_AXIS = 'nation';  // x-axis label and label in tooltip
  var Y_AXIS = 'gram'; // y-axis label and label in tooltip

  var SHOW_GRID = true; // `true` to show the grid, `false` to hide
  var SHOW_LEGEND = true; // `true` to show the legend, `false` to hide

  // Read data file and create a chart
  d3.csv('Sugar and Fat Daily Grams in 2015 - data.csv').then(function(rows) {

    var datasets = SERIES.map(function(el) {
      return {
        label: el.name,
        labelDirty: el.column,
        backgroundColor: el.color,
        data: []
      }
    });

    rows.map(function(row) {
      datasets.map(function(d) {
        d.data.push(row[d.labelDirty])
      })
    });

		var barChartData = {
      labels: rows.map(function(el) { return el[LABELS] }),
			datasets: datasets
    };

    var ctx = document.getElementById('container').getContext('2d');

    new Chart(ctx, {
      type: HORIZONTAL ? 'horizontalBar' : 'bar',
      data: barChartData,
      
      options: {
        title: {
          display: true,
          text: TITLE,
          fontSize: 14,
        },
        legend: {
          display: SHOW_LEGEND,
        },
        scales: {
          xAxes: [{
            stacked: STACKED,
            scaleLabel: {
              display: X_AXIS !== '',
              labelString: X_AXIS
            },
            gridLines: {
              display: SHOW_GRID,
            },
            ticks: {
              beginAtZero: true,
              callback: function(value, index, values) {
                return value.toLocaleString();
              }
            }
          }],
          yAxes: [{
            stacked: STACKED,
            beginAtZero: true,
            scaleLabel: {
              display: Y_AXIS !== '',
              labelString: Y_AXIS
            },
            gridLines: {
              display: SHOW_GRID,
            },
            ticks: {
              beginAtZero: true,
              callback: function(value, index, values) {
                return value.toLocaleString()
              }
            }
          }]
        },
        tooltips: {
          displayColors: false,
          callbacks: {
            label: function(tooltipItem, all) {
              return all.datasets[tooltipItem.datasetIndex].label
                + ': ' + tooltipItem.yLabel.toLocaleString();
            }
          }
        }
      }
    });

  });

});
