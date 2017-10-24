$(document).ready(function() {

	$(document).on('click', '.battleship', function() {
		if (thisIsTurned[0] === false) {
			thisIsTurned[0] = true;
		} else {
			thisIsTurned[0] = false;
		}
		isTurned = thisIsTurned[0];
		shipSize = 5;
		shipClass = "battleship";
		setShipHorizontal($(this), 0);
	});
	$(document).on('click', '.cruiser', function() {
		if (thisIsTurned[1] === false) {
			thisIsTurned[1] = true;
		} else {
			thisIsTurned[1] = false;
		}
		isTurned = thisIsTurned[1];
		shipSize = 4;
		shipClass = "cruiser";
		setShipHorizontal($(this), 1);
	});
	$(document).on('click', '.destroyer1', function() {
		if (thisIsTurned[2] === false) {
			thisIsTurned[2] = true;
		} else {
			thisIsTurned[2] = false;
		}
		isTurned = thisIsTurned[2];
		shipSize = 3;
		shipClass = "destroyer1";
		setShipHorizontal($(this), 2);
	});
	$(document).on('click', '.destroyer2', function() {
		if (thisIsTurned[3] === false) {
			thisIsTurned[3] = true;
		} else {
			thisIsTurned[3] = false;
		}
		isTurned = thisIsTurned[3];
		shipSize = 3;
		shipClass = "destroyer2";
		setShipHorizontal($(this), 3);
	});
	$(document).on('click', '.submarine1', function() {
		if (thisIsTurned[4] === false) {
			thisIsTurned[4] = true;
		} else {
			thisIsTurned[4] = false;
		}
		isTurned = thisIsTurned[4];
		shipSize = 2;
		shipClass = "submarine1";
		setShipHorizontal($(this), 4);
	});
	$(document).on('click', '.submarine2', function() {
		if (thisIsTurned[5] === false) {
			thisIsTurned[5] = true;
		} else {
			thisIsTurned[5] = false;
		}
		isTurned = thisIsTurned[5];
		shipSize = 2;
		shipClass = "submarine2";
		setShipHorizontal($(this), 5);
	});
	$(document).on('click', '.submarine3', function() {
		if (thisIsTurned[6] === false) {
			thisIsTurned[6] = true;
		} else {
			thisIsTurned[6] = false;
		}
		isTurned = thisIsTurned[6];
		shipSize = 2;
		shipClass = "submarine3";
		setShipHorizontal($(this), 6);
	});
	$(document).on('click', '.dinghy1', function() {
		if (thisIsTurned[7] === false) {
			thisIsTurned[7] = true;
		} else {
			thisIsTurned[7] = false;
		}
		isTurned = thisIsTurned[7];
		shipSize = 1;
		shipClass = "dinghy1";
		setShipHorizontal($(this), 7);
	});
	$(document).on('click', '.dinghy2', function() {
		if (thisIsTurned[8] === false) {
			thisIsTurned[8] = true;
		} else {
			thisIsTurned[8] = false;
		}
		isTurned = thisIsTurned[8];
		shipSize = 1;
		shipClass = "dinghy2";
		setShipHorizontal($(this), 8);
	});
	$(document).on('click', '.dinghy3', function() {
		if (thisIsTurned[9] === false) {
			thisIsTurned[9] = true;
		} else {
			thisIsTurned[9] = false;
		}
		isTurned = thisIsTurned[9];
		shipSize = 1;
		shipClass = "dinghy3";
		setShipHorizontal($(this), 9);
	});
	$(document).on('click', '.dinghy4', function() {
		if (thisIsTurned[10] === false) {
			thisIsTurned[10] = true;
		} else {
			thisIsTurned[10] = false;
		}
		isTurned = thisIsTurned[10];
		shipSize = 1;
		shipClass = "dinghy4";
		setShipHorizontal($(this), 10);
	});

});

/**
 * Dreht das Schiff horizontal
 *
 * @param {Object} scope
 * @param {Int32Array} i
 */
