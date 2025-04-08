const Ship = require("./ship");

class Tile {
	constructor() {
		this.attacked = false;
		this.ship = null;
	}
}

class Gameboard {
	constructor() {
		this.board = [];
		for (let i = 0; i < 5; i++) {
			const row = [];
			for (let j = 0; j < 5; j++) {
				row.push(new Tile());
			}
			this.board.push(row);
		}
		this.missedAttack = 0;
		this.ships = [];
	}

	placeShip(x, y, dir, size) {
		let ship = new Ship(size); // idk how i should refactor this. maybe pass the ship into the function not sure yet..
		this.ships.push(ship);
		if (dir) {
			// Horizontal
			if (x >= this.board.length || y + size > this.board.length) {
				throw new Error("attemping to place ship off the board");
			}
			for (let i = 0; i < size; i++) {
				this.board[x][y + i].ship = ship;
			}
		} else {
			// Vertical
			if (y >= this.board.length || x + size > this.board.length) {
				throw new Error("attemping to place ship off the board");
			}
			for (let i = 0; i < size; i++) {
				this.board[x + i][y].ship = ship;
			}
		}
	}
	printboard() {
		this.board.forEach((row) => {
			console.log(row.map((tile) => (tile.ship ? "S" : ".")).join(" "));
		});
	}

	receiveAttack(x, y) {
		if (x >= 0 && x < this.board.length && y >= 0 && y < this.board.length) {
			if (this.board[x][y].ship instanceof Ship) {
				this.board[x][y].ship.hit();
				this.board[x][y].attacked = true;
				return true; // added return true here to see if that'll help when putting it all together
			} else {
				this.missedAttack++;
				this.board[x][y].attacked = true;
				return false; // added return false here to see if that'll help when putting it all together
			}
		}
	}
	allShipsSunk() {
		let returnValue = true;
		this.ships.forEach((element) => {
			if (!element.isSunk()) {
				returnValue = false;
			}
		});
		return returnValue;
	}
}

module.exports = Gameboard;
