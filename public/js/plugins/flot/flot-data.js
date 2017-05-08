// Flot Charts sample data for SB Admin template

// Flot Line Chart with Tooltips
// $(document).ready(function() {
    console.log("document ready");
    var offset = 0;
    plot();

    function plot() {
        var sin = [],
            cos = [];
        for (var i = 0; i < 12; i += 0.2) {
            sin.push([i, Math.sin(i + offset)]);
            cos.push([i, Math.cos(i + offset)]);
        }

        var options = {
            series: {
                lines: {
                    show: true
                },
                points: {
                    show: true
                }
            },
            grid: {
                hoverable: true //IMPORTANT! this is needed for tooltip to work
            },
            yaxis: {
                min: -1.2,
                max: 1.2
            },
            tooltip: true,
            tooltipOpts: {
                content: "'%s' of %x.1 is %y.4",
                shifts: {
                    x: -60,
                    y: 25
                }
            }
        };

        var plotObj = $.plot($("#flot-line-chart"), [{
                data: sin,
                label: "sin(x)"
            }, {
                data: cos,
                label: "cos(x)"
            }],
            options);
    }
});

// Flot Pie Chart with Tooltips
$(function() {

    var data = [{
        label: "Series 0",
        data: 1
    }, {
        label: "Series 1",
        data: 3
    }, {
        label: "Series 2",
        data: 9
    }, {
        label: "Series 3",
        data: 20
    }];

    var plotObj = $.plot($("#flot-pie-chart"), data, {
        series: {
            pie: {
                show: true
            }
        },
        grid: {
            hoverable: true
        },
        tooltip: true,
        tooltipOpts: {
            content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
            shifts: {
                x: 20,
                y: 0
            },
            defaultTheme: false
        }
    });

});



    // function euroFormatter(v, axis) {
    //     return v.toFixed(axis.tickDecimals) + "€";
    // }

    // function doPlot(position) {
    //     $.plot($("#flot-multiple-axes-chart"), [{
    //         data: oilprices,
    //         label: "Oil price ($)"
    //     }, {
    //         data: exchangerates,
    //         label: "USD/EUR exchange rate",
    //         yaxis: 2
    //     }], {
    //         xaxes: [{
    //             mode: 'time'
    //         }],
    //         yaxes: [{
    //             min: 0
    //         }, {
    //             // align if we are to the right
    //             alignTicksWithAxis: position == "right" ? 1 : null,
    //             position: position,
    //             tickFormatter: euroFormatter
    //         }],
    //         legend: {
    //             position: 'sw'
    //         },
    //         grid: {
    //             hoverable: true //IMPORTANT! this is needed for tooltip to work
    //         },
    //         tooltip: true,
    //         tooltipOpts: {
    //             content: "%s for %x was %y",
    //             xDateFormat: "%y-%0m-%0d",

    //             onHover: function(flotItem, $tooltipEl) {
    //                 // console.log(flotItem, $tooltipEl);
    //             }
    //         }

    //     });
    // }
