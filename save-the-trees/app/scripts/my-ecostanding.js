$(document).ready(function() {

	$('#my-ecostanding-panel').watch('display', function() {

		var elem = $(this);

		var attr = $(this).attr('isStarted');

		// For some browsers, `attr` is undefined; for others,
		// `attr` is false.  Check for both.
		// Placed here so that we do not have two setInterval methods running and double plotting
		if (typeof attr == typeof undefined || attr == false) {

			elem.attr("isStarted", true);
/*
			//========================================================
			// User Standing Table
			//========================================================

			var userStandingTable = $("#user-standing-table");

			function parseUserStandingData(data) {

			}

			function setUserStandingData(data, table) {

			}
			
			function parseUserStanding(data)  {
				return value;
			}

			function getUserStanding() {
				return MASSIVE_JSON_STRING;
			}

			getUserStanding();

			setInterval(function() {
				getUserStanding();
			}, 1000 * 30);



			//========================================================
			// Team Standing Table
			//========================================================

			var teamStandingTable = $("#Team-standing-table");

			function parseTeamStandingData(data) {

			}

			function setTeamStandingData(data, table) {

			}
			
			function parseTeamStanding(data)  {
				return value;
			}

			function getTeamStanding() {
				$.ajax({
  					type: "POST",
  					url: "",
  					data: {},
  					success: function(data) {
  						//var value = parseTeamPointsData(data);

  						setTeamStandingData(data, table);
  					},
  					dataType: "json"
				});
			}

			getTeamStanding();

			setInterval(function() {
				getTeamStanding();
			}, 1000 * 30);*/
		
		}	

	});
});

