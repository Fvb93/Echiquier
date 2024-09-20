class Pion {
	table;
	node;
	x = 0;
	y = 0;
	color;
	pionSelectionAbortController;

	alreadyMoved = false;
	possibleMovesDiv = [];

	constructor(table, node, x, y, color) {
		this.table = table;
		this.node = node;
		this.x = x;
		this.y = y;
		this.color = color;
	}

	setPionSelectionEvent() {
		this.pionSelectionAbortController = new AbortController();
		this.node.addEventListener(
			"click",
			() => {
				// utilisation de la fonction global pour retirer les events listener de tout les pions
				removeAllPionSelectionEvents();

				// place des points rouges au movement possible
				this.showPossibleMove();
			},
			{signal: this.pionSelectionAbortController.signal}, // permet d'annuler l'event listener
		);
	}

	removePionSelectionEvent() {
		if (this.pionSelectionAbortController) {
			this.pionSelectionAbortController.abort(); // annule les events listener utilisant l'AbortController
		}
	}

	getDirection() {
		return this.color === "black" ? 1 : -1;
	}

	// Function à override par enfant
	// Renvoie un tableau de coordonnées (x, y) des mouvements possibles
	getPossibleMoves() {
		const possibleMoveTab = [];

		const direction = this.getDirection(); // 1 pour les blancs, -1 pour les noirs

		// Vérifie si la case devant le pion est vide (1 case en avant)
		if (
			!pions.find(
				pion => pion.x === this.x && pion.y === this.y + 1 * direction,
			)
		) {
			possibleMoveTab.push({x: this.x, y: this.y + 1 * direction});

			// Si le pion est sur sa case de départ et qu'il n'y a rien devant (2 cases en avant)
			if (!this.alreadyMoved) {
				if (
					!pions.find(
						pion =>
							pion.x === this.x &&
							pion.y === this.y + 2 * direction,
					)
				) {
					possibleMoveTab.push({
						x: this.x,
						y: this.y + 2 * direction,
					});
				}
			}
		}

		// Captures diagonales (gauche et droite)
		const diagonales = [
			{x: this.x - 1, y: this.y + 1 * direction}, // Diagonale gauche
			{x: this.x + 1, y: this.y + 1 * direction}, // Diagonale droite
		];

		diagonales.forEach(diag => {
			const pionAdverse = pions.find(
				pion =>
					pion.x === diag.x &&
					pion.y === diag.y &&
					pion.color !== this.color,
			);
			if (pionAdverse) {
				possibleMoveTab.push(diag); // Capture possible
			}
		});

		return possibleMoveTab;
	}

	showPossibleMove() {
		const possibleMoves = this.getPossibleMoves();

		if (possibleMoves.length === 0) {
			cancelEvent();
		} else {
			possibleMoves.forEach(possibleMove => {
				// création de la div du point (pour le mouvement possible)
				const div = document.createElement("div");
				div.classList.add("point");

				// ajoute le point au tableau
				this.table.rows[possibleMove.y].cells[
					possibleMove.x
				].appendChild(div);

				// ajoute le point à la liste des points
				this.possibleMovesDiv.push(div);

				// ajoute l'event listener pour le mouvement
				div.addEventListener("click", () => {
					this.move(possibleMove.x, possibleMove.y);
				});
			});

			addCancelEvent();
		}
	}

	clearPossibleMove() {
		// supprime les points de mouvements possibles
		this.possibleMovesDiv.forEach(possibleMoveDiv => {
			possibleMoveDiv.remove();
		});
	}

	move(newX, newY) {
		this.clearPossibleMove();

		this.alreadyMoved = true;

		// on vérifie si un pion est présent sur la case d'arrivée
		const target = this.checkIfMovedOnPion(newX, newY);
		if (target) {
			target.destroy();
		}

		// déplace le pion

		this.x = newX;
		this.y = newY;
		this.table.rows[newY].cells[newX].appendChild(this.node);

		// utilisation de la fonction globale pour ajouter les events listener de tout les pions
		changeTurn();
	}

	destroy() {
		this.node.remove();
	}

	checkIfMovedOnPion(x, y) {
		return pions.find(pion => pion.x === x && pion.y === y);
	}
}
