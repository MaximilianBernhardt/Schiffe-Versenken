function controlMsg() {
    if (log[0] === "oldPlayer" || log[0] === "newPlayer") {
        $(".errorMsg").html("");
        $(".section_one").hide();
        $(".section_two").show();
        if (typeof log[2] !== 'undefined') {
            playerID = parseInt(log[1]);
            $("#playerName").html(log[2]);
            $(".section_info").slideToggle("slow");
            log = [];
            correntLogNumber = 0;
        }
    }
    if (typeof log[0] !== 'undefined' && log[0] === "false") {
        $("#errorMsg").html("Bitte Namen eingeben!");
        log = [];
        correntLogNumber = 0;
    }
    if (typeof log[0] !== 'undefined' && log[0].search("y") === 0) {
        matchID = parseInt(log[0].substring(1, 4));
        $("#conCode").html("Einladungs-Code: " + matchID);
        log = [];
        correntLogNumber = 0;
    }
    if (typeof log[0] !== 'undefined' && log[0] === "matchID_true") {
        $(".section_two").hide();
        $(".section_three").show();
        matchID = $("#matchID").val();
        $("#conCode").html("Lobby: " + matchID);
        log = [];
        correntLogNumber = 0;
    }
    if (typeof log[0] !== 'undefined' && log[0] === "matchID_false") {
        log = [];
        correntLogNumber = 0;
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
        correntLogNumber = 0;
        enemyConnection = true;
        if (playerStarted === true) {
            $.connection.hub.start().done(function () {
                SVHUB.server.playerStarted();
            });
        }
    }

    if (typeof log[0] !== 'undefined' && log[0]==="enemyReady") {
        checkEnemyReadyBtn = true;
        if (enemyConnection === true && checkEnemyReadyBtn === true && checkReadyBtn === true) {
            $(".section_four").hide();
            $(".section_five").show();
        }
        log = [];
        correntLogNumber = 0;
    }
    if (typeof log[0] !== 'undefined' && log[0] === "startGame") {
        $(".section_info").html("Du bist dran!");
        // Hier wird gebastelt
        $(".coordinate").css({"background-color": "#137791"});
        // ende vom basteln
        $("#fieldTableEnemy").css({"border-style": "solid", "border-color": "green"});
        $(".section_myField").css({"border-style": "solid", "border-color": "red"});
        myTurn = true;
        log = [];
        correntLogNumber = 0;
    }

    if (typeof log[0] !== 'undefined' && log[0] === "turn_t") {
        $(".section_info").html("Du bist dran!");
        $(".coordinate").css({"background-color": "#137791"});
        $("#fieldTableEnemy").css({"border-style": "solid", "border-color": "green"});
        $(".section_myField").css({"border-style": "solid", "border-color": "red"});
        myTurn = true;
        log = [];
        correntLogNumber = 0;
    }

    if(typeof log[0] !== 'undefined' && log[0] === "hit"){
        console.log(markedFieldPoint);
        markedFieldPoint.addClass("burnwater");
        countDestroyedShips++;

        $(".gameInfo_myHits").html("Deine Treffer : " +countDestroyedShips+ "/25");
        log = [];
        correntLogNumber = 0;
        if(countDestroyedShips===25) {
            $.connection.hub.start().done(function () {
                SVHUB.server.setWinner(matchID, userName);
                SVHUB.server.removeField(15);
                // $(".section_five").hide();
                // $("#winner").show();
            });
        }
    }

    if (typeof log[0] !== 'undefined' && log[0] === "turn_f") {
        $(".section_info").html("Dein Gegner ist dran!");
        // Hier wird gebastelt
        $(".coordinate").css({"background-color": "rgba(19, 119, 145,0.2)"});
        // ende vom basteln
        $("#fieldTableEnemy").css({"border-style": "solid", "border-color": "red"});
        $(".section_myField").css({"border-style": "solid", "border-color": "green"});
        myTurn = false;
        log = [];
        correntLogNumber = 0;
    }

    if(typeof log[0] !== 'undefined' && log[0] === "failed"){
        console.log(markedFieldPoint);
        markedFieldPoint.addClass("failedwater");
        log = [];
        correntLogNumber = 0;
    }
    if(typeof log[0] !== 'undefined' && log[0].search("winner")===0){
        $("#winnerMsg").html("Der Gewinner ist "+log[0].substring(6));
        $("#winner").show();
        $(".section_five").hide();
        $(".section_info").hide();
        log = [];
        correntLogNumber = 0;
    }

    if(typeof log[0] !== 'undefined'&& log[0].search("enemyHit_column")===0){
        col = log[0].substring(15);
        log = [];
        correntLogNumber = 0;
    }
    if(typeof log[0] !== 'undefined'&& log[0].search("enemyHit_row")===0){
        row = log[0].substring(12);
        $("#fieldTableMy").children("#row"+row).children("#cell"+col).addClass("hit");
        console.log($("#fieldTableMy").children("#row"+row).children("#cell"+col).attr('class'));
        counterHit++;
        $(".gameInfo_enemyHits").html("Gegnerische Treffer: " +counterHit+ "/25");
        log = [];
        correntLogNumber = 0;
    }
    if(typeof log[0] !== 'undefined'&& log[0].search("enemyFailed_column")===0){
        col = log[0].substring(18);
        log = [];
        correntLogNumber = 0;
    }
    if(typeof log[0] !== 'undefined'&& log[0].search("enemyFailed_row")===0){
        row = log[0].substring(15);
        $("#fieldTableMy").children("#row"+row).children("#cell"+col).addClass("failed");
        console.log($("#fieldTableMy").children("#row"+row).children("#cell"+col).attr('class'));
        log = [];
        correntLogNumber = 0;
    }
    if(typeof log[0] !== 'undefined' && log[0].search("matchID_DontExist")===0){
        $("#errorMatchID").html("Dieser Einladungscode existiert nicht!");
    }
}
