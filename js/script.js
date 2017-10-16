$(document).ready(function () {
    $("#create").hide();
    $("#setShips").hide();

    $("#submitName").click(function () {
        $("#login").hide();
        $("#create").show();
    });
    $("#submitSize").click(function () {
        $("#create").hide();
        $("#setShips").show();
        deleteField();
        generateField($("#sizeNumber").val());
        $("#sizeNumber").val(' ');
    });
});

function generateField(size) {
    $("#setShips").append("<table id='fieldTable'></table>");
    var size = size;
    for(var i = 0; i < size; i++){
        $("#fieldTable").append("<tr id='row"+i+"'></tr>");
        for(var j = 0; j < size; j++){
            $("#row"+i).append("<td class='colomn"+j+"'><div class='fieldPoint'></div></td>");
        }
    }
}
function deleteField() {
    $("#fieldTable").remove();
}