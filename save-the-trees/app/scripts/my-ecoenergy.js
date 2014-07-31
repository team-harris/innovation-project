$(document).ready(function() {

	$('#my-ecoenergy-panel').watch('display', function() {

		var elem = $(this);

		var attr = $(this).attr('isStarted');

		// For some browsers, `attr` is undefined; for others,
		// `attr` is false.  Check for both.
		// Placed here so that we do not have two setInterval methods running and double plotting
		if (typeof attr == typeof undefined || attr == false) {

			elem.attr("isStarted", true);

/*			//========================================================
			// User Energy Graph
			//========================================================

			var userEnergyGraph = $("#user-energy-graph");

			function parseUserEnergyData(data) {

			}

			function setUserEnergyData(data, graph) {

			}
			
			function parseUserEnergy(data)  {
				return value;
			}

			function getUserEnergy() {
				$.ajax({
  					type: "POST",
  					url: "",
  					data: {},
  					success: function(data) {
  						parseUserEnergyData(data);

  						setUserEnergyData(data, Graph);
  					},
  					dataType: "json"
				});
			}

			getUserEnergy();

			setInterval(function() {
				getUserEnergy();
			}, 1000 * 30);



			//========================================================
			// Team Energy Graph
			//========================================================

			var teamEnergyGraph = $("#team-energy-graph");

			function parseTeamEnergyData(data) {

			}

			function setTeamEnergyData(data, Graph) {

			}
			
			function parseTeamEnergy(data)  {
				return value;
			}

			function getTeamEnergy() {
				$.ajax({
  					type: "POST",
  					url: "",
  					data: {},
  					success: function(data) {
  						//var value = parseTeamPointsData(data);

  						setTeamEnergyData(data, Graph);
  					},
  					dataType: "json"
				});
			}

			getTeamEnergy();

			setInterval(function() {
				getTeamEnergy();
			}, 1000 * 30);*/
		
		}	

	});
});
