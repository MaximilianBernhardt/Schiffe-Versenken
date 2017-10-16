var correntLog = 0;
var log = [];

$(document).ready(function () {
    generateEnemyField(15);
});

function generateEnemyField(size) {
    size++;
    // $(".section_enemyField").append("<table id='fieldTableEnemy'></table>");
    for (var i = 1; i < size; i++) {
        var row=$("<tr></tr>");
        var rowId="row"+i;
        row.attr("id",rowId);
        $("#fieldTableEnemy").append(row);

        for (var j = 1; j < size; j++) {
            var cell=$("<td></td>");
            cell.addClass("coordinate");
            var cellID="cell"+j;
            cell.attr("id",cellID);
            $(row).append(cell);
        }
    }
    this.size=size;
}

function generateMyField(size) {
    size++;
    $.connection.hub.start().done(function () {
        // $(".section_myField").append("<table id='fieldTableMy'></table>");
        for (var i = 1; i < size; i++) {
            var row = $("<tr></tr>");
            var rowId = "row" + i;
            row.attr("id", rowId);
            $("#fieldTableMy").append(row);

            for (var j = 1; j < size; j++) {
                var cell = $("<td></td>");
                cell.addClass("coordinateUntouchable");
                var cellID = "cell" + j;
                cell.attr("id", cellID);
                $(row).append(cell);


                checkFieldContent = $(".section_myField_create").children("#fieldTable").children("#row"+i).children("#cell"+j).prop("className").substring(11);
                if(checkFieldContent==="battleship"||checkFieldContent==="cruiser"||checkFieldContent==="destroyer1"||
                    checkFieldContent==="destroyer2"||checkFieldContent==="submarine1"||checkFieldContent==="submarine2"||
                    checkFieldContent==="submarine3"||checkFieldContent==="dinghy1"||checkFieldContent==="dinghy2"||
                    checkFieldContent==="dinghy3"||checkFieldContent==="dinghy4")
                {
                    cell.addClass("ship");
                }

            }
        }
    });
    this.size=size;
}
