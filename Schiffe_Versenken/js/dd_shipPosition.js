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
			shipClass = "destroyer" + (countDestroyer + 1);
			tmpShipClass = "destroyer" + (countDestroyer + 1);
			isTurned = false;
		}
	});
	$(".btn_submarine").mousedown(function() {
		if (countSubmarine < 3) {
			shipSelection = true;
			shipSize = 2;
			shipClass = "submarine" + (countSubmarine + 1);
			tmpShipClass = "submarine" + (countSubmarine + 1);
			isTurned = false;
		}
	});
	$(".btn_dinghy").mousedown(function() {
		if (countDinghy < 4) {
			shipSelection = true;
			shipSize = 1;
			shipClass = "dinghy" + (countDinghy + 1);
			tmpShipClass = "dinghy" + (countDinghy + 1);
			isTurned = false;
		}
	});

	$(document).on('mouseup', '#fieldTable', function() {
		switch (tmpShipClass) {
			case "battleship":
				if (countBattleship < 1) {
					if (setCountShip("battleship") === true) {
						countBattleship++;
						$(".battleshipCounter").html(1 - countBattleship + "x");
						tmpShipClass = "";
					}
				}
				break;
			case "cruiser":
				if (countCruiser < 1) {
					if (setCountShip("cruiser") === true) {
						countCruiser++;
						$(".cruiserCounter").html(1 - countCruiser + "x");
						tmpShipClass = "";
					}
				}
				break;
			case "destroyer1":
				if (countDestroyer < 2) {
					if (setCountShip("destroyer1") === true) {
						countDestroyer++;
						$(".destroyerCounter").html(2 - countDestroyer + "x");
						tmpShipClass = "";
					}
				}
				break;
			case "destroyer2":
				if (countDestroyer < 2) {
					if (setCountShip("destroyer2") === true) {
						countDestroyer++;
						$(".destroyerCounter").html(2 - countDestroyer + "x");
						tmpShipClass = "";
					}
				}
				break;
			case "submarine1":
				if (countSubmarine < 3) {
					if (setCountShip("submarine1") === true) {
						countSubmarine++;
						$(".submarineCounter").html(3 - countSubmarine + "x");
						tmpShipClass = "";
					}
				}
				break;
			case "submarine2":
				if (countSubmarine < 3) {
					if (setCountShip(("submarine2")) === true) {
						countSubmarine++;
						$(".submarineCounter").html(3 - countSubmarine + "x");
						tmpShipClass = "";
					}
				}
				break;
			case "submarine3":
				if (countSubmarine < 3) {
					if (setCountShip("submarine3") === true) {
						countSubmarine++;
						$(".submarineCounter").html(3 - countSubmarine + "x");
						tmpShipClass = "";
					}
				}
				break;
			case "dinghy1":
				if (countDinghy < 4) {
					if (setCountShip("dinghy1") === true) {
						countDinghy++;
						$(".dinghyCounter").html(4 - countDinghy + "x");
						tmpShipClass = "";
					}
				}
				break;
			case "dinghy2":
				if (countDinghy < 4) {
					if (setCountShip("dinghy2") === true) {
						countDinghy++;
						$(".dinghyCounter").html(4 - countDinghy + "x");
						tmpShipClass = "";
					}
				}
				break;
			case "dinghy3":
				if (countDinghy < 4) {
					if (setCountShip("dinghy3") === true) {
						countDinghy++;
						$(".dinghyCounter").html(4 - countDinghy + "x");
						tmpShipClass = "";
					}
				}
				break;
			case "dinghy4":
				if (countDinghy < 4) {
					if (setCountShip("dinghy4") === true) {
						countDinghy++;
						$(".dinghyCounter").html(4 - countDinghy + "x");
						tmpShipClass = "";
					}
				}
				break;
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

	$(document).on('mouseenter', '.fieldPoint', function() {
		setShipVertical($(this))
	});

	$(".section_three").mouseup(function() {
		shipSelection = false;
	});

	$("#btn_back").click(function() {
		$(".fieldPoint").removeClass("battleship cruiser destroyer1 destroyer2 submarine1 submarine2 submarine3 dinghy1 dinghy2 dinghy3 dinghy4");
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

});

function resetShipCounter() {
	$(".battleshipCounter").html(1 - countBattleship + "x");
	$(".cruiserCounter").html(1 - countCruiser + "x");
	$(".destroyerCounter").html(2 - countDestroyer + "x");
	$(".submarineCounter").html(3 - countSubmarine + "x");
	$(".dinghyCounter").html(4 - countDinghy + "x");
}

/**
 * Kontrolliert, ob das Schiff auf das Feld gesetzt wurde
 *
 * @param {String} ship
 */
function setCountShip(ship) {
	var checkFieldContent;
	var counter = 0;
	for (var i = 1; i <= 15; i++) {
		for (var j = 1; j <= 15; j++) {
			checkFieldContent = $(".section_myField_create").children("#fieldTable").children("#row" + i).children("#cell" + j).prop("className").substring(11);
			if (checkFieldContent === ship) {
				counter++;
			}
		}
	}
	if (counter === shipSize) {
		return true;
	} else {
		return false;
	}
}