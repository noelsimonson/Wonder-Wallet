
// push month digits into an array for display on x axis for barchart
function pushMo(monthToAdd, repeat, monthArr){
     for (var i = repeat; i > 0; i-- ){
          monthArr.push(monthToAdd);
          console.log("line 255 " + monthToAdd + " " + monthArr);
          monthToAdd++;
        }
}


function getAvg(avgArr, inputArr){
    var avg = 0;
    for (var i = 0; i < inputArr.length; i++){
         avg += inputArr[i];
    }
    avg = avg/inputArr.length;
     for (var i = 0; i < inputArr.length; i++){
         avgArr.push(avg);
    }   
}


function barchart(){
    var d = new Date();
    var currentMo = d.getMonth() + 1;
    var monthArr = [];
    var incomeArr = [6,7,5,8,6,7];
    var expenseArr = [4,3,5,2,3,4];
    var avgArr = [];
 
    // Get the average of expenses over the period for display in line plot
    getAvg(avgArr, expenseArr);

    // Populate the array with the last 6 months to be displayed on x-axis
    // if the current month is April or earlier, push months from previous years first and then push current years months
    if (currentMo<6) {
        pushMo(12 - 6 + currentMo + 1, 6 - currentMo, monthArr);
        pushMo(1, currentMo, monthArr);
    } else {
        // the current month is later than April so push 6 months from the current year
        pushMo(currentMo - 6 + 1, 6, monthArr);       
    }
    // establish an array to store chart colors
   var colors =[];
   // use Highcharts to display bar chart with expenses and income
     Highcharts.chart('barChart', {
  title: {
        text: 'Net Spending'
    },
    colors: ['#cbf390', '#b0c0d6', 'black'],
    xAxis: {
        categories: monthArr
    },
    labels: {
        items: [{
            // html: 'Total fruit consumption',
            style: {
                left: '50px',
                top: '18px',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
            }
        }]
    },
    plotOptions: {
                column: {
                    pointPadding: -.2,
                    borderWidth: 0
                }
            },
    series: [{
        type: 'column',
        name: 'Income',
        data: incomeArr,
       color: colors[0]
    }, {
        type: 'column',
        name: 'Expenses',
        data: expenseArr,
        color: colors[1]
    }, {
        type: 'spline',
        name: 'Average',
        data: avgArr,
        marker: {
            enabled: false,
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[2],
            fillColor: 'black'
        }
    }]
});
}

function getPieData(data){
 return data =  [{
                name: 'Microsoft Internet Explorer',
                y: 56.33
            }, {
                name: 'Chrome',
                y: 24.03
            }, {
                name: 'Firefox',
                y: 10.38
            }, {
                name: 'Safari',
                y: 4.77
            }, {
                name: 'Opera',
                y: 0.91
            }, {
                name: 'Proprietary or Undetectable',
                y: 0.2
            }]
}


function piechart(){
    var pieData = getPieData();
    console.log(pieData);
  Highcharts.chart('pieChart', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            marginRight: 300

        },
        // title: {
        //     text: 'Browser market shares January, 2015 to May, 2015'
        // },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },

        legend: {
            align: 'right',
            verticalAlign: 'right',
            layout: 'vertical',
            x: -20,
            y: 50,
            marker: {
                symbol: 'square',
                radius : 12
            //     symbolHeight: 12,
            //     symbolWidth: 12,
            //     symbolRadius: 6
            },
            itemStyle: {
                 fontSize: '17px',
                 font: 'Trebuchet MS, Verdana, sans-serif'
              }
        },
        series: [{
            name: 'Expenses',
            colorByPoint: true,
            data: pieData
        }]
    });
}

function displayNet(){
    var netInc = 5000;
    var netExp = 3450;
    var net =   netInc - netExp;
    $('#summary').text("Total Income    -    Total Expenses   =    Bottom Line").attr(class, netTitle)   
    $('#summary').append("$" + netInc + " - " + "$" + netExp + " = " + "$" + net);
}

     barchart();
     piechart();
     displayNet();

</script>
</html>

</script>
</html>
