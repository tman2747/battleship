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
		let ship = new Ship(size); // TODO idk how i should refactor this. maybe pass the ship into the function not sure yet..
		this.ships.push(ship);
		if (dir) {
			// Horizontal
			if (x >= this.board.length || y + size > this.board.length) {
				console.log("attemping to place ship off the board");
				return false;
			}
			// make sure theres not a ship already in that pos
			for (let j = 0; j < size; j++) {
				if (this.board[x][y + j].ship != null) {
					console.log("theres a ship here");
					return false;
				}
			}
			//place the ship
			for (let i = 0; i < size; i++) {
				this.board[x][y + i].ship = ship;
			}
			return true;
		} else {
			// Vertical
			if (y >= this.board.length || x + size > this.board.length) {
				console.log("attemping to place ship off the board");
				return false;
			}
			// make sure theres not a ship already in that pos
			for (let j = 0; j < size; j++) {
				if (this.board[x + j][y].ship != null) {
					console.log("theres a ship here");
					return false;
				}
			}
			for (let i = 0; i < size; i++) {
				this.board[x + i][y].ship = ship;
			}
			return true;
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
				return true; // added return true here so you know if attack was successful
			} else {
				this.missedAttack++;
				this.board[x][y].attacked = true;
				return false; // added return false here so you know if attack was successful
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
