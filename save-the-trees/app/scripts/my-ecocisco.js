$(document).ready(function() {

	$('#my-ecocisco-panel').watch('display', function() {

		var elem = $(this);

		var attr = $(this).attr('isStarted');

		// For some browsers, `attr` is undefined; for others,
		// `attr` is false.  Check for both.
		// Placed here so that we do not have two setInterval methods running and double plotting
		if (typeof attr == typeof undefined || attr == false) {

			elem.attr("isStarted", true);

			//User Wattage
			var userWattage = 0;

			//========================================
			// Code for the Moving Line
			//========================================
			var container = $("#flot-chart-moving-line");
			
			// Determine how many data points to keep based on the placeholder's initial size;
			// this gives us a nice high-res plot while avoiding more than one point per pixel.

			var maximum = container.outerWidth() / 2 || 300;

			var data = [];

		    function getRandomData() {

		        if (data.length) {
		            data = data.slice(1);
		        }

		        while (data.length < maximum) {
		            var previous = data.length ? data[data.length - 1] : 50;
		            var y = userWattage;
		            data.push(y < 0 ? 0 : y > 150 ? 150 : y);
		        }

		        // zip the generated y values with the x values

		        var res = [];
		        for (var i = 0; i < data.length; ++i) {
		            res.push([i, data[i]])
		        }

		        return res;
		    }

			series = [{
				data: getRandomData(),
				lines: {
					fill: true
				}
			}];

			var plot = $.plot(container, series, {
				grid: {
					borderWidth: 1,
					minBorderMargin: 20,
					labelMargin: 10,
					backgroundColor: {
						colors: ["#fff", "#e4f4f4"]
					},
					margin: {
						top: 8,
						bottom: 20,
						left: 20
					},
					markings: function(axes) {
						var markings = [];
						var xaxis = axes.xaxis;
						for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
							markings.push({ xaxis: { from: x, to: x + xaxis.tickSize }, color: "rgba(232, 232, 255, 0.2)" });
						}
						return markings;
					}
				},
				xaxis: {
					tickFormatter: function() {
						return "";
					}
				},
				yaxis: {
					min: 0,
					max: 150
				},
				legend: {
					show: true
				}
			});

			// Update the random dataset at 25FPS for a smoothly-animating chart

			setInterval(function updateRandom() {
				series[0].data = getRandomData();
				plot.setData(series);
				plot.draw();
			}, 40);

			//Generic Ticker Setter
			function setPointsOnTicker(text, elem) {
				if (text == typeof undefined) {
					elem.text("UNDEFINED");
				}
				elem.text(text);
			}

			//===========================================================
			//  Energy Usage Ticker
			//===========================================================
			var energyUsageTicker = $("#energy-usage-ticker");

			function parseEnergyUsageData(data)  {
				userWattage = data.watts;
				return userWattage;
			}

			function getEnergyUsage() {
				$.ajax({
  					type: "GET",
  					url: "http://10.156.48.50:9081/innovation/powermonitor/getlivedata/natshiel",
  					success: function(data) {
  						var value = parseEnergyUsageData(data);
  						setPointsOnTicker(value, energyUsageTicker);
  					},

  					error: function(xhr, text, error) {
  						console.log("REQUEST FAILED");
  					},

  					dataType: "json"
				});
			}

			setPointsOnTicker(getEnergyUsage(), energyUsageTicker);
			
			setInterval(function() {
				setPointsOnTicker(getEnergyUsage(), energyUsageTicker);
			}, 1000 * 10);	

			//========================================================
			// User Point Ticker
			//========================================================

			var userPointsTicker = $("#user-points-ticker");
			
			function convertWattageToPoints(data) {

			}

			function getUserPoints() {
				//convertWattageToPoints
				return userWattage;
			}
	
			setPointsOnTicker(getUserPoints(), userPointsTicker);

			setInterval(function() {
				setPointsOnTicker(getUserPoints(), userPointsTicker);
			}, 500);


			//===========================================================
			// Team Points Ticker
			//===========================================================
			var teamPointsTicker = $("#team-points-ticker");


			function parseTeamPointsData(data)  {
				return 200;
			}

			function getTeamPoints() {
					$.ajax({
  					type: "GET",
  					url: 'http://10.156.48.50:9081/innovation/powermonitor/getuserdata?data={"username":"natshiel","hours":"10","days":"0","months":"0"}',
  					success: function(data) {
  						console.log(data)
  					},

  					error: function(xhr, text, error) {
  						console.log("REQUEST FAILED");
  					},

  					dataType: "json"
				});
	
			}
			
			/*
			function getTeamPoints() {
				return	Math.floor((Math.random() * 100) + 1);	
			}	
			*/

			setPointsOnTicker(getTeamPoints(), teamPointsTicker);	

			//===========================================================
			// Pledge Points Ticker
			//===========================================================
			var pledgePointsTicker = $("#pledge-points-ticker");


			function parsePledgePointsData(data)  {
				var value = data.pledges;
				return value;
			}

			function getPledgePoints() {
				$.ajax({
  					type: "GET",
  					url: "http://10.156.48.50:9081/innovation/powermonitor/getpledge/natshiel",
  					success: function(data) {
  						var value = parsePledgePointsData(data);
  						setPointsOnTicker(value, pledgePointsTicker)
  					},

  					error: function(xhr, status, text) {
  						console.log("error get pledge data")
  					},
  					dataType: "json"
				});
			}

			setPointsOnTicker(getPledgePoints(), pledgePointsTicker);
			
			setInterval(function() {
				setPointsOnTicker(getPledgePoints(), pledgePointsTicker);
			}, 1000 );		

		}	

	});
});

