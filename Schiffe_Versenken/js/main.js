$(document).ready(function () {


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

    SVHUB.client.receive = function (message) {
        log[currentLogNumber] = message;
        currentLogNumber++;
        controlMsg();
    };

    $.connection.hub.start().done(function () {
        $("#submitName").click(function () {
            userName = $("#userName").val();
            SVHUB.server.login(userName);
        });
        $("#userName").keydown(function (e) {
            if (e.which === 13) {
                userName = $("#userName").val();
                SVHUB.server.login(userName);
            }
        });
        $("#nextPage").click(function () {
            //deleteField();
            generateField($("#fieldSize").val());
            fieldSet = true;
            SVHUB.server.createField(size, playerID);
            $(".section_myField_create").show();
            if($("#matchID").val()===""){
                SVHUB.server.createGame($("#difficulty").val(), playerID, size);
                $(".section_two").hide();
                $(".section_three").show();
                $("#playerName").html(userName + ", setzte deine Schiffe!");
            } else{
                SVHUB.server.getGame(parseInt($("#matchID").val()), playerID, $("#difficulty").val(), size);
                SVHUB.server.getPlayerNameFromMatch(parseInt($("#matchID").val()));
            }
        });
        $("#btn_startgame").click(function () {
            var shipCounter = 0;
            generateEnemyField(15);
            generateMyField(15);
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
                        SVHUB.server.setFieldValues(playerID, "c"+j, i);
                    }else{
                        shipSettings[i].push("none");
                    }
                }
            }
            if(shipCounter===25){
                $(".section_three").hide();
                $(".section_four").show();
                $("#playerName").html("Habe Ausschau nach Gegnern Matrose!");
                $("#gameInfo").html("Einladungs-Code: "+matchID);
                checkReadyBtn = true;
                playerStarted = true;
                SVHUB.server.playerStarted();
            }else{
                $("#errorShips").html("Setze alle Schiffe");
            }
            if(enemyConnection === true && checkEnemyReadyBtn === true && checkReadyBtn === true) {
                $(".section_four").hide();
                $(".section_five").show();
                $(".section_info").html("Dein Gegner ist dran!");
                $(".coordinate").css({"background-color": "rgba(19, 119, 145, 0.5)"});
                $("#fieldTableEnemy").css({"border-style": "solid", "border-color": "red"});
                $(".section_myField").css({"border-style": "solid", "border-color": "green"});
                SVHUB.server.startGame();
            }
        });

        $(document).on('click','.coordinate',function () {
            var cellNb;
            var rowNb;
            if(myTurn===true){
                markedFieldPoint = $(this);
                console.log(markedFieldPoint);
                cellNb =$(this).prop("id").substring(4, 6);
                rowNb = parseInt($(this).parent().prop("id").substring(3, 5));
                SVHUB.server.changeFieldValues(enemyName,cellNb,rowNb);
            }
        });
    });
});
