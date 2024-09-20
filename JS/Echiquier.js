// NOTE: Idéalement, il aurait fallu diviser ce fichier en plusieurs fichiers mais pour des raisons de simplicité, nous avons tout mis dans un seul fichier

/* 
   *****************
    FONCTIONS DE GENERATIONS
    - Création du tableau (damier)
    - Initialisation des pions
   ****************** 
*/

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

/* 
   *****************
    FONCTION GLOBALE 

    En JS, les fonctions et variables déclarées hors d'un scope sont globales.
    C'est à dire qu'elles sont accessibles partout dans le code (et même dans les autres fichiers JS)

    Grace à cela, les fonctions suivantes vont être accessibles dans le fichier JS/Pion.js
   ****************** 
   */

// Fait en sorte que les pions soient cliquables (premier clique pour selectionner le pion à déplacer)
const addAllPionSelectionEvents = () => {
	pions.forEach(pion => {
		if (pion.color === turn) {
			pion.setPionSelectionEvent();
		}
	});
};

// Désactive les events listeners de tout les pions
const removeAllPionSelectionEvents = () => {
	pions.forEach(pion => {
		pion.removePionSelectionEvent();
	});
};

// Ajoute un event "d'annulation de mouvement"
let cancelEventAbortController = new AbortController();

const addCancelEvent = () => {
	cancelEventAbortController = new AbortController();
	// On ajoute un event "d'annulation de mouvement" sur tout les éléments du DOM sauf les points
	document.querySelectorAll("*:not(.point)").forEach(element => {
		element.addEventListener(
			"click",
			event => {
				if (event.target === element) {
					cancelEvent();
				}
			},
			{
				signal: cancelEventAbortController.signal,
			},
		);
	});

	// On ajoute un event lorsque l'on clique sur le point pour enlever tout les events "d'annulation de mouvement"
	document.querySelectorAll(".point").forEach(element => {
		element.addEventListener(
			"click",
			event => {
				if (event.target === element) {
					cancelEventAbortController.abort();
				}
			},
			{signal: cancelEventAbortController.signal},
		);
	});
};

const cancelEvent = () => {
	// permet d'être sûr de cliquer UNIQUEMENT sur l'élement sélectionné
	pions.forEach(pion => {
		pion.clearPossibleMove();
	});
	addAllPionSelectionEvents();

	cancelEventAbortController.abort();
};

const changeTurn = () => {
	removeAllPionSelectionEvents();
	turn = turn === "white" ? "black" : "white";
	addAllPionSelectionEvents();
	nbrTurn++;
};

const pions = [];
let turn = "white";
let nbrTurn = 1;

/*
    *****************
    DOM ELEMENTS

    Ici, on récupère les éléments du DOM (tableau) qui nous serviront pour la suite
    ******************
 */
const table = document.querySelector("#chessboard");

/*
    *****************
    MAIN

    Ici, on initialise le jeu (création du board, intialisation des pions, ajout des events listeners)
    ******************
 */

// création du damier
creationBoard(table);

// Initialisation des pions
init(table, pions);

// Ajout des events listeners
addAllPionSelectionEvents();
