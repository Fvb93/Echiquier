class Pion {
	table;
	node;
	x = 0;
	y = 0;
	color;
	pionSelectionAbortController = new AbortController();

	constructor(table, node, x, y, color) {
		this.table = table;
		this.node = node;
		this.x = x;
		this.y = y;
		this.color = color;
	}

	setPionSelectionEvent(disableAllFn) {
		this.node.addEventListener(
			"click",
			() => {
				console.log(`Pion clicked ${this.x};${this.y}`);
				disableAllFn();
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

	move() {
		const movement = 1;
		this.y += movement * this.getDirection();
		this.table.rows[this.y].cells[this.x].appendChild(this.node);
	}
}
