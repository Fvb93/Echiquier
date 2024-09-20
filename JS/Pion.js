class Pion {
	table;
	node;
	x = 0;
	y = 0;
	color;

	constructor(table, node, x, y, color) {
		this.table = table;
		this.node = node;
		this.x = x;
		this.y = y;
		this.color = color;
	}

	setEvent() {
		this.node.addEventListener("click", () => {
			this.move();
		});
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
