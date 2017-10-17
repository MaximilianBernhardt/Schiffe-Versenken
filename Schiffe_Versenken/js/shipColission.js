/**
 * Diese Funktionen überprüfen beim Drehen der Schiffe, ob eine Kolission mit einem anden Schiff vorliegt.
 */

// Vertical = von unten nach oben
/**
 * Diese Funktion überprüft die Verticale Colission eines Schiffes vor dem Setzen
 *
 * @param {Int32Array} fromRow
 * @param {Int32Array} toRow
 * @param {Int32Array} thisCellNb
 * @param {String} shipClass
 * @param {Int32Array} row
 */
function shipCollisionVertical(fromRow, toRow, thisCellNb, shipClass, row) {
	var countReturn = 0;
	for (var h = fromRow; h < toRow; h++) {

		if (h > 15) {
			h = 15;
		}

		var currentShipPoint = row.parent().children("#row" + h).children("#cell" + thisCellNb).prop('className').substring(11);
		console.log(currentShipPoint);

		if (currentShipPoint !== shipClass && currentShipPoint === "battleship" || currentShipPoint !== shipClass && currentShipPoint === "cruiser" || currentShipPoint !==
			shipClass && currentShipPoint === "destroyer1" || currentShipPoint !== shipClass && currentShipPoint === "destroyer2" || currentShipPoint !==
			shipClass && currentShipPoint === "submarine1" || currentShipPoint !== shipClass && currentShipPoint === "submarine2" || currentShipPoint !==
			shipClass && currentShipPoint === "submarine3" || currentShipPoint !== shipClass && currentShipPoint === "dinghy1" || currentShipPoint !== shipClass &&
			currentShipPoint === "dinghy2" || currentShipPoint !== shipClass && currentShipPoint === "dinghy3" || currentShipPoint !== shipClass && currentShipPoint ===
			"dinghy4") {
			return false;
		} else {
			countReturn++;
			if (countReturn === toRow - fromRow) {
				return true;
			}

		}
	}
}

// Horizontal = von links nach Rechts
/**
 *  Diese Funktion überprüft die Horizontale Colission eines Schiffes vor dem Setzen
 *
 * @param {Int32Array} cellNb
 * @param {Int32Array} shipEnd
 * @param {Int32Array} row
 * @param {String} shipClass
 */
function shipCollisionHorizontal(cellNb, shipEnd, row, shipClass) { 
	var countReturn = 0;
	for (var h = cellNb; h < shipEnd; h++) {

		if (h > 15) {
			h = 15;
		}

		var currentShipPoint = row.children("#cell" + h).prop('className').substring(11);
		console.log(currentShipPoint);
		if (currentShipPoint !== shipClass && currentShipPoint === "battleship" || currentShipPoint !== shipClass && currentShipPoint === "cruiser" || currentShipPoint !==
			shipClass && currentShipPoint === "destroyer1" || currentShipPoint !== shipClass && currentShipPoint === "destroyer2" || currentShipPoint !==
			shipClass && currentShipPoint === "submarine1" || currentShipPoint !== shipClass && currentShipPoint === "submarine2" || currentShipPoint !==
			shipClass && currentShipPoint === "submarine3" || currentShipPoint !== shipClass && currentShipPoint === "dinghy1" || currentShipPoint !== shipClass &&
			currentShipPoint === "dinghy2" || currentShipPoint !== shipClass && currentShipPoint === "dinghy3" || currentShipPoint !== shipClass && currentShipPoint ===
			"dinghy4") {
			return false;
		} else {
			countReturn++;
			if (countReturn === shipEnd - cellNb) {
				return true;
			}
		}
	}
}

/**
 *  Diese Funktion überprüft die Verticale Colission eines Schiffes vor dem Setzen in negativer Richtung (an den Rändern des Spielfeldes)
 *
 * @param {Int32Array} fromRow
 * @param {Int32Array} toRow
 * @param {Int32Array} thisCellNb
 * @param {String} shipClass
 * @param {Int32Array} row
 */
function shipCollisionVerticalNegative(fromRow, toRow, thisCellNb, shipClass, row) {
	var countReturn = 0;
	for (var h = fromRow; h > fromRow - shipSize; h--) {

		//if (h > 15) { h = 15; }

		var currentShipPoint = row.parent().children("#row" + h).children("#cell" + thisCellNb).prop('className').substring(11);
		console.log(currentShipPoint);

		if (currentShipPoint !== shipClass && currentShipPoint === "battleship" || currentShipPoint !== shipClass && currentShipPoint === "cruiser" || currentShipPoint !==
			shipClass && currentShipPoint === "destroyer1" || currentShipPoint !== shipClass && currentShipPoint === "destroyer2" || currentShipPoint !==
			shipClass && currentShipPoint === "submarine1" || currentShipPoint !== shipClass && currentShipPoint === "submarine2" || currentShipPoint !==
			shipClass && currentShipPoint === "submarine3" || currentShipPoint !== shipClass && currentShipPoint === "dinghy1" || currentShipPoint !== shipClass &&
			currentShipPoint === "dinghy2" || currentShipPoint !== shipClass && currentShipPoint === "dinghy3" || currentShipPoint !== shipClass && currentShipPoint ===
			"dinghy4") {
			return false;
		} else {
			countReturn++;
			if (countReturn === toRow - fromRow) {
				return true;
			}

		}
	}
}

/**
 *  Diese Funktion überprüft die Horizontale Colission eines Schiffes vor dem Setzen in negativer Richtung (an den Rändern des Spielfeldes)
 *
 * @param {Int32Array} cellNb
 * @param {Int32Array} shipEnd
 * @param {Int32Array} row
 * @param {String} shipClass
 */
function shipCollisionHorizontalNegative(cellNb, shipEnd, row, shipClass) {
	var countReturn = 0;
	for (var h = cellNb; h > cellNb - shipSize; h--) {

		//if (h > 15) { h = 15; }

		var currentShipPoint = row.children("#cell" + h).prop('className').substring(11);
		console.log(currentShipPoint);
		if (currentShipPoint !== shipClass && currentShipPoint === "battleship" || currentShipPoint !== shipClass && currentShipPoint === "cruiser" || currentShipPoint !==
			shipClass && currentShipPoint === "destroyer1" || currentShipPoint !== shipClass && currentShipPoint === "destroyer2" || currentShipPoint !==
			shipClass && currentShipPoint === "submarine1" || currentShipPoint !== shipClass && currentShipPoint === "submarine2" || currentShipPoint !==
			shipClass && currentShipPoint === "submarine3" || currentShipPoint !== shipClass && currentShipPoint === "dinghy1" || currentShipPoint !== shipClass &&
			currentShipPoint === "dinghy2" || currentShipPoint !== shipClass && currentShipPoint === "dinghy3" || currentShipPoint !== shipClass && currentShipPoint ===
			"dinghy4") {
			return false;
		} else {
			countReturn++;
			if (countReturn === shipEnd - cellNb) {
				return true;
			}
		}
	}
}