$(document).ready(function() {

    Chart.pluginService.register({
        beforeDraw: function(chart) {
            if (chart.config.options.elements.center) {
                //Get ctx from string
                var ctx = chart.chart.ctx;

                //Get options from the center object in options
                var centerConfig = chart.config.options.elements.center;
                var fontStyle = centerConfig.fontStyle || 'Arial';
                var txt = centerConfig.text;
                var color = centerConfig.color || '#000';
                var sidePadding = centerConfig.sidePadding || 20;
                var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
                //Start with a base font of 30px
                ctx.font = "30px " + fontStyle;

                //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                var stringWidth = ctx.measureText(txt).width;
                var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

                // Find out how much the font can grow in width.
                var widthRatio = elementWidth / stringWidth;
                var newFontSize = Math.floor(30 * widthRatio);
                var elementHeight = (chart.innerRadius * 2);

                // Pick a new font size so it will not be larger than the height of label.
                var fontSizeToUse = Math.min(newFontSize, elementHeight);

                //Set font settings to draw it correctly.
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
                var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
                ctx.font = fontSizeToUse + "px " + fontStyle;
                ctx.fillStyle = color;

                //Draw text in center
                ctx.fillText(txt, centerX, centerY);
            }


            if (chart.config.options.elements.imgcenter) {
                //Get ctx from string
                var ctx = chart.chart.ctx;

                //Get options from the center object in options
                var centerConfig = chart.config.options.elements.imgcenter;
                var img = new Image;
                img.src =  centerConfig.imgsrc;
                var sidePadding = centerConfig.sidePadding || 20;
                var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)

                //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                //var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
                var elementWidth = chart.innerRadius * Math.sqrt(2)
                // Find out how much the font can grow in width.
               // var elementHeight = (chart.innerRadius * 2);


                //Set font settings to draw it correctly.
                var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2) - (elementWidth / 2);
                var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2) - (elementWidth / 2);
                img.width = elementWidth
                //img.height = elementHeight
                //Draw text in center
                ctx.drawImage(img, centerX, centerY, img.width, img.width);
            }
        }
    });





//esito scontri

    var optionenemy = {
        responsiveAnimationDuration: 1000,
        responsive: true,
        elements: {
            /* center: {
                text: "a",
                color: '#000000', // Default is #000000
                fontStyle: 'Planes', // Default is Arial
                fontSize: 40,
                sidePadding: 20, // Defualt is 20 (as a percentage)
            } */
            imgcenter: {
                imgsrc: 'css/plane.png',
            }
        },
        plugins: {
            outlabels: {
                display: false,
            },
            labels: [{
                render: 'label',
                position: 'outside',
                fontSize: 14,
                fontStyle: 'bold',
                fontColor: '#000'
            },
            {
                //render: 'value',
                fontSize: 18,
                fontStyle: 'bold',
                fontColor: '#fff'
            }
        ]
        },
        legend: {
            display: false
        }
    };

        var daten = {
            labels: [
                "Kill in Action",
                "Wounded in Action",
                "Prisoner of War",
                "Unhurted",
            ],
            datasets: [{
                data: [43, 5, 4, 5],
                 backgroundColor: [
                    "#990000",
                    "#e65c00",
                    "#e6b800",
                    "#558000"
                ],
                hoverBackgroundColor: [
                    "#990000",
                    "#e65c00",
                    "#e6b800",
                    "#558000"
                ] 
            }]
        };

    var enemygraph = document.getElementById("enemiesgraph").getContext("2d");
    new Chart(enemygraph, {
        type: 'doughnut',
        data: daten,
        options: optionenemy
    });

})
