// Fehler bei der genutzten Verwendung von 'Horizontal', 'Vertical' --> Logik überarbeiten

//globale Variablen
var shipSize;
var shipSelection = false;
var shipClass;
var row;

var battleship = 1;
var cruiser = 1;
var destroyer = 2;
var submarine = 3;
var dinghy = 4;

var isHorizontal = false;
var countSubmarine = 0;
var countDinghy = 0;
var countDestroyer = 0;
var countCruiser = 0;
var countBattleship = 0;

setDefaultCounter();

$(document).ready(function(){

        resetShipCounter();

        //Wählt die Schiffe aus, die auf den Button liegen und zählt den Counter runter
        $(".btn_battleship").mousedown(function() {btnEvents(countBattleship, 2, 5,"battleship" )});
        $(".btn_cruiser").mousedown(function() {btnEvents(countCruiser, 2, 4, "cruiser")}); 
        $(".btn_destroyer").mousedown(function() {btnEvents(countDestroyer, 3, 3, "destroyer")});
        $(".btn_submarine").mousedown(function() {btnEvents(countSubmarine, 4, 2, "submarine")});
        $(".btn_dinghy").mousedown(function() {btnEvents(countDinghy, 5, 1, "dinghy")});

    //Zeigt im html an, wie viele Schiffe von welchem Typ noch setzbar sind
    $(document).on('mouseup', '#fieldTable', function(){
        switch(shipClass){
            case "battleship": mouseupCounterEvent(countBattleship, 2, 1, shipClass); break;
            case "cruiser": mouseupCounterEvent(countCruiser, 2, 1 ,shipClass); break;
            case "destroyer1": mouseupCounterEvent(countDestroyer, 3, 1,"destroyer"); break;
            case "destroyer2": mouseupCounterEvent(countDestroyer, 3, 2,"destroyer"); break;
            case "submarine1": mouseupCounterEvent(countSubmarine, 4, 3,"submarine"); break;
            case "submarine2": mouseupCounterEvent(countSubmarine, 4, 3,"submarine"); break;
            case "submarine3": mouseupCounterEvent(countSubmarine, 4, 3,"submarine"); break;
            case "dinghy1": mouseupCounterEvent(countDinghy, 5, 4,"dinghy"); break;
            case "dinghy2": mouseupCounterEvent(countDinghy, 5, 4,"dinghy"); break;
            case "dinghy3": mouseupCounterEvent(countDinghy, 5, 4,"dinghy"); break;
            case "dinghy4": mouseupCounterEvent(countDinghy, 5, 4,"dinghy"); break;
        }
    });

    //Setzt alle Schiffe und Counter zurück
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
        setDefaultCounter();
        resetShipCounter();
    });
    
    //Bestätigen-Button
    $(".section_three").mouseup(function() { shipSelection = false; });

    //
    $(".ship_selection").mouseleave(function() {
        if (shipSelection === true) {
            $(".fieldPoint").removeClass(shipClass);
        }
    });
    //Wählt die einzelnen Schiffe auf dem Spielfeld an, speichert sie spezifischen Eigenschaften
    shipEvents('mousedown','.battleship', 5);
    shipEvents('mousedown','.cruiser', 4);
    shipEvents('mousedown','.destroyer1', 3);
    shipEvents('mousedown','.destroyer2', 3);
    shipEvents('mousedown','.submarine1', 2);
    shipEvents('mousedown','.submarine2', 2);
    shipEvents('mousedown','.submarine3', 2);
    shipEvents('mousedown','.dinghy1', 1);
    shipEvents('mousedown','.dinghy2', 1);
    shipEvents('mousedown','.dinghy3', 1);
    shipEvents('mousedown','.dinghy4', 1);

    //Spechert die Werte des aktuellen Schiffes in Variablen ab
    shipEvents('click','.battleship', 5);
    shipEvents('click','.cruiser', 4);
    shipEvents('click','.destroyer1', 3);
    shipEvents('click','.destroyer2', 3);
    shipEvents('click','.submarine1', 2);
    shipEvents('click','.submarine2', 2);
    shipEvents('click','.submarine3', 2);
    shipEvents('click','.dinghy1', 1);
    shipEvents('click','.dinghy2', 1);
    shipEvents('click','.dinghy3', 1);
    shipEvents('click','.dinghy4', 1);

    //TEST

    //Diese Funktion legt private Variablen an, die zum drehen gebraucht werden und ruft die Funktion zum drehen auf
    $(document).on('click', '.fieldPoint', function() {
        // ignorieren -->(Variablen müssen eventuell 'global'. Probiere funktionalität mit "updateShipsClick()")
        var cellName = $(this).prop('id');
        var cellNb = parseInt(cellName.substring(4, 6));
        var rowName = $(this).parent().prop('id');
        var rowNb = parseInt(rowName.substring(3, 5));
        var shipEnd = null;
        var shipCellsToSet = [];
        var counterShipCellsToSet = 0;
        var cell = [];
        var shipCells = [];

        $(".fieldPoint").removeClass(shipClass);

        updateShipsClick(isHorizontalShip, cellNb, rowNb); //Auf isHorizontalShip achten & implementieren

    });
        
    //Diese Funktion legt private Variablen an, die zum setzen gebraucht werden und ruft die Funktion zum setzen auf
    $(document).on('mouseenter', '.fieldPoint', function() {
        var cellName = $(this).prop('id');
        var cellNb = parseInt(cellName.substring(4, 6));
        row = $(this).parent();

        var rowName = $(this).parent().prop('id');
        var rowNb = parseInt(rowName.substring(3, 5));

        updateShipsMouseenter(cellName, cellNb, row, rowNb); //Übergebene Werte anpassen
    });


    //ENDE:TEST

});

