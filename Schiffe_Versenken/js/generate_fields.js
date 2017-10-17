function generateEnemyField(size) {
    var row;
    var rowID;
    var cell;
    var cellID;
    size++;

    for (var i = 1; i < size; i++) {
        row=$("<tr></tr>");
        rowID="row"+i;
        row.attr("id",rowID);
        $("#fieldTableEnemy").append(row);

        for (var j = 1; j < size; j++) {
            cell=$("<td></td>");
            cell.addClass("coordinate");
            cellID="cell"+j;
            cell.attr("id",cellID);
            $(row).append(cell);
        }
    }
    this.size=size;
}

function generateMyField(size) {
    var row;
    var rowID;
    var cell;
    var cellID;
    size++;

    $.connection.hub.start().done(function () {
        for (var i = 1; i < size; i++) {
            row = $("<tr></tr>");
            rowID = "row" + i;
            row.attr("id", rowID);
            $("#fieldTableMy").append(row);

            for (var j = 1; j < size; j++) {
                cell = $("<td></td>");
                cell.addClass("coordinateUntouchable");
                cellID = "cell" + j;
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

function generateField(size) {
    var row;
    var rowID;
    var cell;
    var cellID;
    size++;

    $(".section_myField, .section_myField_create").append("<table id='fieldTable'></table>");
    for (var i = 1; i < size; i++) {
        row=$("<tr></tr>");
        //row.addClass("");
        rowID="row"+i;
        row.attr("id",rowID);
        $("#fieldTable").append(row);

        for (var j = 1; j < size; j++) {
            cell=$("<td></td>");
            cell.addClass("fieldPoint");
            cellID="cell"+j;
            cell.attr("id",cellID);
            $(row).append(cell);
        }
    }
    this.size=size;
}

function deleteField() {
    $("#fieldTable").remove();
}