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
const init = tableNode => {
	console.log("test");
	console.log(tableNode.rows[0].cells.length);

	for (let y = 0; y < 2; y++) {
		for (let x = 0; x < tableNode.rows[y].cells.length; x++) {
			const pion = document.createElement("div");
			let pionx = x;
			let piony = y;
			pion.classList.add("pionNoir");
			tableNode.rows[y].cells[x].appendChild(pion);
			pion.addEventListener("click", () => {
				piony++;
				tableNode.rows[piony].cells[pionx].appendChild(pion);
			});
		}
	}

	for (let y = tableNode.rows.length - 2; y < tableNode.rows.length; y++) {
		for (let x = 0; x < tableNode.rows[y].cells.length; x++) {
			const pion = document.createElement("div");
			let pionx = x;
			let piony = y;
			pion.classList.add("pionBlanc");
			tableNode.rows[y].cells[x].appendChild(pion);

			pion.addEventListener("click", () => {
				piony--;
				tableNode.rows[piony].cells[pionx].appendChild(pion);
			});
		}
	}
};

const table = document.querySelector("#chessboard");
creationBoard(table);
init(table);
