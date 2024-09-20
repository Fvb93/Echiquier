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
			// Creation of the HTML element
			const pionDiv = document.createElement("div");
			pionDiv.classList.add("pionNoir");
			tableNode.rows[y].cells[x].appendChild(pionDiv);

			// Creation of the Pion object (class Pion)
			const pion = new Pion(table, pionDiv, x, y, "black");

			// Add the pion to the array of pions
			pionTab.push(pion);
		}
	}

	for (let y = tableNode.rows.length - 2; y < tableNode.rows.length; y++) {
		for (let x = 0; x < tableNode.rows[y].cells.length; x++) {
			const pionDiv = document.createElement("div");
			pionDiv.classList.add("pionBlanc");
			tableNode.rows[y].cells[x].appendChild(pionDiv);

			// Creation of the Pion object (class Pion)
			const pion = new Pion(table, pionDiv, x, y, "white");

			// Add the pion to the array of pions
			pionTab.push(pion);
		}
	}
};

const addAllPionSelectionEvents = pionTab => {
	pionTab.forEach(pion => {
		pion.setPionSelectionEvent(() => removeAllPionSelectionEvents(pionTab));
	});
};

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
