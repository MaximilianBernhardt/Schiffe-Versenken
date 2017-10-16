var svHub = $.connection.svHub;

var userName;
var playerID;

var fieldSet = false;
var size = 0;

var enemyName;
var matchID;

var correntLog = 0;
var log = [];

var checkFieldContent;
var checkReadyBtn = false;

var checkEnemyReadyBtn = false;
var enemyConnection = false;

var getPlayerSt = false;

var myTurn = false;

var markedFieldPoint;

var countDestroyedShips = 0;

var isCellEmpty = true;

var shipSettings = [];

var col;
var row;
var counterHit = 0;

$(document).ready(function () {
    // $(".section_one").hide();
    $(".section_two").hide();
    $(".section_three").hide();
    $(".section_myField").hide();
    $(".section_myField_create").hide();
    $(".section_enemyField").hide();
    $(".section_info").hide();
    $(".section_four").hide();
    $(".section_five").hide();
    $("#winner").hide();

    $("#btn_toLogin").click(function () {
        location.reload();
    });


    svHub.client.receive = function (message) {
        log[correntLog] = message;
        console.log(log[correntLog]);
        correntLog++;
        controlMsg();
    };

    $.connection.hub.start().done(function () {
        $("#submitName").click(function () {
            userName = $("#userName").val();
            svHub.server.login(userName);
        });
        $("#userName").keydown(function (e) {
            if (e.which == 13) {
                userName = $("#userName").val();
                svHub.server.login(userName);
            }
        });
        $("#nextPage").click(function () {
            deleteField();
            generateField($("#fieldSize").val());
            fieldSet = true;
            svHub.server.createField(size, playerID);
            $(".section_myField_create").show();
            if($("#matchID").val()===""){
                svHub.server.createGame($("#difficulty").val(), playerID, size);
                $(".section_two").hide();
                $(".section_three").show();
                $("#playerName").html(userName + ", setzte deine Schiffe!");
            } else{
                svHub.server.getGame(parseInt($("#matchID").val()), playerID, $("#difficulty").val(), size);
                svHub.server.getPlayerNameFromMatch(parseInt($("#matchID").val()));
            }
        });
        $("#btn_startgame").click(function () {
            generateMyField(15);
            var shipCounter = 0;
            console.log("-----------------Checkt gesetzte Schiffe und speichert auf Datenbank---------------------");
            for(var i = 1; i <= 15; i++){
                shipSettings.push([]);
                if(i===1){
                    shipSettings.push([]);
                }
                for(var j = 1; j <= 15; j++){
                    console.log($(".section_myField_create").children("#fieldTable").children("#row"+i).children("#cell"+j).prop("className").substring(11));
                    checkFieldContent = $(".section_myField_create").children("#fieldTable").children("#row"+i).children("#cell"+j).prop("className").substring(11);
                    if(checkFieldContent==="battleship"||checkFieldContent==="cruiser"||checkFieldContent==="destroyer1"||
                        checkFieldContent==="destroyer2"||checkFieldContent==="submarine1"||checkFieldContent==="submarine2"||
                        checkFieldContent==="submarine3"||checkFieldContent==="dinghy1"||checkFieldContent==="dinghy2"||
                        checkFieldContent==="dinghy3"||checkFieldContent==="dinghy4")
                    {
                        shipCounter++;
                        shipSettings[i].push(checkFieldContent);
                        svHub.server.setFieldValues(playerID, "c"+j, i);

                        if(j===15) {
                            console.log(shipSettings[i]);
                        }
                    }else{
                        shipSettings[i].push("none");
                        if(j===15){
                             console.log(shipSettings[i]);
                        }
                    }
                }
            }
            if(shipCounter===25){
                $(".section_three").hide();
                $(".section_four").show();
                $("#playerName").html("Habe Ausschau nach Gegnern Matrose!");
                $("#gameInfo").html("Lobby/Einladungs-Code: "+matchID);
                checkReadyBtn = true;
                getPlayerSt = true;
                svHub.server.getPlayerSt();
            }else{
                $("#errorShips").html("Setzte alle Schiffe");
            }

            console.log("---------------------Ende--------------------------");
            if(enemyConnection === true && checkEnemyReadyBtn === true && checkReadyBtn === true) {
                $(".section_four").hide();
                $(".section_five").show();
                $(".section_info").html("Dein Gegner ist dran!");
                $("#fieldTableEnemy").css({"border-style": "solid", "border-color": "red"});
                $(".section_myField").css({"border-style": "solid", "border-color": "green"});
                svHub.server.startGame();
            }
        });


        //Spielablauf!

        $(document).on('click','.coordinate',function () {
            if(myTurn===true){
                markedFieldPoint = $(this);
                console.log(markedFieldPoint);
                var cellNb =$(this).prop("id").substring(4, 6);
                var rowNb = parseInt($(this).parent().prop("id").substring(3, 5));
                svHub.server.changeFieldValues(enemyName,cellNb,rowNb);
            }
        });



    });
});

function generateField(size) {
    size++;
   $(".section_myField, .section_myField_create").append("<table id='fieldTable'></table>");
   for (var i = 1; i < size; i++) {
       var row=$("<tr></tr>");
       //row.addClass("");
       var rowId="row"+i;
       row.attr("id",rowId);
       $("#fieldTable").append(row);

       for (var j = 1; j < size; j++) {
           var cell=$("<td></td>");
           cell.addClass("fieldPoint");
           var cellID="cell"+j;
           cell.attr("id",cellID);
           $(row).append(cell);
       }
   }
   this.size=size;
}
function deleteField() {
   $("#fieldTable").remove();
}

