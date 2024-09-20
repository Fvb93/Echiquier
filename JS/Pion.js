class Pion {
	table;
	node;
	x = 0;
	y = 0;
	color;
	pionSelectionAbortController;

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
				console.log("Pion selectionné : " + this.x + " " + this.y);
				// utilisation de la fonction global pour retirer les events listener de tout les pions
				removeAllPionSelectionEvents();

				// place des points rouges au movement possible
				this.showPossibleMove();
			},
			{signal: this.pionSelectionAbortController.signal}, // permet d'annuler l'event listener
		);
	}

	removePionSelectionEvent() {
		this.pionSelectionAbortController.abort(); // annule les events listener utilisant l'AbortController
	}

	getDirection() {
		return this.color === "black" ? 1 : -1;
	}

	// Function à override par enfant
	// Renvoie un tableau de coordonnées (x, y) des mouvements possibles
	getPossibleMoves() {
		const possibleMoveTab = [];

		/*
         NOTE: à l'état actuel, notre pion:
         -   ne peut se déplacer que s'il n'y a rien devant lui
         -  de 1 ou 2 cases devant lui si elle est vide
        */

		// 1ere case devant le pion
		if (
			this.table.rows[this.y + this.getDirection()].cells[this.x].children // cette condition va problablement changer pour utiliser la liste de pions (class)
				.length === 0
		) {
			// ajoute le mouvement possible
			possibleMoveTab.push({
				x: this.x,
				y: this.y + 1 * this.getDirection(),
			});
		}

		// 2eme case devant le pion
		if (
			this.table.rows[this.y + 2 * this.getDirection()].cells[this.x]
				.children.length === 0
		) {
			// ajoute le mouvement possible
			possibleMoveTab.push({
				x: this.x,
				y: this.y + 2 * this.getDirection(),
			});
		}

		return possibleMoveTab;
	}

	showPossibleMove() {
		const possibleMoves = this.getPossibleMoves();

		possibleMoves.forEach(possibleMove => {
			// création de la div du point (pour le mouvement possible)
			const div = document.createElement("div");
			div.classList.add("point");

			// ajoute le point au tableau
			this.table.rows[possibleMove.y].cells[possibleMove.x].appendChild(
				div,
			);

			// ajoute le point à la liste des points
			this.possibleMovesDiv.push(div);

			// ajoute l'event listener pour le mouvement
			div.addEventListener("click", () => {
				this.move(possibleMove.x, possibleMove.y);
			});
		});
	}

	move(newX, newY) {
		// supprime les points de mouvements possibles
		this.possibleMovesDiv.forEach(possibleMoveDiv => {
			possibleMoveDiv.remove();
		});

		// déplace le pion
		this.x = newX;
		this.y = newY;
		this.table.rows[newY].cells[newX].appendChild(this.node);

		// utilisation de la fonction globale pour ajouter les events listener de tout les pions
		addAllPionSelectionEvents();
	}
}
