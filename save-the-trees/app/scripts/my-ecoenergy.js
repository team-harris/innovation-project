$(document).ready(function() {

	$('#my-ecoenergy-panel').watch('display', function() {

		var elem = $(this);

		var attr = $(this).attr('isStarted');

		// For some browsers, `attr` is undefined; for others,
		// `attr` is false.  Check for both.
		// Placed here so that we do not have two setInterval methods running and double plotting
		if (typeof attr == typeof undefined || attr == false) {

			elem.attr("isStarted", true);

			//Morris Line Chart
			function drawChart(element, data, xkey, ykeys, lineColors, labels) {
				Morris.Line({
				// ID of the element in which to draw the chart.
				element: element,
				// Chart data records -- each entry in this array corresponds to a point on
				// the chart.
				data: data,
				// The name of the data record attribute that contains x-visitss.
				xkey: xkey,
				// A list of names of data record attributes that contain y-visitss.
				ykeys: ykeys,
				// Labels for the ykeys -- will be displayed when you hover over the
				// chart.
				lineColors: lineColors,
				labels: labels,
				// Disables line smoothing
				smooth: false,
				resize: true
				});
			}

			//========================================================
			// User Energy Graph
			//========================================================

			var userEnergyGraph = $("#user-energy-graph");

			function parseUserEnergyData(data) {
				var result = [];
				
				for (var i in data) {
					var d = new Date();
					d.setDate(d.getDate()-i);
					var month = d.getMonth()+1;
					var day = d.getDate();
					var output = d.getFullYear() + '-' +
				    ((''+month).length<2 ? '0' : '') + month + '-' +
				    ((''+day).length<2 ? '0' : '') + day;
					result.push({d: output, wattage: data[i]});
				}

				return result;
			}

			function getUserEnergy() {
				$.ajax({
  					type: "GET",
  					url: 'http://10.21.81.249:9081/innovation/powermonitor/getuserdata?data={"username":"natshiel","hours":"0","days":"10","months":"0"}',
  					success: function(data) {
  						console.log(data);
  						var values = parseUserEnergyData(data.daysMap);
  						drawChart('morris-chart-line-my-ecoenergy-day', values,'d', ['wattage'], ['#16a085'], ['wattage'])
  					},

  					error: function(xhr, text, error) {
  						console.log("REQUEST FAILED");
  					},

  					dataType: "json"
				});
	
			}

			getUserEnergy();


			//========================================================
			// Team Energy Graph
			//========================================================

			var teamEnergyGraph = $("#team-energy-graph");

			function parseTeamEnergyData(data) {
				var result = [];
				for (var i = 0; i < data.length; i++) {
					var d = new Date();
					d.setDate(d.getDate()-i);
					var month = d.getMonth()+1;
					var day = d.getDate();
					var output = d.getFullYear() + '-' +
				    ((''+month).length<2 ? '0' : '') + month + '-' +
				    ((''+day).length<2 ? '0' : '') + day;
					result.push({d: output, wattage: data[i].total});
				}
				return result;
			}

			function getTeamEnergy() {
				$.ajax({
  					type: "GET",
  					url: 'http://10.21.81.249:9081/innovation/powermonitor/getgroupdata?data={"group":"Team Harris","hours":"0","days":"10","months":"0"}',
  					success: function(data) {
  						var values = parseTeamEnergyData(data.listOfUserResponses);
  						drawChart('morris-chart-line-team-ecoenergy-day', values,'d', ['wattage'], ['#16a085'], ['wattage']);
  					},

  					error: function(xhr, text, error) {
  						console.log("REQUEST FAILED");
  					},

  					dataType: "json"
				});
	
			}

			getTeamEnergy();

/*
			setInterval(function() {
				getTeamEnergy();
			}, 1000 * 30);
*/
		
		}	

	});
});