function btnEvents(counterName, counterNb, thisShipSize, thisShipClass){
    counterName++;
    if(counterName < counterNb){
        shipSelection = true;
        shipSize = thisShipSize;
        if(thisShipClass==="battleship"||thisShipClass==="cruiser"){
            shipClass = thisShipClass;
        }else{
            shipClass = thisShipClass + counterName;
        }
    }
}

function mouseupCounterEvent(counterName, counterNb, nbHtml, classOfShip){
    if (counterName < counterNb){$("."+classOfShip+"Counter").html(nbHtml - counterName + "x")}
}

function setDefaultCounter() {
    isHorizontal = false;
    countSubmarine = 0;
    countDinghy = 0;
    countDestroyer = 0;
    countCruiser = 0;
    countBattleship = 0;
}

function resetShipCounter() {
    $(".battleshipCounter").html(2 - countBattleship - 1 + "x");
    $(".cruiserCounter").html(2 - countCruiser - 1 + "x");
    $(".destroyerCounter").html(3 - countDestroyer - 1 + "x");
    $(".submarineCounter").html(4 - countSubmarine - 1 + "x");
    $(".dinghyCounter").html(5 - countDinghy - 1 + "x");
}

function shipColissionHorizontal(cellNb, shipEnd, row, shipClass) {
    var countReturn = 0;
    for (var h = cellNb; h < shipEnd; h++) {

        if (h > 15) { h = 15; }

        var thisCell = row.children("cell" + h);
        var allOfClass = thisCell.prop('className').split(" ");

        if(allOfClass.length===2){
            var ifShip = allOfClass[1];
         }else{
             var ifShip = allOfClass[0];
         }

        // var ifShip = row.children("#cell" + h).prop('className').substring(11);
        console.log(ifShip);
        if (ifShip !== shipClass && ifShip === "battleship" || ifShip !== shipClass && ifShip === "cruiser" || ifShip !==
            shipClass && ifShip === "destroyer1" || ifShip !== shipClass && ifShip === "destroyer2" || ifShip !==
            shipClass && ifShip === "submarine1" || ifShip !== shipClass && ifShip === "submarine2" || ifShip !==
            shipClass && ifShip === "submarine3" || ifShip !== shipClass && ifShip === "dinghy1" || ifShip !== shipClass &&
            ifShip === "dinghy2" || ifShip !== shipClass && ifShip === "dinghy3" || ifShip !== shipClass && ifShip ===
            "dinghy4") {
            console.log("Du bist auf Kollisionskurs mit einem Schiff");
            return false;
        } else {
            countReturn++;
            if (countReturn === shipEnd - cellNb) { return true; }

        }
    }
}

