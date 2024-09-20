class Fou extends Pion {
	getPossibleMoves() {
		const possibleMoveTab = [];
		const directions = [
			{x: 1, y: 1}, // Diagonale haut droite
			{x: -1, y: 1}, // Diagonale haut gauche
			{x: 1, y: -1}, // Diagonale bas droite
			{x: -1, y: -1}, // Diagonale bas gauche
		];

		// On parcourt les 4 directions diagonales
		directions.forEach(direction => {
			let x = this.x + direction.x;
			let y = this.y + direction.y;

			// On continue dans la direction tant qu'on est dans les limites de l'échiquier
			while (x >= 0 && x < 8 && y >= 0 && y < 8) {
				const pionBloquant = pions.find(
					pion => pion.x === x && pion.y === y,
				);

				if (pionBloquant) {
					// Si c'est un pion adverse, on peut capturer et s'arrêter
					if (pionBloquant.color !== this.color) {
						possibleMoveTab.push({x, y});
					}
					// On ne peut plus aller plus loin dans cette direction
					break;
				} else {
					// Sinon, on peut avancer
					possibleMoveTab.push({x, y});
				}

				// On avance dans la direction
				x += direction.x;
				y += direction.y;
			}
		});

		return possibleMoveTab;
	}
}
