function controlMsg() {
	if (log[0] === "oldPlayer" || log[0] === "newPlayer") {
		$(".errorMsg").html("");
		$(".section_one").hide();
		$(".section_two").show();
		if (typeof log[2] !== 'undefined') {
			playerId = parseInt(log[1]);
			$("#playerName").html(log[2]);
			$(".section_info").slideToggle("slow");
			log = [];
			currentLogNumber = 0;
		}
	}
	if (typeof log[0] !== 'undefined' && log[0] === "false") {
		$("#errorMsg").html("Bitte Namen eingeben!");
		log = [];
		currentLogNumber = 0;
	}
	if (typeof log[0] !== 'undefined' && log[0].search("y") === 0) {
		matchID = parseInt(log[0].substring(1, 4));
		$("#conCode").html("Einladungs-Code: " + matchID);
		log = [];
		currentLogNumber = 0;
	}
	if (typeof log[0] !== 'undefined' && log[0] === "matchID_true") {
		$(".section_two").hide();
		$(".section_three").show();
		matchID = $("#matchID").val();
		$("#conCode").html("Lobby: " + matchID);
		log = [];
		currentLogNumber = 0;
	}
	if (typeof log[0] !== 'undefined' && log[0] === "matchID_false") {
		log = [];
		currentLogNumber = 0;
	}

	if (typeof log[0] !== 'undefined' && log[0].search("x") === 0 && typeof log[1] !== 'undefined' && log[1].search("x") === 0) {
		$(".section_info").html(log[0].substring(1) + " vs. " + log[1].substring(1));
		$("#conCode").html("Lobby: " + matchID);
		console.log(matchID);
		if (log[0].substring(1) === userName) {
			enemyName = log[1].substring(1);
		} else if (log[1].substring(1) === userName) {
			enemyName = log[0].substring(1);
		}
		console.log(enemyName);
		log = [];
		currentLogNumber = 0;
		enemyConnection = true;
		if (playerStarted === true) {
			$.connection.hub.start().done(function() {
				SVHUB.server.playerStarted();
			});
		}
	}

	if (typeof log[0] !== 'undefined' && log[0] === "enemyReady") {
		checkEnemyReadyBtn = true;
		if (enemyConnection === true && checkEnemyReadyBtn === true && checkReadyBtn === true) {
			$(".section_four").hide();
			$(".section_five").show();
		}
		log = [];
		currentLogNumber = 0;
	}
	if (typeof log[0] !== 'undefined' && log[0] === "startGame") {
		$(".section_info").html("Du bist dran!");
		$(".coordinate").css({"background-color": "#137791"});
		$("#fieldTableEnemy").css({"border-style": "solid", "border-color": "green"});
		$(".section_myField").css({"border-style": "solid", "border-color": "red"});
		myTurn = true;
		log = [];
		currentLogNumber = 0;
	}

	if (typeof log[0] !== 'undefined' && log[0] === "turn_t") {
		$(".section_info").html("Du bist dran!");
		$(".coordinate").css({"background-color": "#137791"});
		$("#fieldTableEnemy").css({"border-style": "solid", "border-color": "green"});
		$(".section_myField").css({"border-style": "solid", "border-color": "red"});
		myTurn = true;
		log = [];
		currentLogNumber = 0;
	}

	if(typeof log[0] !== 'undefined' && log[0].search("sfld") === 0){
		var shipID = log[0].substring(4);
		markedFieldPoint.addClass("sid"+shipID);
		log = [];
		currentLogNumber = 0;
	}

	if (typeof log[0] !== 'undefined' && log[0] === "hit") {
		console.log(markedFieldPoint);
		markedFieldPoint.addClass("untilBurn");
		countDestroyedShips++;

		$(".gameInfo_myHits").html("Deine Treffer : " + countDestroyedShips + "/25");
		log = [];
		currentLogNumber = 0;
		if (countDestroyedShips === 25) {
			$.connection.hub.start().done(function() {
				SVHUB.server.setWinner(matchID, userName);
				SVHUB.server.removeField(15);
			});
		}
	}

	if (typeof log[0] !== 'undefined' && log[0] === "turn_f") {
		$(".section_info").html(enemyName + " ist dran!");
		$(".coordinate").css({"background-color": "rgba(19, 119, 145,0.2)"});
		$("#fieldTableEnemy").css({"border-style": "solid", "border-color": "red"});
		$(".section_myField").css({"border-style": "solid", "border-color": "green"});
		myTurn = false;
		log = [];
		currentLogNumber = 0;
	}

	if (typeof log[0] !== 'undefined' && log[0] === "failed") {
		markedFieldPoint.addClass("failedwater");
		log = [];
		currentLogNumber = 0;
	}
	if (typeof log[0] !== 'undefined' && log[0].search("winner") === 0) {
		$("#winnerMsg").html("Der Gewinner ist " + log[0].substring(6));
		$("#winner").show();
		$(".section_five").hide();
		$(".section_info").hide();
		log = [];
		currentLogNumber = 0;
	}

	if (typeof log[0] !== 'undefined' && log[0].search("enemyHit_column") === 0) {
		col = log[0].substring(15);
		log = [];
		currentLogNumber = 0;
	}
	if (typeof log[0] !== 'undefined' && log[0].search("enemyHit_row") === 0) {
		row = log[0].substring(12);
		$("#fieldTableMy").children("#row" + row).children("#cell" + col).addClass("hit");
		console.log($("#fieldTableMy").children("#row" + row).children("#cell" + col).attr('class'));
		counterHit++;
		$(".gameInfo_enemyHits").html("Gegnerische Treffer: " + counterHit + "/25");
		log = [];
		currentLogNumber = 0;
	}
	if (typeof log[0] !== 'undefined' && log[0].search("enemyFailed_column") === 0) {
		col = log[0].substring(18);
		log = [];
		currentLogNumber = 0;
	}
	if (typeof log[0] !== 'undefined' && log[0].search("enemyFailed_row") === 0) {
		row = log[0].substring(15);
		$("#fieldTableMy").children("#row" + row).children("#cell" + col).addClass("failed");
		console.log($("#fieldTableMy").children("#row" + row).children("#cell" + col).attr('class'));
		log = [];
		currentLogNumber = 0;
	}
	if (typeof log[0] !== 'undefined' && log[0].search("matchID_DontExist") === 0) {
		$("#errorMatchID").html("Dieser Einladungscode existiert nicht!");
		log = [];
		currentLogNumber = 0;

	}
	if(typeof log[0] !== 'undefined' && log[0].search("ship_destroy_true") === 0){
		console.log("true");

		switch(log[0]){
			case "ship_destroy_true_10":
				$(".sid10").removeClass("untilBurn");
				$(".sid10").addClass("burnwater");
				countDestroyedBattleship++;
				$(".gameInfo_hitBattleship").html("Battleship: "+countDestroyedBattleship+"/1");
				break;
			case "ship_destroy_true_11":
				$(".sid11").removeClass("untilBurn");
				$(".sid11").addClass("burnwater");
				countDestroyedCruiser++;
				$(".gameInfo_hitCrusier").html("Crusier: "+countDestroyedCruiser+"/1");
				break;
			case "ship_destroy_true_12":
				$(".sid12").removeClass("untilBurn");
				$(".sid12").addClass("burnwater");
				countDestroyedDestroyer++;
				$(".gameInfo_hitDestroyer").html("Destroyer: "+countDestroyedDestroyer+"/2");
				break;
			case "ship_destroy_true_13":
				$(".sid13").removeClass("untilBurn");
				$(".sid13").addClass("burnwater");
				countDestroyedDestroyer++;
				$(".gameInfo_hitDestroyer").html("Destroyer: "+countDestroyedDestroyer+"/2");
				break;
			case "ship_destroy_true_14":
				$(".sid14").removeClass("untilBurn");
				$(".sid14").addClass("burnwater");
				countDestroyedSubmarine++;
				$(".gameInfo_hitSubmarine").html("Submarine: "+countDestroyedSubmarine+"/3");
				break;
			case "ship_destroy_true_15":
				$(".sid15").removeClass("untilBurn");
				$(".sid15").addClass("burnwater");
				countDestroyedSubmarine++;
				$(".gameInfo_hitSubmarine").html("Submarine: "+countDestroyedSubmarine+"/3");
				break;
			case "ship_destroy_true_16":
				$(".sid16").removeClass("untilBurn");
				$(".sid16").addClass("burnwater");
				countDestroyedSubmarine++;
				$(".gameInfo_hitSubmarine").html("Submarine: "+countDestroyedSubmarine+"/3");
				break;
			case "ship_destroy_true_17":
				$(".sid17").removeClass("untilBurn");
				$(".sid17").addClass("burnwater");
				countDestroyedDinghy++;
				$(".gameInfo_hitDinghy").html("Dinghy: "+countDestroyedDinghy+"/4");
				break;
			case "ship_destroy_true_18":
				$(".sid18").removeClass("untilBurn");
				$(".sid18").addClass("burnwater");
				countDestroyedDinghy++;
				$(".gameInfo_hitDinghy").html("Dinghy: "+countDestroyedDinghy+"/4");
				break;
			case "ship_destroy_true_19":
				$(".sid19").removeClass("untilBurn");
				$(".sid19").addClass("burnwater");
				countDestroyedDinghy++;
				$(".gameInfo_hitDinghy").html("Dinghy: "+countDestroyedDinghy+"/4");
				break;
			case "ship_destroy_true_20":
				$(".sid20").removeClass("untilBurn");
				$(".sid20").addClass("burnwater");
				countDestroyedDinghy++;
				$(".gameInfo_hitDinghy").html("Dinghy: "+countDestroyedDinghy+"/4");
				break;
		}

		log = [];
		currentLogNumber = 0;
	}
	if(typeof log[0] !== 'undefined' && log[0].search("ship_destroy_false") === 0){
		console.log("Kein Schiff wurde zerstört");
		log = [];
		currentLogNumber = 0;
	}
	if(typeof log[0] !== 'undefined' && log[0].search("AllWinner") === 0){
		$(".highscore").append("<li>"+ log[0].substring(12) + ": " + log[0].substring(10,11) +"</li>");
		log = [];
		currentLogNumber = 0;
	}
	if(typeof log[0] !== 'undefined' && log[0].search("msg")===0){
		// $(".chatMsg").append("<li>"+userName+": "+log[0].substring()+"</li>"); //substring
		$(".chatMsg").append("<li>"+log[0].substring(2)+"</li>");
		log = [];
		currentLogNumber = 0;
	}
}



















