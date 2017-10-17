var shipSize;
var shipSelection = false;
var shipClass;
var tmpShipClass;
var row;

var thisIsTurned = [false, false, false, false, false, false, false, false, false, false, false];
var isTurned = false;

var countBattleship = 0;
var countCruiser = 0;
var countDestroyer = 0;
var countSubmarine = 0;
var countDinghy = 0;

$(document).ready(function() {

    resetShipCounter();

    $(".btn_battleship").mousedown(function() {
        if (countBattleship < 1) {
            shipSelection = true;
            shipSize = 5;
            shipClass = "battleship";
            tmpShipClass = "battleship";
            isTurned = false;
        }
    });
    $(".btn_cruiser").mousedown(function() {
        if (countCruiser < 1) {
            shipSelection = true;
            shipSize = 4;
            shipClass = "cruiser";
            tmpShipClass = "cruiser";
            isTurned = false;
        }
    });
    $(".btn_destroyer").mousedown(function() {
        if (countDestroyer < 2) {
            shipSelection = true;
            shipSize = 3;
            shipClass = "destroyer" + (countDestroyer+1);
            tmpShipClass = "destroyer" + (countDestroyer+1);
            isTurned = false;
        }
    });
    $(".btn_submarine").mousedown(function() {
        if (countSubmarine < 3) {
            shipSelection = true;
            shipSize = 2;
            shipClass = "submarine" + (countSubmarine+1);
            tmpShipClass = "submarine" + (countSubmarine+1);
            isTurned = false;
        }
    });
    $(".btn_dinghy").mousedown(function() {
        if (countDinghy < 4) {
            shipSelection = true;
            shipSize = 1;
            shipClass = "dinghy" + (countDinghy+1);
            tmpShipClass = "dinghy" + (countDinghy+1);
            isTurned = false;
        }
    });

    $(document).on('mouseup', '#fieldTable', function() {
            switch (tmpShipClass) {
                case "battleship":
                    if (countBattleship < 1) {
                        if(setCountShip("battleship") === true) {
                            countBattleship++;
                            $(".battleshipCounter").html(1 - countBattleship + "x");
                            tmpShipClass = "";
                        }
                    }
                    break;
                case "cruiser":
                    if (countCruiser < 1) {
                        if(setCountShip("cruiser") === true) {
                            countCruiser++;
                            $(".cruiserCounter").html(1 - countCruiser + "x");
                            tmpShipClass = "";
                        }
                    }
                    break;
                case "destroyer1":
                    if (countDestroyer < 2) {
                        if(setCountShip("destroyer1") === true) {
                            countDestroyer++;
                            $(".destroyerCounter").html(2 - countDestroyer + "x");
                            tmpShipClass = "";
                        }
                    }
                    break;
                case "destroyer2":
                    if (countDestroyer < 2) {
                        if(setCountShip("destroyer2") === true) {
                            countDestroyer++;
                            $(".destroyerCounter").html(2 - countDestroyer + "x");
                            tmpShipClass = "";
                        }
                    }
                    break;
                case "submarine1":
                    if (countSubmarine < 3) {
                        if(setCountShip("submarine1") === true) {
                            countSubmarine++;
                            $(".submarineCounter").html(3 - countSubmarine + "x");
                            tmpShipClass = "";
                        }
                    }
                    break;
                case "submarine2":
                    if (countSubmarine < 3) {
                        if(setCountShip(("submarine2")) === true) {
                            countSubmarine++;
                            $(".submarineCounter").html(3 - countSubmarine + "x");
                            tmpShipClass = "";
                        }
                    }
                    break;
                case "submarine3":
                    if (countSubmarine < 3) {
                        if(setCountShip("submarine3") === true) {
                            countSubmarine++;
                            $(".submarineCounter").html(3 - countSubmarine + "x");
                            tmpShipClass="";
                        }
                    }
                    break;
                case "dinghy1":
                    if (countDinghy < 4) {
                        if(setCountShip("dinghy1") === true) {
                            countDinghy++;
                            $(".dinghyCounter").html(4 - countDinghy + "x");
                            tmpShipClass="";
                        }
                    }
                    break;
                case "dinghy2":
                    if (countDinghy < 4) {
                        if(setCountShip("dinghy2") === true) {
                            countDinghy++;
                            $(".dinghyCounter").html(4 - countDinghy + "x");
                            tmpShipClass = "";
                        }
                    }
                    break;
                case "dinghy3":
                    if (countDinghy < 4) {
                        if(setCountShip("dinghy3") === true) {
                            countDinghy++;
                            $(".dinghyCounter").html(4 - countDinghy + "x");
                            tmpShipClass = "";
                        }
                    }
                    break;
                case "dinghy4":
                    if (countDinghy < 4) {
                        if(setCountShip("dinghy4") === true) {
                            countDinghy++;
                            $(".dinghyCounter").html(4 - countDinghy + "x");
                            tmpShipClass = "";
                        }
                    }
                    break;
            }
    });

    $(".section_three").mouseup(function() {
        shipSelection = false;
    });

    $("#btn_back").click(function() {
        $(".fieldPoint").removeClass("battleship");
        $(".fieldPoint").removeClass("cruiser");
        $(".fieldPoint").removeClass("destroyer1");
        $(".fieldPoint").removeClass("destroyer2");
        $(".fieldPoint").removeClass("submarine1");
        $(".fieldPoint").removeClass("submarine2");
        $(".fieldPoint").removeClass("submarine3");
        $(".fieldPoint").removeClass("dinghy1");
        $(".fieldPoint").removeClass("dinghy2");
        $(".fieldPoint").removeClass("dinghy3");
        $(".fieldPoint").removeClass("dinghy4");
        isTurned = false;
        countSubmarine = 0;
        countDinghy = 0;
        countDestroyer = 0;
        countCruiser = 0;
        countBattleship = 0;
        resetShipCounter();
    });

    $(".ship_selection").mouseleave(function() {
        if (shipSelection === true) {
            $(".fieldPoint").removeClass(shipClass);

        }
    });

    $(document).on('mousedown', '.battleship', function() {
        shipSelection = true;
        shipSize = 5;
        shipClass = "battleship";
        isTurned = thisIsTurned[0];
    });
    $(document).on('mousedown', '.cruiser', function() {
        shipSelection = true;
        shipSize = 4;
        shipClass = "cruiser";
        isTurned = thisIsTurned[1];
    });
    $(document).on('mousedown', '.destroyer1', function() {
        shipSelection = true;
        shipSize = 3;
        shipClass = "destroyer1";
        isTurned = thisIsTurned[2];
    });
    $(document).on('mousedown', '.destroyer2', function() {
        shipSelection = true;
        shipSize = 3;
        shipClass = "destroyer2";
        isTurned = thisIsTurned[3];
    });
    $(document).on('mousedown', '.submarine1', function() {
        shipSelection = true;
        shipSize = 2;
        shipClass = "submarine1";
        isTurned = thisIsTurned[4];
    });
    $(document).on('mousedown', '.submarine2', function() {
        shipSelection = true;
        shipSize = 2;
        shipClass = "submarine2";
        isTurned = thisIsTurned[5];
    });
    $(document).on('mousedown', '.submarine3', function() {
        shipSelection = true;
        shipSize = 2;
        shipClass = "submarine3";
        isTurned = thisIsTurned[6];
    });
    $(document).on('mousedown', '.dinghy1', function() {
        shipSelection = true;
        shipSize = 1;
        shipClass = "dinghy1";
        isTurned = thisIsTurned[7];
    });
    $(document).on('mousedown', '.dinghy2', function() {
        shipSelection = true;
        shipSize = 1;
        shipClass = "dinghy2";
        isTurned = thisIsTurned[8];
    });

    $(document).on('mousedown', '.dinghy3', function() {
        shipSelection = true;
        shipSize = 1;
        shipClass = "dinghy3";
        isTurned = thisIsTurned[9];
    });
    $(document).on('mousedown', '.dinghy4', function() {
        shipSelection = true;
        shipSize = 1;
        shipClass = "dinghy4";
        isTurned = thisIsTurned[10];
    });


    $(document).on('click', '.battleship', function() {
        if(thisIsTurned[0] === false){
            thisIsTurned[0] = true;
        }else{
            thisIsTurned[0] = false;
        }
        isTurned = thisIsTurned[0];
        shipSize = 5;
        shipClass = "battleship";
        setShipHorizontal($(this), 0);
    });
    $(document).on('click', '.cruiser', function() {
        if(thisIsTurned[1] === false){
            thisIsTurned[1] = true;
        }else{
            thisIsTurned[1] = false;
        }
        isTurned = thisIsTurned[1];
        shipSize = 4;
        shipClass = "cruiser";
        setShipHorizontal($(this),1);
    });
    $(document).on('click', '.destroyer1', function() {
        if(thisIsTurned[2] === false){
            thisIsTurned[2] = true;
        }else{
            thisIsTurned[2] = false;
        }
        isTurned = thisIsTurned[2];
        shipSize = 3;
        shipClass = "destroyer1";
        setShipHorizontal($(this),2);
    });
    $(document).on('click', '.destroyer2', function() {
        if(thisIsTurned[3] === false){
            thisIsTurned[3] = true;
        }else{
            thisIsTurned[3] = false;
        }
        isTurned = thisIsTurned[3];
        shipSize = 3;
        shipClass = "destroyer2";
        setShipHorizontal($(this),3);
    });
    $(document).on('click', '.submarine1', function() {
        if(thisIsTurned[4] === false){
            thisIsTurned[4] = true;
        }else{
            thisIsTurned[4] = false;
        }
        isTurned = thisIsTurned[4];
        shipSize = 2;
        shipClass = "submarine1";
        setShipHorizontal($(this),4);
    });
    $(document).on('click', '.submarine2', function() {
        if(thisIsTurned[5] === false){
            thisIsTurned[5] = true;
        }else{
            thisIsTurned[5] = false;
        }
        isTurned = thisIsTurned[5];
        shipSize = 2;
        shipClass = "submarine2";
        setShipHorizontal($(this),5);
    });
    $(document).on('click', '.submarine3', function() {
        if(thisIsTurned[6] === false){
            thisIsTurned[6] = true;
        }else{
            thisIsTurned[6] = false;
        }
        isTurned = thisIsTurned[6];
        shipSize = 2;
        shipClass = "submarine3";
        setShipHorizontal($(this),6);
    });
    $(document).on('click', '.dinghy1', function() {
        if(thisIsTurned[7] === false){
            thisIsTurned[7] = true;
        }else{
            thisIsTurned[7] = false;
        }
        isTurned = thisIsTurned[7];
        shipSize = 1;
        shipClass = "dinghy1";
        setShipHorizontal($(this),7);
    });
    $(document).on('click', '.dinghy2', function() {
        if(thisIsTurned[8] === false){
            thisIsTurned[8] = true;
        }else{
            thisIsTurned[8] = false;
        }
        isTurned = thisIsTurned[8];
        shipSize = 1;
        shipClass = "dinghy2";
        setShipHorizontal($(this),8);
    });
    $(document).on('click', '.dinghy3', function() {
        if(thisIsTurned[9] === false){
            thisIsTurned[9] = true;
        }else{
            thisIsTurned[9] = false;
        }
        isTurned = thisIsTurned[9];
        shipSize = 1;
        shipClass = "dinghy3";
        setShipHorizontal($(this),9);
    });
    $(document).on('click', '.dinghy4', function() {
        if(thisIsTurned[10] === false){
            thisIsTurned[10] = true;
        }else{
            thisIsTurned[10] = false;
        }
        isTurned = thisIsTurned[10];
        shipSize = 1;
        shipClass = "dinghy4";
        setShipHorizontal($(this),10);
    });

    $(document).on('mouseenter', '.fieldPoint', function() {
        setShipVertical($(this))
    });
});