function controlMsg() {
    if (log[0] === "oldPlayer" || log[0] === "newPlayer") {
        $(".errorMsg").html("");
        $(".section_one").hide();
        $(".section_two").show();
        if (typeof log[2] != 'undefined') {
            playerID = parseInt(log[1]);
            $("#playerName").html(log[2]);
            $(".section_info").slideToggle("slow");
            log = [];
            correntLog = 0;
        }
    }
    if (typeof log[0] != 'undefined' && log[0] === "false") {
        $("#errorMsg").html("Bitte Namen eingeben!");
        log = [];
        correntLog = 0;
    }
    if (typeof log[0] != 'undefined' && log[0].search("y") === 0) {
        matchID = parseInt(log[0].substring(1, 4));
        $("#conCode").html("Einladungs-Code: " + matchID);
        log = [];
        correntLog = 0;
    }
    if (typeof log[0] != 'undefined' && log[0] === "matchID_true") {
        $(".section_two").hide();
        $(".section_three").show();
        matchID = $("#matchID").val();
        $("#conCode").html("Lobby: " + matchID);
        log = [];
        correntLog = 0;
    }
    if (typeof log[0] != 'undefined' && log[0] === "matchID_false") {
        log = [];
        correntLog = 0;
    }

    if (typeof log[0] != 'undefined' && log[0].search("x") === 0 && typeof log[1] != 'undefined' && log[1].search("x") === 0) {
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
        correntLog = 0;
        enemyConnection = true;
        if (getPlayerSt === true) {
            $.connection.hub.start().done(function () {
                svHub.server.getPlayerSt();
            });
        }
    }

    if (typeof log[0] != 'undefined' && log[0].search("gpn") === 0) {
        checkEnemyReadyBtn = true;
        if (enemyConnection === true && checkEnemyReadyBtn === true && checkReadyBtn === true) {
            $(".section_four").hide();
            $(".section_five").show();
        }
        log = [];
        correntLog = 0;
    }
    if (typeof log[0] != 'undefined' && log[0] === "startGame") {
        $(".section_info").html("Du bist dran");
        $("#fieldTableEnemy").css({"border-style": "solid", "border-color": "green"});
        $(".section_myField").css({"border-style": "solid", "border-color": "red"});
        myTurn = true;
        log = [];
        correntLog = 0;
    }

    if (typeof log[0] != 'undefined' && log[0] === "turn_t") {
        $(".section_info").html("Du bist dran");
        $("#fieldTableEnemy").css({"border-style": "solid", "border-color": "green"});
        $(".section_myField").css({"border-style": "solid", "border-color": "red"});
        myTurn = true;
        log = [];
        correntLog = 0;
    }

    if(typeof log[0] != 'undefined' && log[0] === "hit"){
        console.log(markedFieldPoint);
        markedFieldPoint.addClass("burnwater");
        countDestroyedShips++;

        $(".gameInfo_myHits").html("Deine Treffer : " +countDestroyedShips+ "/25");
        log = [];
        correntLog = 0;
        if(countDestroyedShips===25) {
            $.connection.hub.start().done(function () {
                svHub.server.setWinner(matchID, userName);
                svHub.server.removeField(15);
                // $(".section_five").hide();
                // $("#winner").show();
            });
        }
    }

    if (typeof log[0] != 'undefined' && log[0] === "turn_f") {
        $(".section_info").html("Dein Gegner ist dran!");
        $("#fieldTableEnemy").css({"border-style": "solid", "border-color": "red"});
        $(".section_myField").css({"border-style": "solid", "border-color": "green"});
        myTurn = false;
        log = [];
        correntLog = 0;
    }

    if(typeof log[0] != 'undefined' && log[0] === "failed"){
        console.log(markedFieldPoint);
        markedFieldPoint.addClass("failedwater");
        log = [];
        correntLog = 0;
    }
    if(typeof log[0] != 'undefined' && log[0].search("winner")===0){
        $("#winnerMsg").html("Der Gewinner ist "+log[0].substring(6));
        $("#winner").show();
        $(".section_five").hide();
        $(".section_info").hide();
        log = [];
        correntLog = 0;
    }

    if(typeof log[0] != 'undefined'&& log[0].search("enemyHit_column")===0){
        col = log[0].substring(15);
        console.log(col+ "<--Col");
        log = [];
        correntLog = 0;
    }
    if(typeof log[0] != 'undefined'&& log[0].search("enemyHit_row")===0){
        row = log[0].substring(12);
        console.log(row+ "<--row");
        $("#fieldTableMy").children("#row"+row).children("#cell"+col).addClass("hit");
        console.log($("#fieldTableMy").children("#row"+row).children("#cell"+col).attr('class'));
        counterHit++;
        $(".gameInfo_enemyHits").html("Gegnerische Treffer: " +counterHit+ "/25");
        row = 0;
        col = 0;
        log = [];
        correntLog = 0;
    }
    if(typeof log[0] != 'undefined'&& log[0].search("enemyFailed_column")===0){
        col = log[0].substring(18);
        console.log(col+ "<--Col");
        log = [];
        correntLog = 0;
    }
    if(typeof log[0] != 'undefined'&& log[0].search("enemyFailed_row")===0){
        row = log[0].substring(15);
        console.log(row+ "<--row");
        $("#fieldTableMy").children("#row"+row).children("#cell"+col).addClass("failed");
        console.log($("#fieldTableMy").children("#row"+row).children("#cell"+col).attr('class'));
        row = 0;
        col = 0;
        log = [];
        correntLog = 0;
    }
}
