function shipColissionVertical(fromRow, toRow, thisCellNb, shipClass, row) {
    var countReturn = 0;
    for (var h = fromRow; h < toRow; h++) {

        if (h > 15) { h = 15; }

        //  var table= row.parent();
        //  var thisRow = table.children("#row"+h);
        //  var thisCell = thisRow.children("#cell"+thisCellNb);
        //  var allOfClass= thisCell.prop('className').split(" ");

        var allOfClass = row.parent().children("#row" + h).children("#cell" + thisCellNb).prop('className').split(" ");

        console.log(allOfClass);
        console.log(allOfClass.length);
        if(allOfClass[1]===undefined){console.log("Wie kann ich 'undefined' sein? Wenn diese Stelle vorhanden ist, ist sie auch belegt... Theoretisch");}
         if(allOfClass.length>1){
            var ifShip = allOfClass[1];

         }else{
             var ifShip = allOfClass[0];
         }

        console.log(ifShip);

        if (ifShip !== shipClass && ifShip === "battleship" || ifShip !== shipClass && ifShip === "cruiser" || ifShip !==
            shipClass && ifShip === "destroyer1" || ifShip !== shipClass && ifShip === "destroyer2" || ifShip !==
            shipClass && ifShip === "submarine1" || ifShip !== shipClass && ifShip === "submarine2" || ifShip !==
            shipClass && ifShip === "submarine3" || ifShip !== shipClass && ifShip === "dinghy1" || ifShip !== shipClass &&
            ifShip === "dinghy2" || ifShip !== shipClass && ifShip === "dinghy3" || ifShip !== shipClass && ifShip ===
            "dinghy4") {
            console.log("Du bist auf Kollisionskurs mit einem Schiff");
            return false;
        } else {
            countReturn++;
            if (countReturn === toRow - fromRow) { return true; }

        }
    }
}

// function shipEvents(evt, shipClass, shipSize) {
//     $(document).on(evt,shipClass,function () {
//         if(evt !== 'click'){
//             shipSelection = true;
//         }
//         this.shipSize = shipSize;
//         this.shipClass = shipClass;
//     });
// }

function shipEvents(evt, shipClass, shipSize) {
    $(document).on(evt,shipClass,function () {
        if(evt === 'mousedown'){
            shipSelection = true;
        }
        this.shipSize = shipSize;
        this.shipClass = shipClass;
    });
}

// Schiff soll gedreht werden und Positin behalten
function updateShipsClick(isHorizontal, cellNb, rowNb){ //isHorizontal mit Variable für jeweiliges Schiff angeben
    if (isHorizontal) {
        shipEnd = cellNb + shipSize;

        setShipHorizontal(cellNb, shipEnd, rowNb, shipClass);

        isHorizontal = false;
    } else {

        shipEnd = rowNb + shipSize;

        setShipVertical(rowNb);

        isHorizontal = true;
    }    
}

// Schiff soll NICHT gedreht werden, aber verschoben werden
function updateShipsMouseenter(cellName, cellNb, row, rowNb){
    if (isHorizontal===false) {
        if (shipSelection === true) {
           
            var shipEnd = cellNb + shipSize;

            setShipHorizontal(cellNb, shipEnd, row, shipClass);
        }
        isHorizontal=true;
    } else {
        if (shipSelection === true) { //gesamte If Abfrage ändern bzw. einheitlich gestalten
            var shipEnd = null;
            var shipCells = [];
            var shipCellsToSet = [];
            var counterShipCellsToSet = 0;
            var cell = [];

            var rowId= row.prop('id');
            var rowNb = parseInt(rowId.substring(3, 5));

            shipEnd = rowNb + shipSize;

            setShipVertical(rowNb, shipEnd, cellNb, shipClass, row);

            isHorizontal = false;
            
        }
    }

}

function setShipVertical(rowNb, shipEnd, cellNb, shipClass, row){//Sind an den Stellen wo die Funktion aufgerufen wird die Variabeln definiert?
       
    if(shipColissionVertical(rowNb,shipEnd,cellNb ,shipClass, row) == true){
        $(".fieldPoint").removeClass(shipClass);

        if(shipEnd < 17){
            for (var i = cellNb; i < shipEnd; i++){
                row.parent().children("#row"+i).children("#cell"+cellNb).addClass(shipClass);
            }
        }else{
            for (var i = cellNb; i > cellNb - shipSize; i--){
                row.parent().children("#row"+i).children("#cell"+cellNb).addClass(shipClass);
            }
        }
    }
}

function setShipHorizontal(cellNb, shipEnd, row, shipClass){//Sind an den Stellen wo die Funktion aufgerufen wird die Variabeln definiert?

    if (shipColissionHorizontal(cellNb, shipEnd, row, shipClass) === true) {
        $(".fieldPoint").removeClass(shipClass);

        if (shipEnd <= 16) {
            for (var i = cellNb; i < shipEnd; i++) {
                row.children("#cell" + i).addClass(shipClass);
            }
        } else if (shipEnd > 16) {
            for (var i = cellNb; i > cellNb - shipSize; i--) {
                row.children("#cell" + i).addClass(shipClass);
            }
        }
    }
}