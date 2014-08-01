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
*/
			function getUserStanding() {
					var json = '{ "responseCode": 200, "listOfGroups": [ { "responseCode": 200, "listOfUserResponses": [ { "responseCode": 200, "username": "aarohi", "hoursMap": {}, "daysMap": { "0": 75 }, "monthsMap": {} }, { "responseCode": 200, "username": "alan", "hoursMap": {}, "daysMap": { "0": 90 }, "monthsMap": {} }, { "responseCode": 200, "username": "anthony", "hoursMap": {}, "daysMap": { "0": 55 }, "monthsMap": {} }, { "responseCode": 200, "username": "sahiti", "hoursMap": {}, "daysMap": { "0": 65 }, "monthsMap": {} } ], "groupWatts": 285, "group": "SBG" }, { "responseCode": 200, "listOfUserResponses": [ { "responseCode": 200, "username": "abaho", "hoursMap": {}, "daysMap": { "0": 70 }, "monthsMap": {} }, { "responseCode": 200, "username": "nathan", "hoursMap": {}, "daysMap": { "0": 62.5 }, "monthsMap": {} }, { "responseCode": 200, "username": "nishant", "hoursMap": {}, "daysMap": { "0": 60 }, "monthsMap": {} }, { "responseCode": 200, "username": "rajagast", "hoursMap": {}, "daysMap": { "0": 82.5 }, "monthsMap": {} } ], "groupWatts": 275, "group": "CVG" } ] }';
					/*
					$.ajax({
						type: "GET",
						url: 'http://10.21.81.249:9081/innovation/powermonitor/getallgroups',
						success: function(data) {
						console.log(data);
						},

						error: function(xhr, text, error) {
						console.log("REQUEST FAILED");
						},

						dataType: "json"
						});
					return json;
					*/
					return json;
			}

			var json = JSON.parse(getUserStanding());
			var userCount = 0;
			var numTop = 5;
			var userArray = [];
			for(i = 0; i < json.listOfGroups.length; ++i){
				for( j = 0; j < json.listOfGroups[i].listOfUserResponses.length ; ++j){
					var user = {};
					user.name = json.listOfGroups[i].listOfUserResponses[j].username;
					user.watts = json.listOfGroups[i].listOfUserResponses[j].daysMap[0];
					userArray.push(user);
					userCount++;
				}
			}
			console.log(userCount);
			console.log(userArray.length);

			function compare(a,b) {
				  if (a.watts < b.watts)
				     return -1;
				  if (a.watts > b.watts)
				    return 1;
				  return 0;
			}

			userArray.sort(compare);
			console.log(userArray.toString());

			if(userCount < 5){
				numTop = userCount;
			}

			function genRow(num, name, watts){
				var html = "<tr><td>" + num + "</td><td>" + name + "</td><td>" + watts + "</td><td></tr>";
				return html; 
			}
			var htmlString = "";

			for(i = 0; i < numTop; ++i){
				htmlString += genRow(i+1, userArray[i].name, userArray[i].watts);
			}

			$( "#my-ecostanding-table" ).html(htmlString);


/*
			var json = JSON.parse(getTeamStanding());
			var htmlString = "";
			var numTopCount = 0;
			console.log("watts: " + json.listOfGroups.length);
			for( i = 0; i < json.listOfGroups.length ; ++i){
				for( j = 0; j < json.listOfGroups.listOfUserResponses.length ; ++j){
					htmlString = genRow(numTopCount+1, json.listOfGroups[i].group, json.listOfGroups[i].groupWatts) + htmlString;
				}	
			}
			*/	


/*
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
*/
			function getTeamStanding() {
					var json = '{ "responseCode": 200, "listOfGroups": [ { "responseCode": 200, "listOfUserResponses": [ { "responseCode": 200, "username": "aarohi", "hoursMap": {}, "daysMap": { "0": 75 }, "monthsMap": {} }, { "responseCode": 200, "username": "alan", "hoursMap": {}, "daysMap": { "0": 90 }, "monthsMap": {} }, { "responseCode": 200, "username": "anthony", "hoursMap": {}, "daysMap": { "0": 55 }, "monthsMap": {} }, { "responseCode": 200, "username": "sahiti", "hoursMap": {}, "daysMap": { "0": 65 }, "monthsMap": {} } ], "groupWatts": 285, "group": "SBG" }, { "responseCode": 200, "listOfUserResponses": [ { "responseCode": 200, "username": "abaho", "hoursMap": {}, "daysMap": { "0": 70 }, "monthsMap": {} }, { "responseCode": 200, "username": "nathan", "hoursMap": {}, "daysMap": { "0": 62.5 }, "monthsMap": {} }, { "responseCode": 200, "username": "nishant", "hoursMap": {}, "daysMap": { "0": 60 }, "monthsMap": {} }, { "responseCode": 200, "username": "rajagast", "hoursMap": {}, "daysMap": { "0": 82.5 }, "monthsMap": {} } ], "groupWatts": 275, "group": "CVG" } ] }'
					return json;
			}
/*
			function genRow(num, name, watts){
				var html = "<tr><td>" + num + "</td><td>" + name + "</td><td>" + watts + "</td><td></tr>";
				return html; 
			}
*/
			json = JSON.parse(getTeamStanding());
			htmlString = "";
			for( i = 0; i < json.listOfGroups.length ; ++i){
				htmlString = genRow(json.listOfGroups.length-i, json.listOfGroups[i].group, json.listOfGroups[i].groupWatts) + htmlString;
			}				

			$( "#team-ecostanding-table" ).html(htmlString);
/*
			getTeamStanding();

			setInterval(function() {
				getTeamStanding();
			}, 1000 * 30);*/
		
		}	

	});
});

