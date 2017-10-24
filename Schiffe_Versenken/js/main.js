$(document).ready(function() {

	$(".section_infoBox, .section_two, .section_three, .section_myField, .section_myField_create, .section_enemyField, .section_info, .section_four, .section_five, #winner").hide();

	$("#btn_toLogin").click(function() {
		location.reload();
	});
	$(".section_infoBoxLogin, .section_infoBoxCreateGame, .section_infoBoxSetShips, .section_infoBoxPlay, .section_infoBoxWinner, .section_infoBoxWait").hide();
	$(".section_highscore").hide();
	$(".highscore").hide();
	$(".section_chat").hide();
	$(".chatBtn").hide();
	$(".section_infoBoxLogin").show();
	

	$(".highscoreBtn").click(function() {
		$(".section_highscore").animate({width:'toggle'},350);
		$(".highscore").toggle(350);
	});
	
	$(".infoBtn").click(function(){
		$(".section_infoBox").animate({width:'toggle', height: 'toggle'},250);
	});

	SVHUB.client.receive = function(message) {
		log[currentLogNumber] = message;
		currentLogNumber++;
		controlMsg();
	};

	$(document).on('mouseover', '.coordinate', function() {
		$(".coordinate").removeClass("coordinateEvent");
		if (myTurn === true) {
			$(this).addClass("coordinateEvent");
		}
	});

	$.connection.hub.start().done(function() {

		SVHUB.server.getHighscoreList();

		$("#submitName").click(function() {
			userName = htmlEscape($("#userName").val());
			SVHUB.server.login(userName);

			$(".chatBtn").show();
				
			$(".section_infoBoxLogin").hide();
			$(".section_infoBoxCreateGame").show();

			$(".chatBtn").click(function() {
				$(".chatBtn").removeClass("chatBtnEv");
				$(".section_chat").animate({width:'toggle'},250);
			});

		});
		$("#userName").keydown(function(e) {
			if (e.which === 13) {
				userName = htmlEscape($("#userName").val());
				SVHUB.server.login(userName);
				$(".chatBtn").show();
				
				$(".section_infoBoxLogin").hide();
				$(".section_infoBoxCreateGame").show();

				$(".chatBtn").click(function() {
					$(".chatBtn").removeClass("chatBtnEv");
					$(".section_chat").animate({width:'toggle'},250);
				});
			}


		});
		$("#nextPage").click(function() {

			$(".section_myField_create").show();
			if ($("#matchID").val() === "") {
				generateField($("#fieldSize").val());
				fieldSet = true;
				SVHUB.server.createField(size, playerId);
				SVHUB.server.createGame($("#difficulty").val(), playerId, size);
				$(".section_two").hide();
				$(".section_three").show();
				$("#playerName").html(userName + ", setzte deine Schiffe!");

				$(".section_infoBoxCreateGame").hide();
				$(".section_infoBoxSetShips").show();

			} else {
				SVHUB.server.getGame(parseInt($("#matchID").val()), playerId, $("#difficulty").val(), size);
				SVHUB.server.getPlayerNameFromMatch(parseInt($("#matchID").val()));

				
				$(".section_infoBoxCreateGame").hide();
				$(".section_infoBoxSetShips").show();

			}
		});
		$("#btn_startgame").click(function() {
			var shipCounter = 0;
			for (var i = 1; i <= 15; i++) {
				shipSettings.push([]);
				if (i === 1) {
					shipSettings.push([]);
				}
				for (var j = 1; j <= 15; j++) {
					console.log($(".section_myField_create").children("#fieldTable").children("#row" + i).children("#cell" + j).prop("className").substring(11));
					checkFieldContent = $(".section_myField_create").children("#fieldTable").children("#row" + i).children("#cell" + j).prop("className").substring(11);
					if (checkFieldContent === "battleship" || checkFieldContent === "cruiser" || checkFieldContent === "destroyer1" ||
						checkFieldContent === "destroyer2" || checkFieldContent === "submarine1" || checkFieldContent === "submarine2" ||
						checkFieldContent === "submarine3" || checkFieldContent === "dinghy1" || checkFieldContent === "dinghy2" ||
						checkFieldContent === "dinghy3" || checkFieldContent === "dinghy4") {
						shipCounter++;
						shipSettings[i].push(checkFieldContent);
						SVHUB.server.setFieldValues(playerId, "c" + j, i, checkFieldContent);
					} else {
						shipSettings[i].push("none");
					}
				}
			}
			if (shipCounter === 25) {
				generateEnemyField(15);
				generateMyField(15);
				$(".section_three").hide();
				$(".section_four").show();
				$("#playerName").html("Habe Ausschau nach Gegnern Matrose!");
				$("#gameInfo").html("Einladungs-Code: " + matchID);

				$(".section_infoBoxSetShips").hide();
				$(".section_infoBoxWait").show();
				
				checkReadyBtn = true;
				playerStarted = true;
				SVHUB.server.playerStarted();
			} else {
				$("#errorShips").html("Setze alle Schiffe");
			}
			if (enemyConnection === true && checkEnemyReadyBtn === true && checkReadyBtn === true) {
				$(".section_four").hide();
				$(".section_five").show();

				$(".section_infoBoxSetShips").hide();
				$(".section_infoBoxWait").hide();
				$(".section_infoBoxPlay").show();

				$(".section_info").html("Dein Gegner ist dran!");
				$(".coordinate").css({"background-color": "rgba(19, 119, 145, 0.5)"});
				$("#fieldTableEnemy").css({"border-style": "solid", "border-color": "red"});
				$(".section_myField").css({"border-style": "solid", "border-color": "green"});
				SVHUB.server.startGame();
			}
		});

		$(document).on('click', '.coordinate', function() {
			var cellNb;
			var rowNb;
			if (myTurn === true) {
				markedFieldPoint = $(this);
				var ship = $(this).attr('class');
				cellNb = $(this).prop("id").substring(4, 6);
				rowNb = parseInt($(this).parent().prop("id").substring(3, 5));
				SVHUB.server.changeFieldValues(enemyName, cellNb, rowNb);
			}
		});
		$('.sendMsg').click(function(){
			sendMsg();
		});

		$(".chatInput").keydown(function(e) {
			if (e.which === 13) {
				sendMsg();
			}
		});
	});
});

function htmlEscape(str) {
	return str
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

function sendMsg(){
	var timeStamp = new Date();
	var h = checkTime(timeStamp.getHours());
	var min = checkTime(timeStamp.getMinutes());
	var sec = checkTime(timeStamp.getSeconds());
	msg = htmlEscape($(".chatInput").val());
	if(msg !== "") {
		SVHUB.server.sendMsg("msg_[" + h + ":" + min + ":" + sec + "]_" + userName + ":_" + msg + " ");
	}

	$(".chatInput").val("");
}

function checkTime(time) {
	if(time<10){
		time="0"+time;
		return time;
	}else{return time;}

}