/**
 * Setzt die Zähler-Anzeige der noch übrigen, zu setzenden Schiffe zurück
 */
function resetShipCounter() {
    $(".battleshipCounter").html(1 - countBattleship + "x");
    $(".cruiserCounter").html(1 - countCruiser + "x");
    $(".destroyerCounter").html(2 - countDestroyer + "x");
    $(".submarineCounter").html(3 - countSubmarine + "x");
    $(".dinghyCounter").html(4 - countDinghy  + "x");
}

/**
 * Dreht das Schiff horizontal
 * 
 * @param {*} tmp 
 * @param {int} i 
 */
function setShipHorizontal(tmp, i) {

    var cellName = tmp.prop('id');
    var cellNb = parseInt(cellName.substring(4, 6));
    var rowName = tmp.parent().prop('id');
    var rowNb = parseInt(rowName.substring(3, 5));
    var shipEnd = null;
    var shipCellsToSet = [];
    var counterShipCellsToSet = 0;
    var cell = [];
    var shipCells = [];

    row = tmp.parent();
    shipEnd = cellNb + shipSize;

    if (isTurned===false) {
            if (shipEnd < 17) {
                if(shipCollisionHorizontal(cellNb, shipEnd, row, shipClass) === true) {
                    $(".fieldPoint").removeClass(shipClass);
                    thisIsTurned[i] = false;
                    for (var i = cellNb; i < shipEnd; i++) {
                        shipCells.push([rowNb, i]);
                    }
                }else{
                    thisIsTurned[i] = true;
                }
            }
            if (shipEnd >= 17) {
                if(shipCollisionHorizontalNegative(cellNb, shipEnd, row, shipClass) === true) {
                    $(".fieldPoint").removeClass(shipClass);
                    thisIsTurned[i] = false;
                    for (var i = cellNb; i > cellNb - shipSize; i--) {
                        shipCells.push([rowNb, i]);
                    }
                }else{
                    thisIsTurned[i] = true;
                }
            }
    } else {
        shipEnd = rowNb + shipSize;
            if (shipEnd < 17) {
                if(shipCollisionVertical(rowNb, shipEnd, cellNb, shipClass, row) === true) {
                    $(".fieldPoint").removeClass(shipClass);
                    thisIsTurned[i] = true;
                    for (var i = rowNb; i < shipEnd; i++) {
                        shipCells.push([i, cellNb]);
                    }
                }else{
                    thisIsTurned[i] = false;
                }
            }
            if (shipEnd >= 17) {
                if(shipCollisionVerticalNegative(rowNb, shipEnd, cellNb, shipClass, row) === true) {
                    $(".fieldPoint").removeClass(shipClass);
                    thisIsTurned[i] = true;
                    for (var i = rowNb; i > rowNb - shipSize; i--) {
                        shipCells.push([i, cellNb]);
                    }
                }else{
                    thisIsTurned[i] = false;
                }
            }
        }

    $.each(shipCells, function(index, value) {

        var parentRow = $("#row" + value[0]);
        var cell = $(parentRow).children("#cell" + value[1]);
        shipCellsToSet[0] = value[0];
        thisCellNb = value[1];
        $(cell).addClass(shipClass);
    });
    isTurned = thisIsTurned[i];
}

