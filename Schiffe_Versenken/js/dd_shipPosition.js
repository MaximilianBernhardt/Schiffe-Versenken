// $(document).ready(function () {
//
//     $(".btn_battleship").mousedown(function() {
//         if (countBattleship < 1) {
//             countBattleship++;
//             shipSelection = true;
//             shipSize = 5;
//             shipClass = "battleship";
//         }
//     });
//
//     $(".btn_cruiser").mousedown(function() {
//         if (countCruiser < 1) {
//             countCruiser++;
//             shipSelection = true;
//             shipSize = 4;
//             shipClass = "cruiser";
//         }
//     });
//
//     $(".btn_destroyer").mousedown(function() {
//         if (countDestroyer < 2) {
//             countDestroyer++;
//             shipSelection = true;
//             shipSize = 3;
//             shipClass = "destroyer" + countDestroyer;
//             console.log(shipClass);
//         }
//     });
//
//     $(".btn_submarine").mousedown(function() {
//         if (countSubmarine < 3) {
//             countSubmarine++;
//             shipSelection = true;
//             shipSize = 2;
//             shipClass = "submarine" + countSubmarine;
//         }
//     });
//
//     $(".btn_dinghy").mousedown(function() {
//         if (countDinghy < 4) {
//             countDinghy++;
//             shipSelection = true;
//             shipSize = 1;
//             shipClass = "dinghy" + countDinghy;
//         }
//     });
//
//     $(document).on('mouseup', '#fieldPoint', function() {
//         switch (shipClass) {
//             case "battleship":
//                 if (countBattleship < 1) { $(".battleshipCounter").html(1 - countBattleship + "x") }
//                 break;
//             case "cruiser":
//                 if (countCruiser < 1) { $(".cruiserCounter").html(1 - countCruiser + "x") }
//                 break;
//             case "destroyer1":
//                 if (countDestroyer < 2) { $(".destroyerCounter").html(2 - countDestroyer + "x") }
//                 break;
//             case "destroyer2":
//                 if (countDestroyer < 2) { $(".destroyerCounter").html(2 - countDestroyer + "x") }
//                 break;
//             case "submarine1":
//                 if (countSubmarine < 3) { $(".submarineCounter").html(3 - countSubmarine + "x") }
//                 break;
//             case "submarine2":
//                 if (countSubmarine < 3) { $(".submarineCounter").html(3 - countSubmarine + "x") }
//                 break;
//             case "submarine3":
//                 if (countSubmarine < 3) { $(".submarineCounter").html(3 - countSubmarine + "x") }
//                 break;
//             case "dinghy1":
//                 if (countDinghy < 4) { $(".dinghyCounter").html(4 - countDinghy + "x") }
//                 break;
//             case "dinghy2":
//                 if (countDinghy < 4) { $(".dinghyCounter").html(4 - countDinghy + "x") }
//                 break;
//             case "dinghy3":
//                 if (countDinghy < 4) { $(".dinghyCounter").html(4 - countDinghy + "x") }
//                 break;
//             case "dinghy4":
//                 if (countDinghy < 4) { $(".dinghyCounter").html(4 - countDinghy + "x") }
//                 break;
//         }
//     });
//
//     $(".section_three").mouseup(function() {
//         shipSelection = false;
//     });
//
//     // $(".ship_selection").mouseleave(function() {
//     //     if (shipSelection === true) {
//     //         $(".fieldPoint").removeClass(shipClass);
//     //
//     //     }
//     // });
//
//
//
// });
//
// function resetShipCounter() {
//     $(".battleshipCounter").html(2 - countBattleship - 1 + "x");
//     $(".cruiserCounter").html(2 - countCruiser - 1 + "x");
//     $(".destroyerCounter").html(3 - countDestroyer - 1 + "x");
//     $(".submarineCounter").html(4 - countSubmarine - 1 + "x");
//     $(".dinghyCounter").html(5 - countDinghy - 1 + "x");
// }