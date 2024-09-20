// Fct Création du tableau
const creationBoard = tableNode => {
	for (let y = 1; y < 9; y++) {
		let tr = document.createElement("tr");
		for (let x = 1; x < 9; x++) {
			let td = document.createElement("td");
			td.classList.add((x % 2) + (y % 2) - 1 == 0 ? "white" : "black");
			tr.appendChild(td);
		}
		tableNode.appendChild(tr);
	}
};

// Fct Init Pion
const init = (tableNode, pionTab) => {
	for (let y = 0; y < 2; y++) {
		for (let x = 0; x < tableNode.rows[y].cells.length; x++) {
			// Création de la div du pion
			const pionDiv = document.createElement("div");
			pionDiv.classList.add("pionNoir");
			tableNode.rows[y].cells[x].appendChild(pionDiv);

			// Instanciation de l'objet Pion (classe Pion)
			const pion = new Pion(table, pionDiv, x, y, "black");

			// Ajoute le pion au tableau de pions
			pionTab.push(pion);
		}
	}

	for (let y = tableNode.rows.length - 2; y < tableNode.rows.length; y++) {
		for (let x = 0; x < tableNode.rows[y].cells.length; x++) {
			// Création de la div du pion
			const pionDiv = document.createElement("div");
			pionDiv.classList.add("pionBlanc");
			tableNode.rows[y].cells[x].appendChild(pionDiv);

			// Instanciation de l'objet Pion (classe Pion)
			const pion = new Pion(table, pionDiv, x, y, "white");

			// Ajoute le pion au tableau de pions
			pionTab.push(pion);
		}
	}
};

// Fait en sorte que les pions soient cliquables (premier clique pour selectionner le pion à déplacer)
const addAllPionSelectionEvents = pionTab => {
	pionTab.forEach(pion => {
		pion.setPionSelectionEvent(() => removeAllPionSelectionEvents(pionTab));
	});
};

// Désactive les events listeners de tout les pions
const removeAllPionSelectionEvents = pionTab => {
	pionTab.forEach(pion => {
		pion.removePionSelectionEvent();
	});
};

// DOM elements
const table = document.querySelector("#chessboard");

// Main
const pions = [];

// création du damier
creationBoard(table);

// Initialisation des pions
init(table, pions);

// Ajout des events listeners
addAllPionSelectionEvents(pions);