function setShipHorizontal(scope, i) {

	var cellName = scope.prop('id');
	var cellNb = parseInt(cellName.substring(4, 6));
	var rowName = scope.parent().prop('id');
	var rowNb = parseInt(rowName.substring(3, 5));
	var shipEnd = null;
	var shipCellsToSet = [];
	var counterShipCellsToSet = 0;
	var cell = [];
	var shipCells = [];

	row = scope.parent();
	shipEnd = cellNb + shipSize;

	if (isTurned === false) {
		if (shipEnd < size + 2) {
			if (shipCollisionHorizontal(cellNb, shipEnd, row, shipClass) === true) {
				$(".fieldPoint").removeClass(shipClass);
				thisIsTurned[i] = false;
				for (var i = cellNb; i < shipEnd; i++) {
					shipCells.push([rowNb, i]);
				}
			} else {
				thisIsTurned[i] = true;
			}
		}
		if (shipEnd >= size + 2) {
			if (shipCollisionHorizontalNegative(cellNb, shipEnd, row, shipClass) === true) {
				$(".fieldPoint").removeClass(shipClass);
				thisIsTurned[i] = false;
				for (var i = cellNb; i > cellNb - shipSize; i--) {
					shipCells.push([rowNb, i]);
				}
			} else {
				thisIsTurned[i] = true;
			}
		}
	} else {
		shipEnd = rowNb + shipSize;
		if (shipEnd < size + 2) {
			if (shipCollisionVertical(rowNb, shipEnd, cellNb, shipClass, row) === true) {
				$(".fieldPoint").removeClass(shipClass);
				thisIsTurned[i] = true;
				for (var i = rowNb; i < shipEnd; i++) {
					shipCells.push([i, cellNb]);
				}
			} else {
				thisIsTurned[i] = false;
			}
		}
		if (shipEnd >= size + 2) {
			if (shipCollisionVerticalNegative(rowNb, shipEnd, cellNb, shipClass, row) === true) {
				$(".fieldPoint").removeClass(shipClass);
				thisIsTurned[i] = true;
				for (var i = rowNb; i > rowNb - shipSize; i--) {
					shipCells.push([i, cellNb]);
				}
			} else {
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
 * @param {Object} scope
 * @param {Int32Array} i
 */
function setShipVertical(scope, i) {
	var cellName = scope.prop('id');
	var cellNb = parseInt(cellName.substring(4, 6));
	row = scope.parent();
	var rowName = scope.parent().prop('id');
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
			if (shipEnd <= size + 1) {
				if (shipCollisionHorizontal(cellNb, shipEnd, row, shipClass) === true) {
					$(".fieldPoint").removeClass(shipClass);
					for (var i = cellNb; i < shipEnd; i++) {
						//row = $(this).parent();
						row.children("#cell" + i).addClass(shipClass);
						// shipCells.push([cellNb, i]);
					}
				}
			}
			if (shipEnd > size + 1) {
				if (shipCollisionHorizontalNegative(cellNb, shipEnd, row, shipClass) === true) {
					$(".fieldPoint").removeClass(shipClass);
					for (var i = cellNb; i > cellNb - shipSize; i--) {
						// row = $(this).parent();
						row.children("#cell" + i).addClass(shipClass);
						// shipCells.push([cellNb, i]);
					}
				}
			}

		}

	} else {
		if (shipSelection === true) {
			shipEnd = rowNb + shipSize;
			if (shipEnd < size + 2) {
				checkCase = true;
				for (var i = rowNb; i < shipEnd; i++) {
					shipCells.push([i, cellNb]);
				}
			}
			if (shipEnd >= size + 2) {
				checkCase = false;
				for (var i = rowNb; i > rowNb - shipSize; i--) {
					shipCells.push([i, cellNb]);
				}
			}
			$.each(shipCells, function(index, value) {
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
			} else {
				if (shipCollisionVerticalNegative(shipCellsToSet[0], shipEnd, thisCellNb, shipClass, row) === true) {
					$(".fieldPoint").removeClass(shipClass);

					for (var j = 0; j < counterShipCellsToSet; j++) {
						$(cell[j]).addClass(shipClass);
					}
				}
			}
		}
	}
}