/**
 * Dreht das Schiff vertical
 * 
 * @param {*} tmp 
 * @param {int} i 
 */
function setShipVertical(tmp, i){
    var cellName = tmp.prop('id');
    var cellNb = parseInt(cellName.substring(4, 6));
    row = tmp.parent();
    var rowName = tmp.parent().prop('id');
    var rowNb = parseInt(rowName.substring(3, 5));
    var shipEnd = 0;
    var shipCells = [];
    var shipCellsToSet = [];
    var counterShipCellsToSet = 0;
    var cell = [];
    var checkCase;
    if (isTurned === false) {
        if (shipSelection === true) {
            shipEnd = cellNb + shipSize;
            if (shipEnd <= 16) {
                if (shipCollisionHorizontal(cellNb, shipEnd, row, shipClass) === true) {
                    $(".fieldPoint").removeClass(shipClass);
                    for (var i = cellNb; i < shipEnd; i++) {
                        //row = $(this).parent();
                        row.children("#cell" + i).addClass(shipClass);
                    }
                }
            }
            if (shipEnd > 16) {
                if (shipCollisionHorizontalNegative(cellNb, shipEnd, row, shipClass) === true) {
                    $(".fieldPoint").removeClass(shipClass);
                    for (var i = cellNb; i > cellNb - shipSize; i--) {
                        // row = $(this).parent();
                        row.children("#cell" + i).addClass(shipClass);
                    }
                }
            }

        }

    } else {
        if (shipSelection === true) {
            shipEnd = rowNb + shipSize;
            if (shipEnd < 17) {
                checkCase = true;
                for (var i = rowNb; i < shipEnd; i++) {
                    shipCells.push([i, cellNb]);
                }
            }
            if (shipEnd >= 17) {
                checkCase = false;
                for (var i = rowNb; i > rowNb - shipSize; i--) {
                    shipCells.push([i, cellNb]);
                }
            }
            $.each(shipCells, function (index, value) {
                var parentRow = $("#row" + value[0]);
                cell[counterShipCellsToSet] = $(parentRow).children("#cell" + value[1]);
                thisCellNb = value[1];
                shipCellsToSet[counterShipCellsToSet] = value[0];
                counterShipCellsToSet = counterShipCellsToSet + 1;

                console.log(shipCellsToSet);
            });
            if (checkCase === true) {
                if (shipCollisionVertical(shipCellsToSet[0], shipEnd, thisCellNb, shipClass, row) === true) {
                    $(".fieldPoint").removeClass(shipClass);

                    for (var j = 0; j < counterShipCellsToSet; j++) {
                        $(cell[j]).addClass(shipClass);
                    }
                }
            }else{
                if (shipCollisionVerticalNegative(shipCellsToSet[0], shipEnd, thisCellNb, shipClass, row) === true){
                    $(".fieldPoint").removeClass(shipClass);

                    for (var j = 0; j < counterShipCellsToSet; j++) {
                        $(cell[j]).addClass(shipClass);
                    }
                }
            }
        }
    }
}

/**
 * Kontrolliert, ob das Schiff auf das Feld gesetzt wurde 
 * 
 * @param {String} ship 
 */
function setCountShip(ship) {
    var checkFieldContent;
    var counter = 0;
    for(var i = 1; i <= 15; i++){
        for(var j = 1; j <= 15; j++){
            checkFieldContent = $(".section_myField_create").children("#fieldTable").children("#row"+i).children("#cell"+j).prop("className").substring(11);
            if(checkFieldContent === ship){
                counter++;
            }
        }
    }
    if(counter === shipSize){
        return true;
    } else{
        return false;
    }

}
